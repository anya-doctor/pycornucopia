# coding=utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from myutil.MyTool import getCurrentTimestamp


class MyBetDataThread(QtCore.QThread):
    def __init__(self, console_instance, loginSuccessData, bet_balls_list, bet_money_list, pre_bet_data):
        super(MyBetDataThread, self).__init__()
        self.console_instance = console_instance
        self.loginSuccessData = loginSuccessData
        self.bet_balls_list = bet_balls_list
        self.bet_money_list = bet_money_list
        self.pre_bet_data = pre_bet_data

    def get_bet_str(self, bet_balls_list, bet_money_list):
        try:
            if not self.pre_bet_data:
                logging.error("拿不到下注前数据？")
                return ""

            version_number = self.pre_bet_data['data']['version_number']
            # t=010|0|1.9829|2;000|1|9.9112|2;011|1|1.9829|3;&v=37
            dic1 = {
                1: "000",
                2: "001",
                3: "002",
                4: "003",
                5: "004",
                6: "005",
                7: "006",
                8: "007",
                9: "008",
                10: "009",
            }
            bet_str = "t="

            for bet_row in bet_balls_list:
                print bet_row
                index = bet_row[0]
                betlist = bet_row[1]
                betflag = bet_row[2]
                a = dic1[index]
                for ball in betlist:
                    # 确保每一个球都是准的...
                    if not ball:
                        continue

                    bet_money = bet_money_list[betflag]

                    # 如果拿不到赔率list，直接返回得了...
                    if not self.pre_bet_data['data']['integrate']:
                        return ""

                    peilv = self.pre_bet_data['data']['integrate'][a + str(index)]
                    bet_str += '%s|%s|%s|%s;' % (a, int(ball), peilv, bet_money)
        except Exception, ex:
            logging.error(ex, exc_info=1)
            return ""

        bet_str += "&v=%s" % version_number

        logging.info("bet_str=%s" % bet_str)
        return bet_str

    def bet(self, bet_balls_list, bet_money_list):
        if not bet_balls_list:
            logging.error("bet_balls_list = [], do nothing...")
            return {}

        logging.info(">>>>>>> loginSuccessData <<<<<<<<")
        logging.info(self.loginSuccessData)
        now = getCurrentTimestamp()

        self.pk_post_bet_url = self.loginSuccessData['pk_post_bet_url'].split("&&_=")[0] + "&&_=" + str(now) + "__ajax"

        logging.info("pk_post_bet_url=%s" % self.pk_post_bet_url)

        bet_str = self.get_bet_str(bet_balls_list, bet_money_list)
        if not bet_str:
            logging.error(u"【下注过程】生成下注str出错！")
            logging.error(u"【下注过程】再次拿预下注数据！")
            return

        a = bet_str.split('&')

        payload = {
            't': a[0].split('=')[1],
            'v': int(a[1].split('=')[1])
        }

        logging.info("payload=%s" % payload)

        r = requests.post(self.pk_post_bet_url, params=payload, cookies=self.loginSuccessData['cookies_jar'],
                          headers=self.loginSuccessData['headers'], timeout=15)
        real_content = r.content.split('êêê')[0]
        real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf

        logging.info(u"【下注结果】 字符串=%s" % real_content)

        real_content = real_content.replace("u'", "'").replace("'", '"')
        t_json = json.loads(real_content)

        logging.info(u"【下注结果】 json=%s" % t_json)
        return t_json

    def run(self):
        ret_json = self.bet(self.bet_balls_list, self.bet_money_list)
        bet_success_flag = True
        if ret_json['state'] == 0:
            bet_success_flag = False

        if bet_success_flag:
            logging.error(u"【下注结果】成功！！！")
            QMetaObject.invokeMethod(self.console_instance, "betSuccess", Qt.QueuedConnection)
        else:
            logging.error(u"【下注结果】失败！！！")
            QMetaObject.invokeMethod(self.console_instance, "betFailed", Qt.QueuedConnection)
