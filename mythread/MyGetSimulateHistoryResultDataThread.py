# #coding:utf-8
import logging

from PyQt4 import QtCore
from PyQt4.QtCore import *

from common import common
from myutil.tool import MyDate
from myutil.tool.MyTool import getToday, kaijiang_xml_helper_500caipiao, kaijiang_self_helper


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
                    logging.info(u"【获取模拟用的历史数据线程】当前数据源=%s" % self.console_instance.kaijiang_data_source)
                    if self.console_instance.kaijiang_data_source == common.KAIJIANG_DATA_SOURCE_SELF:
                        day_data = kaijiang_self_helper(self.console_instance, date, self.console_instance.play_mode)
                    elif self.console_instance.kaijiang_data_source == common.KAIJIANG_DATA_SOURCE_500:
                        day_data = kaijiang_xml_helper_500caipiao(date, self.console_instance.play_mode)
                    logging.info(day_data)
                    if len(day_data) < 100 and date != today:
                        logging.error(u"【获取模拟用的历史数据线程】date=%s，数据len<100并且不是今天！" % date)
                        fail_date.append(date)
                    else:
                        res.extend(day_data)
                except Exception, ex:
                    logging.error(u"【获取模拟用的历史数据线程】date=%s，获取数据失败！" % date, exc_info=1)
                    fail_date.append(date)

            if fail_date:
                msgtitle = u"可能出了点无伤大雅的小差错，不影响使用..."
                msg = u"获取模拟用的历史数据失败，可能网络不好；\n可能今天暂无历史数据...\n日期：%s，数据无数据或出错\n请重试..." % fail_date
                QMetaObject.invokeMethod(self.console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                         Q_ARG(str, msg))
            QMetaObject.invokeMethod(self.console_instance, "onUpdateSimulateHistoryResultDataHideBtn",
                                     Qt.QueuedConnection,
                                     Q_ARG(list, res))
        except Exception, ex:
            logging.error(ex, exc_info=1)
            msgtitle = u"失败了"
            msg = u"获取模拟用的历史数据失败，可能网络不好；\n可能今天暂无历史数据...\n请重试..."
            QMetaObject.invokeMethod(self.console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
