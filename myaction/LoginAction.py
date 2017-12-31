# coding:utf-8
import logging

from PyQt4.QtCore import *

from mythread.MyLoginThread import MyLoginThread
from myutil.tool.MyTool import beautiful_log


class MyLoginAction(object):
    # 响应保存按钮
    @staticmethod
    @beautiful_log
    @pyqtSlot()
    def run(console_instance):
        try:
            logging.info(u"你按下了登录按钮！")
            # 先把老的登录进程杀死
            console_instance.loginTimer = QTimer()
            console_instance.loginTimer.timeout.connect(lambda: MyLoginAction.do_login(console_instance))
            console_instance.loginTimer.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 响应登录按钮
    @staticmethod
    def do_login(console_instance):
        # 先杀死老的登录进程
        if console_instance.loginThread:
            if console_instance.loginThread.isRunning():
                logging.info(u"【登录】老的loginThread还在，杀死它...")
                console_instance.loginThread.quit()
                console_instance.loginThread.wait()

        # 先把这些老的进程弄死
        if console_instance.getPreBetDataThread:
            logging.info(u"【登录】老的获取预下注数据线程还在，杀死它...")
            console_instance.getPreBetDataThread.quit()
            console_instance.getPreBetDataThread.wait()
        if console_instance.getHistoryResultDataThread:
            logging.info(u"【登录】老的获取开奖数据线程，杀死它...")
            console_instance.getHistoryResultDataThread.quit()
            console_instance.getHistoryResultDataThread.wait()

        # 如果获取数据的定时器还开着，那么就关掉
        if console_instance.getPreBetDatgaTimer:
            logging.info(u"【登录】，停掉【获取预下注数据定时器】...")
            console_instance.getPreBetDatgaTimer.stop()
        if console_instance.getHistoryResultDataTimer:
            logging.info(u"【登录】，停掉【获取开奖数据定时器】...")
            console_instance.getHistoryResultDataTimer.stop()

        console_instance.loginThread = MyLoginThread(console_instance.parent.overlay, console_instance)
        console_instance.loginThread.start()

        console_instance.parent.overlay.show()

        # 在这里才能把时间间隔调整...
        logging.info(u"我把【登录定时器】的时间间隔调整到15秒...")
        console_instance.loginTimer.setInterval(15 * 1000)
