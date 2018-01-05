# coding:utf-8
import json
import logging

from PyQt4.QtCore import *
from PyQt4.QtGui import QTableWidget

from myutil.tool.MyTool import beautiful_log


class MyClearKaijiangInfoAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【控制台】清空开奖信息...")
            assert isinstance(console_instance.viewEntry, QTableWidget)
            console_instance.viewEntry.clearContents()
            console_instance.viewEntry.setRowCount(0)

            logging.info(u"【控制台】清空下注列表...")
            console_instance.all_ball_needToBetList = []
        except Exception, ex:
            logging.error(ex)

    @staticmethod
    def is_number(s):
        try:
            float(s)
            return True
        except ValueError:
            pass

        try:
            import unicodedata
            unicodedata.numeric(s)
            return True
        except (TypeError, ValueError):
            pass

        return False