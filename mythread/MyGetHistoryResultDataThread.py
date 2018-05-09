# #coding:utf-8
import datetime
import json
import logging
from datetime import timedelta

from PyQt4 import QtCore
from PyQt4.QtCore import *

from myutil.tool.MyTool import kaijiang_self_helper


class MyGetHistoryResultDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console_instance):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console_instance = console_instance

    def get_data(self):
        # 这里就只考虑从本地网站拿数据好了。
        # 因为只能登录 + 实时，才能到达此处...
        json_data = {
            'data': {
                'result': []
            }
        }
        today = datetime.datetime.today()
        day = timedelta(days=1)
        yesterday = today - day
        date_list = [today, yesterday]
        try:
            for _date in date_list:
                res = kaijiang_self_helper(self.console_instance, _date.strftime("%Y-%m-%d"),
                                           self.console_instance.play_mode)
                json_data['data']['result'].extend(res)
            return json_data
        except Exception, ex:
            logging.error(ex, exc_info=1)
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
