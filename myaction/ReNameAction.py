# coding:utf-8
import sqlite3

from PyQt4 import QtGui
from PyQt4.QtCore import *

from common import MySettings
from myutil.tool.MyTool import beautiful_log


class MyReNameAction(object):
    @staticmethod
    @beautiful_log
    # 响应程序改名按钮
    def run(console_instance):
        name = console_instance.nameEntry.text()
        if name == '':
            QtGui.QMessageBox.about(console_instance, u'错误', u"命名不能为空！")
        else:
            cqssc_db = sqlite3.connect(MySettings.db_file_path)
            sql = u"update config set register_code='{name}';".format(name=name)
            cqssc_db.execute(unicode(sql))
            cqssc_db.commit()
            cqssc_db.close()
            QMetaObject.invokeMethod(console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection, Q_ARG(str, name))

            QtGui.QMessageBox.about(console_instance, u'重命名成功', u"祝您财源广进!")
