# coding=utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common import common
from myutil.MyTool import getCurrentTimestamp


class MyBetDataThread(QtCore.QThread):
    def __init__(self, console_instance):
        super(MyBetDataThread, self).__init__()
        self.console_instance = console_instance

    def get_bet_str(self):
        try:
            if not self.console_instance.preBetDataDic:
                logging.error(u"【下注中】拿不到下注前数据！！！放弃此次下注！")
                return ""
            if not self.console_instance.preBetDataDic['data']['integrate']:
                logging.error(u"【下注中】如果拿不到赔率list！！！放弃此次下注！")
                return ""

            version_number = self.console_instance.preBetDataDic['data']['version_number']
            # t=010|0|1.9829|2;000|1|9.9112|2;011|1|1.9829|3;&v=37
            bet_str = "t="
            for item in self.console_instance.all_ball_needToBetList:
                '''
                all_ball_needToBetList = [
                    [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
                    [],
                    ...
                ]'''
                bet_money = self.console_instance.balls_bet_amount[item[2]]
                for inner_item in item[3]:
                    a = common.pk_ball_dic[inner_item[0]]
                    peilv = self.console_instance.preBetDataDic['data']['integrate'][a + str(inner_item[1])]
                    bet_str += '%s|%s|%s|%s;' % (a, int(inner_item[1]), peilv, bet_money)
        except Exception, ex:
            logging.error(ex, exc_info=1)
            return ""

        bet_str += "&v=%s" % version_number

        logging.info("bet_str=%s" % bet_str)
        return bet_str

    def bet(self):
        if not self.console_instance.all_ball_needToBetList:
            logging.error(u"【下注中】下注列表为空，啥都不干...")
            return {}

        logging.info(u"【下注中】组装下注URI..")
        logging.info(self.console_instance.loginSuccessData)
        now = getCurrentTimestamp()
        pk_post_bet_url = self.console_instance.loginSuccessData['pk_post_bet_url'].split("&&_=")[0] + "&&_=" + str(
                now) + "__ajax"
        logging.info(u"【下注中】pk_post_bet_url=%s" % pk_post_bet_url)

        bet_str = self.get_bet_str()
        if not bet_str:
            logging.error(u"【下注中】生成下注str出错！")
            logging.error(u"【下注中】再次拿预下注数据！")
            return

        a = bet_str.split('&')
        payload = {
            't': a[0].split('=')[1],
            'v': int(a[1].split('=')[1])
        }
        logging.info("payload=%s" % payload)

        r = requests.post(pk_post_bet_url, params=payload,
                          cookies=self.console_instance.loginSuccessData['cookies_jar'],
                          headers=self.console_instance.loginSuccessData['headers'], timeout=15)
        real_content = r.content.split('êêê')[0]
        real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf

        logging.info(u"【下注中】 字符串=%s" % real_content)

        real_content = real_content.replace("u'", "'").replace("'", '"')
        t_json = json.loads(real_content)

        logging.info(u"【下注中】 json=%s" % t_json)
        return t_json

    def bet_fake(self):
        return {'state': 1}

    def run(self):
        if self.console_instance.fake_mode:
            ret_json = self.bet_fake()
        else:
            ret_json = self.bet()

        # 先判斷是否下注成功。。。
        bet_success_flag = True
        if int(ret_json['state']) != 1:
            bet_success_flag = False
        if "errors" in ret_json and ret_json["errors"]:
            if len(ret_json['errors']) > 0:
                bet_success_flag = False
                for err in ret_json['errors']:
                    logging.error(u"【下注結果】錯誤=%s" % err['note'])

        if bet_success_flag:
            logging.info(u"【下注结果】成功！！！")
            QMetaObject.invokeMethod(self.console_instance, "betSuccess", Qt.QueuedConnection)
        else:
            logging.error(u"【下注结果】失败！！！")
            logging.error(u"【下注結果】 %s" % json.dumps(ret_json))
            QMetaObject.invokeMethod(self.console_instance, "betFailed", Qt.QueuedConnection)
