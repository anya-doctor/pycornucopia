# coding:utf-8
import logging
import os
import sqlite3

from PyQt4.QtCore import *
from PyQt4.uic.properties import QtGui

from common import MySettings
from myutil.tool.MyTool import beautiful_log


class MyUpdateLoseAppendAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【更换赢追加、输追加模式ACTION】切换...")
            mode = int(console_instance.isLoseAdd_combobox.currentIndex())
            mode_str = ""
            if mode == 0:
                mode_str = u"输追加"
            elif mode == 1:
                mode_str = u"赢追加"
            logging.info(u"【更换赢追加、输追加模式ACTION】mode=%s..." % mode_str)
            if mode == 0:
                console_instance.isLoseAdd = True
            elif mode == 1:
                console_instance.isLoseAdd = False

            # 保存数据库...
            logging.info(u"【更换赢追加、输追加模式ACTION】保存到数据库...")
            if not os.path.exists('./config/cqssc.db'):
                QtGui.QMessageBox.about(console_instance, u'错误', u"数据库文件不存在...请重新打开软件.")
                logging.error(u"数据库文件不存在...请重新打开软件.")
                return
            cqssc_db = sqlite3.connect(MySettings.db_file_path)
            t = '0' if console_instance.isLoseAdd else '1'
            sql = u"update config set isLoseAdd = '%s';" % t
            cqssc_db.execute(unicode(sql))
            cqssc_db.commit()
            cqssc_db.close()

        except Exception, ex:
            logging.error(ex)
