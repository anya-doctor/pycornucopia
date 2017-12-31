# #coding:utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common.common import req_session


class MyGetPreBetDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console, origin_url, pk_pre_bet_get_data_url, cookies_jar, headers):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console = console
        self.origin_url = origin_url
        self.pk_pre_bet_get_data_url = pk_pre_bet_get_data_url
        self.cookies_jar = cookies_jar
        self.headers = headers

    def get_header_data(self):
        """
            http://pc10.sss44.us/scowa14889f_39473/ssc/header/index?&_=1514696130757__autorefresh
        """
        r1 = requests.Request('POST', self.pk_pre_bet_get_data_url, params=payload, cookies=self.cookies_jar,
                              headers=self.headers)
        prep1 = req_session.prepare_request(r1)
        rr1 = req_session.send(prep1, stream=False, timeout=10)

    def get_pre_bet_data(self):
        logging.info("#####################start to get pre bet data...#####################")
        if not self.origin_url:
            return -1
        t = ['ballNO15', 'ballNO60']
        res = []
        for i in t:
            payload = {
                'myaction': 'ajax',
                'play': i,
                'ball': '',
                'cat': 15
            }

            r1 = requests.Request('POST', self.pk_pre_bet_get_data_url, params=payload, cookies=self.cookies_jar,
                                  headers=self.headers)
            prep1 = req_session.prepare_request(r1)
            rr1 = req_session.send(prep1, stream=False, timeout=10)

            # r = requests.post(self.pk_pre_bet_get_data_url, params=payload, cookies=self.cookies_jar,
            #                   headers=self.headers, timeout=10)
            real_content = rr1.content.split('êêê')[0]
            real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
            logging.info("real_content_%s =%s" % (i, real_content))

            # 当然在这里有可能遇到不想要的东西
            if "/webssc/js/plugins/ValidatorAlert" in real_content:
                # 说明应该重新登录了...
                return None
            if "window.parent.location.href =" in real_content:
                # 说明应该重新登录了...
                return None

            t_json = json.loads(real_content)
            if t_json and t_json['data']['success']:
                version_number = t_json['data']['version_number']
                win = t_json['data']['win'] if 'win' in t_json['data'] else 'NULL'
                logging.info('version_number=%s' % version_number)
                logging.info('win=%s' % win)
            else:
                version_number = -1
                logging.error("版本号拿不到咯！！！！")
                t_json = {}
            res.append(t_json)
        # 合并两个预下注数据
        pk_15_predata_json = res[0]
        pk_60_predata_json = res[1]
        try:
            if isinstance(pk_15_predata_json['data']['integrate'], dict) and isinstance(
                    pk_60_predata_json['data']['integrate'], dict):
                for key, value in pk_15_predata_json['data']['integrate'].iteritems():
                    pk_60_predata_json['data']['integrate'][key] = value
            else:
                logging.info(">>>Have No integrate Data<<<")
        except Exception, ex:
            logging.error(ex, exc_info=1)
            logging.error(pk_15_predata_json['data']['integrate'])
            logging.error(type(pk_15_predata_json['data']['integrate']))
            logging.error(pk_60_predata_json['data']['integrate'])
            logging.error(type(pk_60_predata_json['data']['integrate']))

        logging.info("#####################end to get pre bet data...#####################")
        return pk_60_predata_json

    def get_pre_bet_date_fake(self):
        with open('config/fake_data.json', 'r') as f:
            a = f.read()
        return json.loads(a)

    def run(self):
        try:
            if self.console.fake_mode_getPreBetData:
                json_data = self.get_pre_bet_date_fake()
            else:
                json_data = self.get_pre_bet_data()

            if not json_data:
                logging.info("======================RELOGIN======================")
                QMetaObject.invokeMethod(self.console, "onLoginBtn", Qt.QueuedConnection)
            elif json_data and isinstance(json_data, dict):
                QMetaObject.invokeMethod(self.console, "onUpdatePreBetDataHideBtn", Qt.QueuedConnection,
                                         Q_ARG(dict, json_data))
        except Exception, ex:
            logging.error(ex, exc_info=1)
