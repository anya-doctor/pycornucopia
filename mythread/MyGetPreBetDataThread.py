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

    def get_pre_bet_data(self):
        logging.info(u"【获取预下注数据线程】开始获取...")
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

            logging.info(u"【获取预下注数据线程】%s" % id(rr1))

            real_content = rr1.content.split('êêê')[0]
            rr1.close()
            real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
            # logging.info("real_content_%s =%s" % (i, real_content))

            # 当然在这里有可能遇到不想要的东西
            if "/webssc/js/plugins/ValidatorAlert" in real_content:
                # 说明应该重新登录了...
                return None
            if "window.parent.location.href =" in real_content:
                # 说明应该重新登录了...
                return None

            # 如果一个json长度不对劲，那么就跳过这个吧...
            if len(real_content) <= 1:
                return "NULL_DATA"

            try:
                t_json = json.loads(real_content)
            except Exception,ex:
                logging.error(rr1.content)
                logging.error(real_content)
                logging.info(u"【获取预下注数据线程】解析json数据失败...")
                raise ex
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

            if json_data == "NULL_DATA":
                logging.info(u"【获取预下注数据线程】本次请求拿到的数据为NULL，不算数...")
            elif not json_data:
                logging.info(u"【获取预下注数据线程】被挤下线，重新触发登录逻辑！")
                QMetaObject.invokeMethod(self.console, "onLoginBtn", Qt.QueuedConnection)
                name = self.console.nameEntry.text()
                name += u"【未登录】"
                logging.info(u"【获取预下注数据线程】窗口标题=%s" % name)
                QMetaObject.invokeMethod(self.console.parent, "mySetWindowTitle", Qt.QueuedConnection, Q_ARG(str, name))

            elif json_data and isinstance(json_data, dict):
                QMetaObject.invokeMethod(self.console, "onUpdatePreBetDataHideBtn", Qt.QueuedConnection,
                                         Q_ARG(dict, json_data))
        except Exception, ex:
            logging.error(ex, exc_info=1)
