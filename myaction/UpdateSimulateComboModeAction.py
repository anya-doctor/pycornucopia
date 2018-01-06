# coding:utf-8
import logging

from PyQt4.QtCore import *

from myutil.tool.MyTool import beautiful_log


class MyUpdateSimulateComboModeAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【控制台】切换模拟模式\正常模式")
            # 0 - 正常， 1 - 模拟
            mode = int(console_instance.isSimulate_combobox.currentIndex())
            logging.info(u"【控制台】mode=%s..." % mode)
            if mode == 1:
                if console_instance.getPreBetDatgaTimer:
                    logging.info(u"【模拟下注中】停掉获取预下注数据定时器...")
                    console_instance.getPreBetDatgaTimer.stop()
                # 不准真实下注
                console_instance.goBtn.setEnabled(False)
            elif mode == 0:
                if console_instance.getPreBetDatgaTimer:
                    logging.info(u"【模拟下注中】开启获取预下注数据定时器...")
                    console_instance.getPreBetDatgaTimer.start()
                if console_instance.getHistoryResultDataTimer:
                    logging.info(u"【模拟下注中】开启获取历史数据定时器...")
                    console_instance.getHistoryResultDataTimer.start()
        except Exception, ex:
            logging.error(ex)
