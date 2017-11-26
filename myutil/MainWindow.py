# #coding:utf-8
import logging

from PyQt4 import QtCore, QtGui
from PyQt4.QtCore import *
from PyQt4.QtWebKit import *

from MyBrowser import MyBrowser
from MyConsole import MyConsole


class MainWindow(QtGui.QMainWindow):
    def __init__(self, parent=None):
        logging.info(u'创建主窗口...')

        QtGui.QMainWindow.__init__(self, parent)

        tabs = QtGui.QTabWidget(self)

        tab1 = QtGui.QWidget()
        tab2 = QtGui.QWidget()
        tab3 = QtGui.QWidget()

        web = MyBrowser()
        console = MyConsole(parent=self, browser=web)

        web.setConsole(console)

        # tab1 - web
        web.settings().setAttribute(QWebSettings.PluginsEnabled, True)
        vBoxlayout = QtGui.QVBoxLayout()
        vBoxlayout.addWidget(web)
        tab1.setLayout(vBoxlayout)

        # tab2 - console
        console.setMinimumSize(1500, 600)
        scroll = QtGui.QScrollArea()
        scroll.setWidget(console)
        scroll.setAutoFillBackground(True)
        scroll.setWidgetResizable(True)
        vbox = QtGui.QVBoxLayout()
        vbox.addWidget(scroll)
        tab2.setLayout(vbox)

        # tab3 -
        self.text = QtGui.QTextEdit()
        vbox3 = QtGui.QVBoxLayout()
        vbox3.addWidget(self.text)
        tab3.setLayout(vbox3)
        tabs.addTab(tab1, u"浏览器")
        tabs.addTab(tab2, u"控制台")
        tabs.addTab(tab3, u"数据展示")

        tabs.resize(1200, 650)
        self.resize(1200, 650)
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

    @pyqtSlot(dict)
    def updatePreBetData(self, data_dict):
        logging.info("################START Update PreBetData################")
        self.text.clear()
        import json
        self.text.append(json.dumps(data_dict))
        logging.info("################END Update PreBetData################")

    def closeEvent(self, event):
        reply = QtGui.QMessageBox.question(self, u'退出', u"您确定离开吗？", QtGui.QMessageBox.Yes, QtGui.QMessageBox.No)
        if reply == QtGui.QMessageBox.Yes:
            event.accept()
        else:
            event.ignore()

    def resizeEvent(self, event):
        self.overlay.resize(event.size())
        event.accept()