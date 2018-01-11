# #coding:utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *
from requests.exceptions import ReadTimeout

from common.common import req_session


class MyGetPreBetDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console_instance, origin_url, pk_pre_bet_get_data_url, cookies_jar, headers):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console_instance = console_instance
        self.origin_url = origin_url
        self.pk_pre_bet_get_data_url = pk_pre_bet_get_data_url
        self.cookies_jar = cookies_jar
        self.headers = headers

    def get_pre_bet_data(self):
        try:
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
                rr1 = req_session.send(prep1, stream=False, timeout=10, allow_redirects=False)
                real_content = rr1.content.split('êêê')[0]
                rr1.close()
                real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf

                # 当然在这里有可能遇到不想要的东西
                if "/webssc/js/plugins/ValidatorAlert" in real_content:
                    logging.error(u"【获取预下注数据线程】遇到ValidatorAlert，算了重登吧...")
                    return 'RELOGIN'
                if "window.parent.location.href =" in real_content:
                    logging.error(u"【获取预下注数据线程】遇到window.parent.location.href，算了重登吧...")
                    return 'RELOGIN'
                if "Request unsuccessful" in real_content:
                    logging.error(u"【获取预下注数据线程】遇到Request unsuccessful，算了重登吧...")
                    return "RELOGIN"
                if len(real_content) <= 1:
                    logging.error(u"【获取预下注数据线程】JSON请求长度不大对，当做没请求过...")
                    return "NULL_DATA"

                try:
                    t_json = json.loads(real_content)
                except Exception, ex:
                    logging.error(rr1.content)
                    logging.error(real_content)
                    logging.info(u"【获取预下注数据线程】解析json数据失败...")
                    return "NULL_DATA"

                if t_json and t_json['data']['success']:
                    version_number = t_json['data']['version_number']
                    win = t_json['data']['win'] if 'win' in t_json['data'] else 'NULL'
                    logging.info('version_number=%s' % version_number)
                    logging.info('win=%s' % win)
                else:
                    version_number = -1
                    logging.error(u"【获取预下注数据线程】版本号拿不到咯！！！！")
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
            return pk_60_predata_json
        except ReadTimeout, ex:
            logging.error(u"【获取预下注数据线程】获取数据超时...")
            return "TIMEOUT"
        except requests.ConnectionError:
            logging.error(u"【获取预下注数据线程】对方服务器关闭了连接，重登录吧...")
            return "RELOGIN"
        except Exception, ex:
            logging.error(u"【获取预下注数据线程】未知错误，返回NULL_DATA")
            logging.error(str(ex))
            return "NULL_DATA"

    def get_pre_bet_date_fake(self):
        with open('config/fake_data.json', 'r') as f:
            a = f.read()
        return json.loads(a)

    def run(self):
        try:
            if self.console_instance.fake_mode_getPreBetData:
                json_data = self.get_pre_bet_date_fake()
            else:
                json_data = self.get_pre_bet_data()

            if json_data == "TIMEOUT":
                pass  # 仅仅是超时罢了，不用理会..
            elif json_data == "NULL_DATA":
                logging.info(u"【获取预下注数据线程】本次请求拿到的数据为NULL，不算数...")

                """
                  这一段逻辑是为了防止一些我没想到的bug，导致获取预下注数据失败。。。、
                  逻辑1：每次获取成功，则console_instance.getPreBetDataFailedCnt清零
                  逻辑2：一旦失败次数>=4，则重启，同时console_instance.getPreBetDataFailedCnt清零
               """
                self.console_instance.getPreBetDataFailedCnt += 1
                logging.info(u"【获取预下注数据线程】当前获取数据失败次数=%s" % self.console_instance.getPreBetDataFailedCnt)
                if self.console_instance.getPreBetDataFailedCnt >= 3:
                    logging.info(u"【获取预下注数据线程】因为失败次数>=3实在过多...重新登录吧！")
                    QMetaObject.invokeMethod(self.console_instance, "onLoginBtn", Qt.QueuedConnection)
                    name = self.console_instance.nameEntry.text()
                    name += u"【未登录】"
                    logging.info(u"【获取预下注数据线程】窗口标题=%s" % name)
                    QMetaObject.invokeMethod(self.console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                             Q_ARG(str, name))
                    self.console_instance.getPreBetDataFailedCnt = 0  # 失败次数清零

            elif json_data == "RELOGIN":
                logging.info(u"【获取预下注数据线程】被挤下线，重新触发登录逻辑！")
                QMetaObject.invokeMethod(self.console_instance, "onLoginBtn", Qt.QueuedConnection)
                name = self.console_instance.nameEntry.text()
                name += u"【未登录】"
                logging.info(u"【获取预下注数据线程】窗口标题=%s" % name)
                QMetaObject.invokeMethod(self.console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                         Q_ARG(str, name))

            elif json_data and isinstance(json_data, dict):
                QMetaObject.invokeMethod(self.console_instance, "onUpdatePreBetDataHideBtn", Qt.QueuedConnection,
                                         Q_ARG(dict, json_data))
        except Exception, ex:
            logging.error(ex, exc_info=1)
