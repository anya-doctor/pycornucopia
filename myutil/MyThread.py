# coding=utf-8
import time
import json
import requests
import logging

from PyQt4 import QtCore, QtGui

from myutil.MyTool import getCurrentTimestamp


class MyGetPreBetDataThread(QtCore.QThread):
    def __init__(self, webView, bet_balls_list, bet_money_list):
        super(MyGetPreBetDataThread, self).__init__()
        self.webView = webView
        self.bet_balls_list = bet_balls_list
        self.bet_money_list = bet_money_list

    def get_pre_bet_data(self):
        webView = self.webView

        logging.info("start to get pro bet data...")
        if not webView.origin_url:
            return -1
        t = ['ballNO15', 'ballNO60']
        res = []
        for i in t:
            payload={
                'action': 'ajax',
                'play': i,
                'ball': '',
                'cat': 15
            }

            r = requests.post(webView.pk_pre_bet_get_data_url, params=payload, cookies=webView.cookies_jar, headers=webView.headers, timeout=5)
            real_content = r.content.split('êêê')[0]
            real_content = real_content.replace('\xef\xbb\xbf','')  # 去掉BOM开头的\xef\xbb\xbf

            logging.info("real_content=%s" % real_content)

            t_json = json.loads(real_content)
            if t_json and t_json['data']['success']:
                version_number = t_json['data']['version_number']
                print 'version_number=%s' % version_number
            else:
                version_number = -1
                logging.error("版本号拿不到咯！！！！")
                t_json = {}
            res.append(t_json)
        return res

    def get_bet_str(self, bet_balls_list, bet_money_list):
        pre_bet_data = self.get_pre_bet_data()
        if not pre_bet_data:
            logging.error("拿不到下注前数据？")
            return ""

        t15 = pre_bet_data[0]
        t60 = pre_bet_data[1]
        version_number = t15['data']['version_number']
        # t=010|0|1.9829|2;000|1|9.9112|2;011|1|1.9829|3;&v=37
        dic1 = {
            1:"000",
            2:"001",
            3:"002",
            4:"003",
            5:"004",
            6:"005",
            7:"006",
            8:"007",
            9:"008",
            10:"009",
        }
        bet_str = "t="
        try:
            for bet_row in bet_balls_list:
                print bet_row
                index = bet_row[0]
                betlist = bet_row[1]
                betflag = bet_row[2]
                a = dic1[index]
                for ball in betlist:
                    bet_money = bet_money_list[betflag]
                    if index < 6:
                        peilv = t15['data']['integrate'][a+str(index)]
                    else:
                        peilv = t60['data']['integrate'][a+str(index)]
                    bet_str += '%s|%s|%s|%s;'  % (a, int(ball), peilv, bet_money)
        except Exception, ex:
            logging.error(ex, exc_info=1)
            logging.info(t15['data']['integrate'])
            logging.info(t60['data']['integrate'])

        bet_str += "&v=%s" % version_number

        logging.info("bet_str=%s" % bet_str)
        return bet_str

    def bet(self, bet_balls_list, bet_money_list):
        if not bet_balls_list:
            logging.error("bet_balls_list = [], do nothing...")
            return {}

        now = getCurrentTimestamp()
        self.webView.pk_pre_bet_get_data_url = self.webView.origin_url.split("index.htm")[0] + 'pk/order/list?&_=%s__autorefresh' % now
        self.webView.pk_post_bet_url = self.webView.origin_url.split("index.htm")[0] + 'pk/order/leftInfo/?post_submit&&_=%s__ajax' % now

        bet_str = self.get_bet_str(bet_balls_list, bet_money_list)
        if not bet_str:
            logging.error("have not bet_str....")
            logging.error("get the pre bet data again...")
            return

        a = bet_str.split('&')

        payload={
            't': a[0].split('=')[1],
            'v': int(a[1].split('=')[1])
        }

        logging.info("payload=%s" % payload)

        r = requests.post(self.webView.pk_post_bet_url, params=payload, cookies=self.webView.cookies_jar, headers=self.webView.headers, timeout=15)
        real_content = r.content.split('êêê')[0]
        real_content = real_content.replace('\xef\xbb\xbf','')  # 去掉BOM开头的\xef\xbb\xbf

        print real_content

        t_json = json.loads(real_content)
        print t_json
        return t_json

    def run(self):
        logging.info("=================START RUN BET=========================")
        self.bet(self.bet_balls_list, self.bet_money_list)
        logging.info("=================END RUN BET===========================")

