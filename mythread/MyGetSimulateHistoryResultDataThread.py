# #coding:utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common.common import req_session
from myutil.tool import MyTool


class MyGetSimulateHistoryResultDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console = console

    def run(self):
        try:
            # http://pc10.sss44.us/scowa14889f_39473/pk/result/index?&_=1514773138202__ajax HTTP/1.1

            logging.info(u"【获取模拟用的历史数据线程】线程run()中...")
            now = MyTool.getCurrentTimestamp()
            url = self.console.loginSuccessData['origin_url'] + "pk/result/index?&_=%s__ajax" % now

            import datetime
            today = datetime.datetime.today()
            today_1 = today - datetime.timedelta(days=1)
            today_2 = today_1 - datetime.timedelta(days=1)
            date_list = [today, today_1, today_2]
            date_list = [v.strftime("%Y-%m-%d") for v in date_list]

            res = []
            success_flag = True
            for date in date_list:
                payload = {
                    'date': date
                }
                r1 = requests.Request('POST', url, data=payload, headers=self.console.loginSuccessData['headers'],
                                      cookies=self.console.loginSuccessData['cookies_jar'])
                prep1 = req_session.prepare_request(r1)
                rr1 = req_session.send(prep1, stream=False, timeout=10)
                real_content = rr1.content.split('êêê')[0]
                real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
                # logging.info(real_content)
                json_data = json.loads(real_content)
                if int(json_data['state']) != 1:
                    logging.error(u"【获取模拟用的历史数据线程】出错！")
                    logging.error(real_content)
                    success_flag = False
                    break
                else:
                    res.extend(json_data['data']['result'])
            if success_flag:
                QMetaObject.invokeMethod(self.console, "onUpdateSimulateHistoryResultDataHideBtn", Qt.QueuedConnection,
                                         Q_ARG(list, res))
            else:
                msgtitle = u"失败了"
                msg = u"获取模拟用的历史数据失败，请重试..."
                QMetaObject.invokeMethod(self.console, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                         Q_ARG(str, msg))

        except Exception, ex:
            logging.error(ex, exc_info=1)
            msgtitle = u"失败了"
            msg = u"获取模拟用的历史数据失败，请重试..."
            QMetaObject.invokeMethod(self.console, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
