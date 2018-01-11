# coding=utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common import common
from myutil.tool.MyTool import getCurrentTimestamp


class MyBetDataThread(QtCore.QThread):
    def __init__(self, console_instance):
        super(MyBetDataThread, self).__init__()
        self.console_instance = console_instance

    def get_bet_str(self):
        try:
            if not self.console_instance.preBetDataDic:
                logging.error(u"【下注线程】拿不到下注前数据！！！放弃此次下注！")
                return ""
            if not self.console_instance.preBetDataDic['data']['integrate']:
                logging.error(u"【下注线程】如果拿不到赔率list！！！放弃此次下注！")
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
            logging.error(u"【下注线程】下注列表为空，啥都不干...")
            return {}

        logging.info(u"【下注线程】组装下注URI..")
        logging.info(self.console_instance.loginSuccessData)
        now = getCurrentTimestamp()
        pk_post_bet_url = self.console_instance.loginSuccessData['pk_post_bet_url'].split("&&_=")[0] + "&&_=" + str(
            now) + "__ajax"
        logging.info(u"【下注线程】pk_post_bet_url=%s" % pk_post_bet_url)

        bet_str = self.get_bet_str()
        if not bet_str:
            logging.error(u"【下注线程】生成下注str出错！")
            logging.error(u"【下注线程】再次拿预下注数据！")
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

        logging.info(u"【下注线程】 字符串=%s" % real_content)
        # 当然在这里有可能遇到不想要的东西
        if "/webssc/js/plugins/ValidatorAlert" in real_content:
            # 说明应该重新登录了...
            return None
        if "window.parent.location.href =" in real_content:
            # 说明应该重新登录了...
            return None

        real_content = real_content.replace("u'", "'").replace("'", '"')
        t_json = json.loads(real_content)

        logging.info(u"【下注线程】 json=%s" % t_json)
        return t_json

    def bet_fake(self):
        return {'state': 1}

    def run(self):
        try:
            if self.console_instance.fake_mode_bet:
                ret_json = self.bet_fake()
            else:
                ret_json = self.bet()

            if not ret_json:
                logging.info(u"【下注线程】被挤下线，重新触发登录逻辑！")
                QMetaObject.invokeMethod(self.console_instance, "onLoginBtn", Qt.QueuedConnection)

                # 重新开始下注定时器...
                logging.info(u"【下注线程】重新开始下注定时器rebetTimer！！！！")
                QMetaObject.invokeMethod(self.console_instance, "onRetBetHidenBtn", Qt.QueuedConnection)

                name = self.console_instance.nameEntry.text()
                name += u"【未登录】"
                logging.info(u"【下注线程】窗口标题=%s" % name)
                QMetaObject.invokeMethod(self.console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                         Q_ARG(str, name))
            else:
                # 先判斷是否下注成功。。。
                bet_success_flag = True
                if int(ret_json['state']) == 1:
                    bet_success_flag = True
                elif int(ret_json['state']) >= 2:
                    bet_success_flag = False
                    if "errors" in ret_json and ret_json["errors"]:
                        if len(ret_json['errors']) > 0:
                            bet_success_flag = False
                            for err in ret_json['errors']:
                                logging.error(u"【下注线程】eid=%s，錯誤=%s" % (err['eid'], err['note']))
                                if int(err['eid']) == 1111:  # 網絡繁忙，請稍後再試！
                                    # 重新开始下注定时器...
                                    logging.info(u"【下注线程】重新开始下注定时器rebetTimer！！！！")
                                    QMetaObject.invokeMethod(self.console_instance, "onRetBetHidenBtn",
                                                             Qt.QueuedConnection)
                    # 写到文件中。。。
                    with open('config/bet_error_%s.json' % self.console_instance.timesnow, 'w') as f:
                        f.write(json.dumps(ret_json))
                if bet_success_flag:
                    logging.info(u"【下注线程】成功！！！")
                    QMetaObject.invokeMethod(self.console_instance, "betSuccess", Qt.QueuedConnection)
                else:
                    logging.error(u"【下注线程】失败！！！")
                    logging.error(u"【下注线程】 %s" % json.dumps(ret_json))
                    QMetaObject.invokeMethod(self.console_instance, "betFailed", Qt.QueuedConnection,
                                             Q_ARG(dict, ret_json))
        except Exception, ex:
            logging.error(ex, exc_info=1)
