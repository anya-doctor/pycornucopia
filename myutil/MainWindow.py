# #coding:utf-8
import logging

from PyQt4 import QtCore, QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import QTableWidget, QTableWidgetItem

from MyConsole import MyConsole
from myutil import MyTool


class MainWindow(QtGui.QMainWindow):
    def __init__(self, parent=None):
        logging.info(u'创建主窗口...')

        QtGui.QMainWindow.__init__(self, parent)

        tabs = QtGui.QTabWidget(self)

        tab2 = QtGui.QWidget()
        tab3 = QtGui.QWidget()

        console = MyConsole(parent=self)

        # tab2 - console
        console.setMinimumSize(1500, 800)
        scroll = QtGui.QScrollArea()
        scroll.setWidget(console)
        scroll.setAutoFillBackground(True)
        scroll.setWidgetResizable(True)
        vbox = QtGui.QVBoxLayout()
        vbox.addWidget(scroll)
        tab2.setLayout(vbox)

        # tab3 -
        self.viewEntry = QTableWidget(0, 12)
        self.viewEntry.setHorizontalHeaderLabels(
                [u'期数', u'时间', u'冠军', u'亚军', u'第三名', u'第四名', u'第五名', u'第六名', u'第七名', u'第八名', u'第九名', u'第十名'])
        self.viewEntry.horizontalHeader().setStretchLastSection(True)
        self.viewEntry.horizontalHeader().setResizeMode(QtGui.QHeaderView.Stretch)

        vbox3 = QtGui.QVBoxLayout()
        vbox3.addWidget(self.viewEntry)
        tab3.setLayout(vbox3)
        tabs.addTab(tab2, u"控制台")
        tabs.addTab(tab3, u"开奖结果")

        tabs.resize(1500, 800)
        self.resize(1500, 800)
        self.tabs = tabs
        self.tab2 = tab2
        self.tab3 = tab3
        self.scroll = scroll
        # 禁止最大化
        self.setWindowFlags(QtCore.Qt.WindowMinimizeButtonHint)

        from myutil.Overlay import Overlay
        self.setCentralWidget(self.tabs)
        self.overlay = Overlay(self.centralWidget())
        self.overlay.hide()

        self.show()

    @pyqtSlot(str)
    def mySetWindowTitle(self, title):
        self.setWindowTitle(title)

    @pyqtSlot(str, list)
    def completeHistoryResultData(self, timesnow, open_balls):
        logging.info(u"【主窗口-历史数据展板-填充之】")
        for i in range(len(open_balls)):
            newItem = QTableWidgetItem(str(open_balls[i]))
            self.viewEntry.setItem(0, 2 + i, newItem)
        logging.info(u"【主窗口-历史数据展板-填充完毕】")

    @pyqtSlot(str, list)
    def appendHistoryResultData(self, timesnow, open_balls):
        logging.info(u"【主窗口-历史数据展板-追加】")
        time_str = MyTool.getCurrentTimeStr()
        self.viewEntry.insertRow(0)
        # 期数
        newItem = QTableWidgetItem(str(int(timesnow) - 1))
        self.viewEntry.setItem(0, 0, newItem)
        # 时间
        newItem = QTableWidgetItem(time_str)
        self.viewEntry.setItem(0, 1, newItem)

        for i in range(len(open_balls)):
            newItem = QTableWidgetItem(str(open_balls[i]))
            self.viewEntry.setItem(0, 2 + i, newItem)
        logging.info(u"【主窗口-历史数据展板-追加完毕】")

    @pyqtSlot(dict)
    def updateHistoryResultData(self, data_dict):
        logging.info(u"【主窗口-历史数据展板-大更新】################START HistoryResultData################")
        if data_dict['state'] != 1:
            logging.error(u"【主窗口-历史数据展板-大更新】数据貌似不大对，结果如下：")
            logging.error(data_dict)
        else:
            # 先清空...
            self.viewEntry.clearContents()

            for period in data_dict['data']['result']:
                # 添加一行
                row = self.viewEntry.rowCount()
                self.viewEntry.insertRow(row)

                # 期数
                newItem = QTableWidgetItem(period[0])
                self.viewEntry.setItem(row, 0, newItem)

                # 时间
                newItem = QTableWidgetItem(str(period[1]))
                self.viewEntry.setItem(row, 1, newItem)

                for i in range(10):
                    newItem = QTableWidgetItem(str(period[2 + i]))
                    self.viewEntry.setItem(row, 2 + i, newItem)
        logging.info(u"【主窗口-历史数据展板-大更新】################END HistoryResultData################")

    def closeEvent(self, event):
        reply = QtGui.QMessageBox.question(self, u'退出', u"您确定离开吗？", QtGui.QMessageBox.Yes, QtGui.QMessageBox.No)
        if reply == QtGui.QMessageBox.Yes:
            # 关闭http连接...
            from common.common import req_session
            req_session.close()

            event.accept()

        else:
            event.ignore()

    def resizeEvent(self, event):
        self.overlay.resize(event.size())
        event.accept()
