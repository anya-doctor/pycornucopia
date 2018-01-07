# coding:utf-8
import logging

from PyQt4.QtCore import *

from mythread.MyGetPreBetDataThread import MyGetPreBetDataThread
from myutil.tool.MyTool import beautiful_log


class MyGetPreBetDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        """
        如果登录成功，则会回调这个函数，则开启获取预下注数据！
        :param data_dic:
        :return:
        """
        try:
            console_instance.getPreBetDatgaTimer = QTimer()
            console_instance.getPreBetDatgaTimer.timeout.connect(
                    lambda: MyGetPreBetDataAction.do_getPreBetData(console_instance))
            console_instance.getPreBetDatgaTimer.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 开启获取预下注数据线程！
    @staticmethod
    def do_getPreBetData(console_instance):
        try:
            if not console_instance.loginSuccessData:
                logging.info(u"【获取预下注Action】貌似还没登录，稍等5秒钟...")
                console_instance.getPreBetDatgaTimer.setInterval(5 * 1000)
            else:
                if console_instance.getPreBetDataThread:
                    if console_instance.getPreBetDataThread.isRunning():
                        logging.info(u"【获取预下注Action】老的getPreBetDataThread还在，杀死它...")
                        console_instance.getPreBetDataThread.quit()
                        console_instance.getPreBetDataThread.wait()
                    del console_instance.getPreBetDataThread

                console_instance.getPreBetDataThread = MyGetPreBetDataThread(console_instance.parent,
                                                                             console_instance,
                                                                             console_instance.loginSuccessData[
                                                                                 'origin_url'],
                                                                             console_instance.loginSuccessData[
                                                                                 'pk_pre_bet_get_data_url'],
                                                                             console_instance.loginSuccessData[
                                                                                 'cookies_jar'],
                                                                             console_instance.loginSuccessData['headers']
                                                                             )
                console_instance.getPreBetDataThread.start()

                # 在这里才能把时间间隔调整...
                logging.info(u"【获取预下注Action】定时器时间间隔调整到10秒...")
                console_instance.getPreBetDatgaTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)
