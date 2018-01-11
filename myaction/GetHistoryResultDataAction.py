# coding:utf-8
import logging

from PyQt4.QtCore import *

from myutil.tool.MyTool import beautiful_log


class MyGetHistoryResultDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        """
        如果登录成功，则会回调这个函数，则开启获取历史数据！
        :param console_instance:
        :return:
        """
        try:
            logging.info(u"【获取历史数据】开启定时器...")
            # 开始定时器之前先销毁一波...
            if console_instance.getHistoryResultDataTimer:
                del console_instance.getHistoryResultDataTimer

            console_instance.getHistoryResultDataTimer = QTimer()
            console_instance.getHistoryResultDataTimer.timeout.connect(
                lambda: MyGetHistoryResultDataAction.do_getHistoryResultData(console_instance))
            console_instance.getHistoryResultDataTimer.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 开启获取预下注数据线程！
    @staticmethod
    def do_getHistoryResultData(console_instance):
        try:
            if console_instance.getHistoryResultDataThread:
                if console_instance.getHistoryResultDataThread.isRunning():
                    logging.info(u"老的getHistoryResultDataThread还在，杀死它...")
                    console_instance.getHistoryResultDataThread.quit()
                    console_instance.getHistoryResultDataThread.wait()

            from mythread.MyGetHistoryResultDataThread import MyGetHistoryResultDataThread
            console_instance.getHistoryResultDataThread = MyGetHistoryResultDataThread(console_instance.parent,
                                                                                       console_instance)
            console_instance.getHistoryResultDataThread.start()

            # 在这里才能把时间间隔调整...
            logging.info(u"【获取历史数据】定时器的时间间隔调整到10秒...")
            console_instance.getHistoryResultDataTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)
