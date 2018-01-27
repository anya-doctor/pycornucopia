# coding:utf-8
import logging
import os
import sqlite3

from PyQt4 import QtGui
from PyQt4.QtCore import *

from common import MySettings
from myutil.tool.MyTool import beautiful_log


class MyUpdateNormalQiQiGunAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【更换常规、期期滚模式ACTION】切换...")
            mode = int(console_instance.isLoseAdd_combobox.currentIndex())
            mode_str = ""
            if mode == 0:
                mode_str = u"常规"
            elif mode == 1:
                mode_str = u"期期滚"
            logging.info(u"【更换常规、期期滚模式ACTION】mode=%s..." % mode_str)
            if mode == 0:
                console_instance.isQQG = False
            elif mode == 1:
                console_instance.isQQG = True

            # 保存数据库...
            logging.info(u"【更换常规、期期滚模式ACTION】保存到数据库...")
            if not os.path.exists('./config/cqssc.db'):
                QtGui.QMessageBox.about(console_instance, u'错误', u"数据库文件不存在...请重新打开软件.")
                logging.error(u"数据库文件不存在...请重新打开软件.")
                return
            cqssc_db = sqlite3.connect(MySettings.db_file_path)
            t = '0' if console_instance.isQQG else '1'
            sql = u"update config set isQQG = '%s';" % t
            cqssc_db.execute(unicode(sql))
            cqssc_db.commit()
            cqssc_db.close()

        except Exception, ex:
            logging.error(ex)
