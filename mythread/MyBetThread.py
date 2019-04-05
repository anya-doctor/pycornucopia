# coding=utf-8
import copy
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common import common
from common.common import req_session
from myutil.tool.MyTool import getCurrentTimestamp


class MyBetDataThread(QtCore.QThread):
    def __init__(self, console_instance, all_ball_needToBetList, peilv_dict):
        super(MyBetDataThread, self).__init__()
        self.console_instance = console_instance
        self.all_ball_needToBetList = all_ball_needToBetList
        self.peilv_dict = peilv_dict

    def get_bet_str(self):
        try:
            if not self.console_instance.preBetDataDic:
                logging.error(u"【下注线程】拿不到下注前数据！！！放弃此次下注！")
                return ""
            if not self.peilv_dict:
                logging.error(u"【下注线程】如果拿不到赔率list！！！放弃此次下注！")
                return ""

            version_number = self.console_instance.preBetDataDic['data']['version_number']
            # t=010|0|1.9829|2;000|1|9.9112|2;011|1|1.9829|3;&v=37
            bet_str = "t="
            t_str = ""
            for item in self.all_ball_needToBetList:
                '''
                all_ball_needToBetList = [
                    [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
                    [],
                    ...
                ]'''
                logging.info("########%s " % item)
                # item = [661626, 661626, 0, [1, '6'], 1, 0]
                bet_money = self.console_instance.balls_bet_amount[item[2]]
                if int(bet_money) == 0:
                    logging.info(u"【下注线程】item=%s, 金额为0，跳过！！！放弃此次下注！" % item)
                else:
                    logging.info("#####%s" % item[3])
                    for inner_item in item[3]:
                        if self.console_instance.play_mode in [common.PLAYMODE_PK10, common.PLAYMODE_XYFT]:
                            a = common.pk_ball_dic[inner_item[0]]
                        else:
                            a = common.ssc_ball_dic[inner_item[0]]

                        peilv = self.peilv_dict[a + str(inner_item[1])]
                        t_str += '%s|%s|%s|%s;' % (a, int(inner_item[1]), peilv, bet_money)
            if not t_str:  # 那全是0了。。才会放弃下注..
                bet_str += "NULL"
            else:
                bet_str += t_str
        except Exception, ex:
            logging.error(ex, exc_info=1)
            return ""

        bet_str += "&v=%s" % version_number

        logging.info("bet_str=%s" % bet_str)
        return bet_str

    def bet(self):
        if not self.all_ball_needToBetList:
            logging.error(u"【下注线程】下注列表为空，啥都不干...")
            return {-1}

        logging.info(u"【下注线程】组装下注URI..")
        # logging.info(self.console_instance.loginSuccessData)
        now = getCurrentTimestamp()
        pk_post_bet_url = self.console_instance.loginSuccessData['pk_post_bet_url'].split("&&_=")[0] + "&&_=" + str(
                now) + "__ajax"
        logging.info(u"【下注线程】pk_post_bet_url=%s" % pk_post_bet_url)

        bet_str = self.get_bet_str()  # self.console_instance.preBetDataDic['data']['integrate'])
        if not bet_str:
            logging.error(u"【下注线程】生成下注str出错！")
            logging.error(u"【下注线程】再次拿预下注数据！")
            return

        a = bet_str.split('&')

        # 如果全是0，那么就放弃算了。。。
        if a[0].split('=')[1] == 'NULL':
            return {'state': 1}

        payload = {
            't': a[0].split('=')[1],
            'v': int(a[1].split('=')[1])
        }
        logging.info("payload=%s" % payload)

        try:
            """
            如果有什么问题的话，直接让它重登算了...
            15秒下个注应该够了，如果15秒都超时，真的不如重登算了...
            """
            r1 = requests.Request('POST', pk_post_bet_url, data=payload,
                                  headers=self.console_instance.loginSuccessData['headers'],
                                  cookies=self.console_instance.loginSuccessData['cookies_jar'])
            prep1 = req_session.prepare_request(r1)
            r = req_session.send(prep1, stream=False, timeout=15, allow_redirects=False)
        except Exception, ex:
            logging.error(ex, exc_info=1)
            return None

        real_content = r.content.split('êêê')[0]
        r.close()

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

        # logging.info(u"【下注线程】 json=%s" % t_json)
        return t_json

    @staticmethod
    def bet_fake():
        return {'state': 1}

    def run(self):
        try:
            if self.console_instance.fake_mode_bet:
                ret_json = self.bet_fake()
            else:
                ret_json = self.bet()

            if ret_json == {-1}:
                # 说明不需要下注...
                logging.info(u"【下注线程】真是奇了怪了，竟然不需要下注？？！！！下注列表为空？？？")
                pass
            elif not ret_json:
                logging.info(u"【下注线程】被挤下线，重新触发登录逻辑！")
                QMetaObject.invokeMethod(self.console_instance, "onLoginBtn", Qt.QueuedConnection)

                # 重新开始下注定时器...
                logging.info(u"【下注线程】普通情况-1，可能是登录超时验证，重新开始下注定时器rebetTimer！！！！")
                QMetaObject.invokeMethod(self.console_instance, "onRetBetHidenBtn", Qt.QueuedConnection,
                                         Q_ARG(list, self.all_ball_needToBetList),
                                         Q_ARG(dict, self.peilv_dict))

                name = self.console_instance.nameEntry.text()
                name += u"【未登录】"
                logging.info(u"【下注线程】窗口标题=%s" % name)
                QMetaObject.invokeMethod(self.console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                         Q_ARG(str, name))
            else:
                # 先判斷是否下注成功。。。
                bet_success_flag = False
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
                                    logging.info(u"【下注线程】普通情况-2，网络繁忙，重新开始下注定时器rebetTimer！！！！")
                                    QMetaObject.invokeMethod(self.console_instance, "onRetBetHidenBtn",
                                                             Qt.QueuedConnection,
                                                             Q_ARG(list, self.all_ball_needToBetList),
                                                             Q_ARG(dict, self.peilv_dict))
                    # 处理赔率更改
                    elif int(ret_json['state']) == 2 and not ret_json["errors"]:
                        logging.info(u"【下注线程】赔率更改...")
                        fail_orders = ret_json['data']['user']['fail_orders'] if ('user' in ret_json[
                            'data'] and 'fail_orders' in ret_json['data']['user']) else -1
                        fail_orders = int(fail_orders)
                        logging.info(u"【下注线程】赔率更改，失败订单数=%s" % fail_orders)
                        '''
                        "orders": {
                            "0004": 9.911,
                            "0005": 9.911,
                            "0007": 9.911,
                            "0002": 9.911,
                            "0008": 9.911,
                            "0009": 9.911
                        }
                      '''
                        new_peilv_dic = ret_json['data']['user']['orders']
                        logging.info(u"【下注线程】新赔率=%s" % new_peilv_dic)

                        # 过滤出失败赔率的下注
                        b = copy.deepcopy(self.all_ball_needToBetList)
                        rebet_list = []
                        for item in b:
                            for inner_item in item[3]:
                                if self.console_instance.play_mode in [common.PLAYMODE_PK10, common.PLAYMODE_XYFT]:
                                    a = common.pk_ball_dic[inner_item[0]]
                                else:
                                    a = common.ssc_ball_dic[inner_item[0]]
                                b = a + str(inner_item[1])
                                if b in new_peilv_dic:
                                    new_item = copy.deepcopy(item)
                                    new_item[3] = [inner_item]
                                    rebet_list.append(new_item)
                        logging.info(u"【下注线程】普通情况-3，赔率更新，重下注的list=%s" % rebet_list)
                        QMetaObject.invokeMethod(self.console_instance, "onRetBetHidenBtn",
                                                 Qt.QueuedConnection, Q_ARG(list, rebet_list),
                                                 Q_ARG(dict, new_peilv_dic))

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
