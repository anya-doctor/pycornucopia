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
            logging.info(u"【更换正常模拟模式ACTION】切换模拟模式\正常模式")
            mode = int(console_instance.isSimulate_combobox.currentIndex())
            mode_str = ""
            if mode == 0:
                mode_str = u"正常"
            elif mode == 1:
                mode_str = u"历史模拟"
            logging.info(u"【更换正常模拟模式ACTION】mode=%s..." % mode_str)
            if mode == 0:
                # 如果切换到正常下注，那么先把timesnow归零。
                console_instance.timesnow = 0
                console_instance.history_data = []
                console_instance.open_balls = []
                console_instance.preBetDataDic = {}

                # 在登录的前提下...开启相应的定时器
                if console_instance.loginSuccessData:
                    if console_instance.getPreBetDatgaTimer:
                        logging.info(u"【更换正常模拟模式ACTION】开启获取预下注数据定时器...")
                        console_instance.getPreBetDatgaTimer.start(1000)
                    if console_instance.getHistoryResultDataTimer:
                        logging.info(u"【更换正常模拟模式ACTION】开启获取历史数据定时器...")
                        console_instance.getHistoryResultDataTimer.start(1000)
            elif mode == 1:
                if console_instance.getPreBetDatgaTimer:
                    logging.info(u"【更换正常模拟模式ACTION】停掉获取预下注数据定时器...")
                    console_instance.getPreBetDatgaTimer.stop()
                # 不准真实下注
                console_instance.goBtn.setEnabled(False)
        except Exception, ex:
            logging.error(ex)
