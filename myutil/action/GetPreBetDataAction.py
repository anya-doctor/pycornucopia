# coding:utf-8
import logging

from PyQt4.QtCore import *

from myutil.MyTool import beautiful_log


class MyGetPreBetDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance, data_dic):
        """
        如果登录成功，则会回调这个函数，则开启获取预下注数据！
        :param data_dic:
        :return:
        """
        try:
            # 因为登录成功，所以先把那个自动登录进程杀死吧。
            logging.info(u"我停掉了【登录定时器】...")
            console_instance.loginTimer.stop()

            console_instance.loginSuccessData = data_dic
            console_instance.getPreBetDatgaTimer = QTimer()
            console_instance.getPreBetDatgaTimer.timeout.connect(lambda: MyGetPreBetDataAction.do_getPreBetData(console_instance))
            console_instance.getPreBetDatgaTimer.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 开启获取预下注数据线程！
    @staticmethod
    def do_getPreBetData(console_instance):
        try:
            if console_instance.getPreBetDataThread:
                if console_instance.getPreBetDataThread.isRunning():
                    logging.info(u"老的getPreBetDataThread还在，杀死它...")
                    console_instance.getPreBetDataThread.quit()
                    console_instance.getPreBetDataThread.wait()

            from myutil.mythread.MyGetPreBetDataThread import MyGetPreBetDataThread
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
            logging.info(u"我把【获取预下注数据定时器】的时间间隔调整到10秒...")
            console_instance.getPreBetDatgaTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)
