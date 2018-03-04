# #coding:utf-8
import datetime
import json
import logging
from datetime import timedelta

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common.common import req_session
from myutil.tool import MyTool
from myutil.tool.MyTool import xml_helper


class MyGetHistoryResultDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console_instance):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console_instance = console_instance

    def get_data(self):
        now = MyTool.getCurrentTimestamp()
        if self.console_instance.play_mode == 0:
            url = self.console_instance.loginSuccessData['origin_url'] + "pk/result/index?&_=%s__ajax" % now
        else:
            url = self.console_instance.loginSuccessData['origin_url'] + "ssc/result/index?&_=%s__ajax" % now

        r1 = requests.Request('GET', url, headers=self.console_instance.loginSuccessData['headers'],
                              cookies=self.console_instance.loginSuccessData['cookies_jar'])
        prep1 = req_session.prepare_request(r1)
        rr1 = req_session.send(prep1, stream=False, timeout=10, allow_redirects=False)

        real_content = rr1.content.split('êêê')[0]
        rr1.close()

        real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
        try:
            json_data = json.loads(real_content)
        except Exception, ex:
            logging.error(ex)
            logging.error(real_content)
            json_data = {}
        if json_data and isinstance(json_data, dict):
            # 如果确切拿到了数据，那么就更新一次即可..
            if 'result' in json_data['data']:
                # 如果拿到的数据len <= 30，那么说明今天还早，那么就去拿昨天的数据吧。。。
                if len(json_data['data']['result']) <= 30:
                    logging.info(u"【获取历史数据线程】拿到的数据len <= 30，那么说明今天还早，拿昨天的数据...")
                    today = datetime.datetime.today()
                    day = timedelta(days=1)
                    yesterday = today - day
                    res = xml_helper(yesterday.strftime("%Y-%m-%d"), self.console_instance.play_mode)
                    json_data['data']['result'].extend(res)
                return json_data
        return {}

    def run(self):
        try:
            logging.info(u"【获取历史数据线程】线程run()中...")
            if self.console_instance.fake_mode_getHistoryData:
                logging.info(u"【获取历史数据线程】fake 模式生效...")
                with open('config/fake_history.json') as f:
                    json_data = {
                        'data': {
                            'result': json.load(f)
                        }
                    }
            else:
                json_data = self.get_data()
            if json_data:
                logging.info(u"【获取历史数据线程】数据正常，去更新...")
                # 判断是否最近一期为空...
                QMetaObject.invokeMethod(self.console_instance, "onUpdateHistoryResultDataHideBtn", Qt.QueuedConnection,
                                         Q_ARG(dict, json_data))
            else:
                logging.error(u"【获取历史数据线程】数据不正常...")
                logging.error(json_data)
        except Exception, ex:
            logging.error(ex, exc_info=1)
