# coding:utf-8
import logging

from PyQt4.QtCore import *
from PyQt4.QtGui import QComboBox

from mythread.MySimulateBetThread import MySimulateBetThread
from myutil.tool.MyTool import beautiful_log


class MyStartSimulateBetAction(object):
    @staticmethod
    @beautiful_log
    # 响应开始按钮
    def run(console_instance):
        assert isinstance(console_instance.isSimulate_combobox, QComboBox)
        if not console_instance.isSimulate_combobox.currentIndex() == 1:  # 0正常，1模拟
            msgtitle = u"失败了"
            msg = u"请切换到“模拟-开”模式"
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        elif not console_instance.simulate_data:
            msgtitle = u"失败了"
            msg = u"请先载入历史数据，才能开始模拟..."
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        else:
            MyStartSimulateBetAction.for_start(console_instance)

    @staticmethod
    def for_start(console_instance):
        # 先把这些老的进程弄死
        if console_instance.simulateBetThread:
            logging.info(u"【模拟下注ACTION】老的模拟下注数据线程还在，杀死它...")
            console_instance.simulateBetThread.quit()
            console_instance.simulateBetThread.wait()
        console_instance.simulateBetThread = MySimulateBetThread(console_instance)
        console_instance.simulateBetThread.start()
