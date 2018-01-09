# #coding:utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common.common import req_session
from myutil.tool import MyDate
from myutil.tool import MyTool


class MyGetSimulateHistoryResultDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console, from_date, to_date):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console = console
        self.from_date = str(from_date)
        self.to_date = str(to_date)

    def run(self):
        try:
            # http://pc10.sss44.us/scowa14889f_39473/pk/result/index?&_=1514773138202__ajax HTTP/1.1

            logging.info(u"【获取模拟用的历史数据线程】线程run()中...")
            now = MyTool.getCurrentTimestamp()
            url = self.console.loginSuccessData['origin_url'] + "pk/result/index?&_=%s__ajax" % now

            res = []
            success_flag = True
            date_list = MyDate.get_date_list(self.from_date, self.to_date)
            print date_list
            for _date in date_list:
                date = _date.strftime("%Y-%m-%d")
                payload = {
                    'date': date
                }
                r1 = requests.Request('POST', url, data=payload, headers=self.console.loginSuccessData['headers'],
                                      cookies=self.console.loginSuccessData['cookies_jar'])
                prep1 = req_session.prepare_request(r1)
                rr1 = req_session.send(prep1, stream=False, timeout=10, allow_redirects=False)
                real_content = rr1.content.split('êêê')[0]
                rr1.close()

                real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
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
