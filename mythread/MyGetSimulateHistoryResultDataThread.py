# #coding:utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common.common import req_session
from myutil.tool import MyDate
from myutil.tool import MyTool
from myutil.tool.MyTool import xml_helper, getToday


class MyGetSimulateHistoryResultDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console, from_date, to_date):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console_instance = console
        self.from_date = str(from_date)
        self.to_date = str(to_date)

    def run(self):
        try:
            # http://kaijiang.500.com/static/info/kaijiang/xml/bjpkshi/20180108.xml?_A=YFSAQORP1515509516031
            # 北京： http://bwlc.net/bulletin/trax.html
            # http://pc10.sss44.us/scowa14889f_39473/pk/result/index?&_=1514773138202__ajax HTTP/1.1
            logging.info(u"【获取模拟用的历史数据线程】线程run()中...")
            res = []
            date_list = MyDate.get_date_list(self.from_date, self.to_date)
            fail_date = []

            today = getToday()
            for _date in date_list:
                date = _date.strftime("%Y-%m-%d")
                try:
                    day_data = xml_helper(date, self.console_instance.play_mode)
                    if len(day_data) < 100 and date != today:
                        logging.error(u"【获取模拟用的历史数据线程】date=%s，数据len<100并且不是今天！" % date)
                        fail_date.append(date)
                    else:
                        res.extend(day_data)
                except Exception, ex:
                    logging.error(u"【获取模拟用的历史数据线程】date=%s，获取数据失败！" % date)
                    fail_date.append(date)

            if fail_date:
                msgtitle = u"可能出了点无伤大雅的小差错，不影响使用..."
                msg = u"获取模拟用的历史数据失败，可能网络不好；\n可能今天暂无历史数据...\n日期：%s，数据无数据或出错\n请重试..." % fail_date
                QMetaObject.invokeMethod(self.console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                         Q_ARG(str, msg))
            QMetaObject.invokeMethod(self.console_instance, "onUpdateSimulateHistoryResultDataHideBtn", Qt.QueuedConnection,
                                         Q_ARG(list, res))
        except Exception, ex:
            logging.error(ex, exc_info=1)
            msgtitle = u"失败了"
            msg = u"获取模拟用的历史数据失败，可能网络不好；\n可能今天暂无历史数据...\n请重试..."
            QMetaObject.invokeMethod(self.console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))

    def self_helper(self, date):
        """
        自家网站的数据
        :return:
        """
        now = MyTool.getCurrentTimestamp()
        url = self.console_instance.loginSuccessData['origin_url'] + "pk/result/index?&_=%s__ajax" % now

        payload = {
            'date': date
        }
        r1 = requests.Request('POST', url, data=payload, headers=self.console_instance.loginSuccessData['headers'],
                              cookies=self.console_instance.loginSuccessData['cookies_jar'])
        prep1 = req_session.prepare_request(r1)
        rr1 = req_session.send(prep1, stream=False, timeout=10, allow_redirects=False)
        real_content = rr1.content.split('êêê')[0]
        rr1.close()

        real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
        json_data = json.loads(real_content)
        if int(json_data['state']) != 1:
            logging.error(u"【获取模拟用的历史数据线程】出错！")
            logging.error(real_content)
            return []
        else:
            return json_data['data']['result']
