# coding:utf-8
import logging

from PyQt4.QtCore import *

from myutil.MyTool import beautiful_log


class MyUpdatePreBetDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance, data_dict):
        try:
            logging.info("################CONSOLE START Update PreBetData################")
            console_instance.preBetDataDic = data_dict
            logging.info("################CONSOLE END Update PreBetData################")

            timeclose = console_instance.preBetDataDic['data']['betnotice']['timeclose']
            timeopen = console_instance.preBetDataDic['data']['betnotice']['timeopen']

            logging.info("timeclose=%s" % timeclose)
            logging.info("timeopen=%s" % timeopen)

            # 如果在封盘期间，则把定时器弄长一点。。。
            if timeclose <= 0 and timeopen > 0:
                console_instance.getPreBetDatgaTimer.setInterval(timeopen * 1000)
            else:
                console_instance.getPreBetDatgaTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)
