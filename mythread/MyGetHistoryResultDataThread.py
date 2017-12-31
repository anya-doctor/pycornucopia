# #coding:utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common.common import req_session
from myutil import MyTool


class MyGetHistoryResultDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console = console

    def run(self):
        try:
            logging.info(u"【获取历史数据线程】线程run()中...")
            now = MyTool.getCurrentTimestamp()
            url = self.console.loginSuccessData['origin_url'] + "pk/result/index?&_=%s__ajax" % now

            r1 = requests.Request('GET', url, headers=self.console.loginSuccessData['headers'],
                                  cookies=self.console.loginSuccessData['cookies_jar'])
            prep1 = req_session.prepare_request(r1)
            rr1 = req_session.send(prep1, stream=False, timeout=10)

            real_content = rr1.content.split('êêê')[0]
            real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
            logging.info(u"【获取历史数据线程】结果如下")
            logging.info(real_content)

            json_data = json.loads(real_content)
            if json_data and isinstance(json_data, dict):
                # 如果确切拿到了数据，那么就更新一次即可..
                if 'result' in json_data['data']:
                    # 判断是否最近一期为空...
                    QMetaObject.invokeMethod(self.console, "onUpdateHistoryResultDataHideBtn", Qt.QueuedConnection,
                                             Q_ARG(dict, json_data))
        except Exception, ex:
            logging.error(ex, exc_info=1)
