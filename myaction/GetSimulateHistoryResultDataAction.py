# coding:utf-8
import logging

from PyQt4.QtCore import *

from myutil.tool.MyTool import beautiful_log


class MyGetSimulateHistoryResultDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        """
        如果登录成功，则会回调这个函数，则开启获取历史数据！
        :param data_dic:
        :return:
        """
        try:
            from_date = console_instance.cal_from.date().toString("yyyy-MM-dd")
            to_date = console_instance.cal_to.date().toString("yyyy-MM-dd")
            if to_date < from_date:
                msgtitle = u"失误了"
                msg = u"开始日期应该小于等于结束日期..."
                QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
            else:
                logging.info(u"【获取模拟用的历史数据】开启定时器...")
                # 开始定时器之前先销毁一波...
                if console_instance.getSimulateHistoryResultDataTimer:
                    del console_instance.getSimulateHistoryResultDataTimer

                console_instance.getSimulateHistoryResultDataTimer = QTimer()
                console_instance.getSimulateHistoryResultDataTimer.timeout.connect(
                        lambda: MyGetSimulateHistoryResultDataAction.do_getHistoryResultData(console_instance))
                console_instance.getSimulateHistoryResultDataTimer.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 开启获取预下注数据线程！
    @staticmethod
    def do_getHistoryResultData(console_instance):
        try:
            # 获取一次模拟数据就好了。。。
            console_instance.getSimulateHistoryResultDataTimer.stop()

            if console_instance.getSimulateHistoryResultDataThread:
                if console_instance.getSimulateHistoryResultDataThread.isRunning():
                    logging.info(u"【获取模拟用的历史数据】老的Thread还在，杀死它...")
                    console_instance.getSimulateHistoryResultDataThread.quit()
                    console_instance.getSimulateHistoryResultDataThread.wait()

            # 获取日历的from-to
            from_date = console_instance.cal_from.date().toString("yyyy-MM-dd")
            to_date = console_instance.cal_to.date().toString("yyyy-MM-dd")

            from mythread.MyGetSimulateHistoryResultDataThread import MyGetSimulateHistoryResultDataThread
            console_instance.getSimulateHistoryResultDataThread = MyGetSimulateHistoryResultDataThread(
                    console_instance.parent,
                    console_instance, from_date, to_date)
            console_instance.getSimulateHistoryResultDataThread.start()

            # 在这里才能把时间间隔调整...
            logging.info(u"【获取历史数据】定时器的时间间隔调整到10秒...")
            console_instance.getSimulateHistoryResultDataTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)
