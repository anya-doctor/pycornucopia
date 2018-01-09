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
            logging.info(u"【更换正常模拟模式ACTION】mode=%s..." % u"模拟" if mode==1 else u"正常")
            if mode == 1:
                if console_instance.getPreBetDatgaTimer:
                    logging.info(u"【更换正常模拟模式ACTION】停掉获取预下注数据定时器...")
                    console_instance.getPreBetDatgaTimer.stop()
                # 不准真实下注
                console_instance.goBtn.setEnabled(False)
            elif mode == 0:
                # 在登录的前提下...开启相应的定时器
                if  console_instance.loginSuccessData:
                    if console_instance.getPreBetDatgaTimer:
                        logging.info(u"【更换正常模拟模式ACTION】开启获取预下注数据定时器...")
                        console_instance.getPreBetDatgaTimer.start(1000)
                    if console_instance.getHistoryResultDataTimer:
                        logging.info(u"【更换正常模拟模式ACTION】开启获取历史数据定时器...")
                        console_instance.getHistoryResultDataTimer.start(1000)
        except Exception, ex:
            logging.error(ex)
