# coding:utf-8
import logging

from PyQt4.QtCore import *
from PyQt4.QtGui import QPalette

from myutil.MyTool import beautiful_log


class MyUpdatePreBetDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance, data_dict):
        try:
            logging.info(u"【控制台】更新预下注数据")
            console_instance.preBetDataDic = data_dict
            timesnow = console_instance.preBetDataDic['data']['betnotice']['timesnow']
            timeclose = console_instance.preBetDataDic['data']['betnotice']['timeclose']
            timeopen = console_instance.preBetDataDic['data']['betnotice']['timeopen']
            win = console_instance.preBetDataDic['data']['win']

            logging.info("timesnow=%s" % timesnow)
            logging.info("timeclose=%s" % timeclose)
            logging.info("timeopen=%s" % timeopen)
            logging.info("win=%s" % win)

            # 顺便更新下控制台的UI
            console_instance.timeclose_label.setText(u'封盘时间：' + str(timeclose))
            console_instance.timeopen_label.setText(u'下局时间：' + str(timeopen))
            console_instance.qishu_label.setText(u'期数：' + str(timesnow))
            pa = QPalette()
            pa.setColor(QPalette.WindowText, Qt.red)
            console_instance.win_label.setPalette(pa)
            console_instance.win_label.setText(u'赢钱：' + str(win))

            # 如果在封盘期间，则把定时器弄长一点。。。
            if timeclose <= 0 and timeopen > 0:
                console_instance.getPreBetDatgaTimer.setInterval(timeopen * 1000)
            else:
                console_instance.getPreBetDatgaTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)
