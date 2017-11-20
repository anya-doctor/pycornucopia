# #coding:utf-8
import logging
import os
import sqlite3
import time

from PyQt4 import QtCore, QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from bs4 import BeautifulSoup

import MySettings
from algorithm.MyDataGetter import MyDataGetter


class MyConsole(QWidget):
    def __init__(self, bro, parent, mytab=None):
        """
        投注的倍数 self.balls_bet_amount

        :param bro:
        :param parent:
        :return:
        """
        QWidget.__init__(self)
        self.parent = parent
        self.mytab = mytab

        self.browser = bro
        self.username = ''
        self.password = ''
        self.row_index = 0  # 当前到第几行了
        self.is_bet_success1 = False
        self.is_bet_success2 = False
        self.balls_bet_flag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  # [0,0,0,0,0]
        self.all_ball_needToBetList = []  # [[1,2,3,4],[3,4,5,6],[2,1,3,4],[2,3,4,1],[7,8,9,0]]
        self.balls_bet_amount = []  # ['1','2','4','8']
        self.balls_elem_dic = {
            '1_1': 6, '2_1': 22, '3_1': 38, '4_1': 54, '5_1': 70,
            '1_2': 7, '2_2': 23, '3_2': 39, '4_2': 55, '5_2': 71,
            '1_3': 8, '2_3': 24, '3_3': 40, '4_3': 56, '5_3': 72,
            '1_4': 9, '2_4': 25, '3_4': 41, '4_4': 57, '5_4': 73,
            '1_5': 10, '2_5': 26, '3_5': 42, '4_5': 58, '5_5': 74,
            '1_6': 11, '2_6': 27, '3_6': 43, '4_6': 59, '5_6': 75,
            '1_7': 12, '2_7': 28, '3_7': 44, '4_7': 60, '5_7': 76,
            '1_8': 13, '2_8': 29, '3_8': 45, '4_8': 61, '5_8': 77,
            '1_9': 14, '2_9': 30, '3_9': 46, '4_9': 62, '5_9': 78,
            '1_10': 15, '2_10': 31, '3_10': 47, '4_10': 63, '5_10': 79
        }

        self.balls_elem_dic2 = {
            '1_1': 4, '2_1': 18, '3_1': 32, '4_1': 46, '5_1': 60,
            '1_2': 5, '2_2': 19, '3_2': 33, '4_2': 47, '5_2': 61,
            '1_3': 6, '2_3': 20, '3_3': 34, '4_3': 48, '5_3': 62,
            '1_4': 7, '2_4': 21, '3_4': 35, '4_4': 49, '5_4': 63,
            '1_5': 8, '2_5': 22, '3_5': 36, '4_5': 50, '5_5': 64,
            '1_6': 9, '2_6': 23, '3_6': 37, '4_6': 51, '5_6': 65,
            '1_7': 10, '2_7': 24, '3_7': 38, '4_7': 52, '5_7': 66,
            '1_8': 11, '2_8': 25, '3_8': 39, '4_8': 53, '5_8': 67,
            '1_9': 12, '2_9': 26, '3_9': 40, '4_9': 54, '5_9': 68,
            '1_10': 13, '2_10': 27, '3_10': 41, '4_10': 55, '5_10': 69
        }

        self.balls_elem_dic3 = {
            '3': 0, '4': 1, '5': 2, '6': 3, '7': 4,
            '8': 5, '9': 6, '10': 7, '11': 8, '12': 9,
            '13': 10, '14': 11, '15': 12, '16': 13, '17': 14,
            '18': 15, '19': 16
        }

        self.goThread = None
        self.getPreBetDataThread = None
        self.loginThread = None
        self.curP = '-1'
        self.is_login = False
        self.lines = []
        self.lines_flag = 0  # 切换线路用的
        self.colorflag = 0
        self.c = QColor("darkgray")
        self.change_flag = [True, True, True, True, True]  # 冷热交替
        self.NumOfAmountInputs1 = 80
        self.NumOfAmountInputs2 = 70
        self.reslist = []

        self.betTimer = None
        self.getPreBetDatgaTimer = None
        self.loginTimer = None

        self.initUI()
        self.initConfig()

    # 初始化UI
    def initUI(self):
        self.gridlayout = QtGui.QGridLayout()
        for i in range(40):
            self.gridlayout.setColumnStretch(i, 1)
            self.gridlayout.setRowStretch(i, 1)

        self.refreshBtn = QtGui.QPushButton(u"刷新")
        self.refreshBtn.setFixedSize(40, 20)
        self.refreshBtn.setEnabled(True)
        self.connect(self.refreshBtn, QtCore.SIGNAL('clicked()'), self.onRefreshButton)
        self.gridlayout.addWidget(self.refreshBtn, 1, 4, 1, 2)

        # 为了美观
        lb1 = QLabel(u'账户')
        lb2 = QLabel(u'密码')
        self.userEntry = QLineEdit()
        self.passEntry = QLineEdit()
        self.passEntry.setEchoMode(QLineEdit.Password)
        self.loginBtn = QtGui.QPushButton(u"登录")
        self.connect(self.loginBtn, QtCore.SIGNAL('clicked()'), self.onLoginBtn)

        self.gridlayout.addWidget(lb1, 0, 0)
        self.gridlayout.addWidget(lb2, 1, 0)
        self.gridlayout.addWidget(self.userEntry, 0, 1, 1, 3)
        self.gridlayout.addWidget(self.passEntry, 1, 1, 1, 3)
        self.gridlayout.addWidget(self.loginBtn, 0, 4, 1, 2)

        lb3 = QLabel(u'倍投')
        self.betAmountEntry = QLineEdit()
        self.gridlayout.addWidget(lb3, 0, 6)
        self.gridlayout.addWidget(self.betAmountEntry, 0, 7, 1, 5)

        lb4 = QLabel(u'盈损')
        self.earnMoneyAtEntry = QLineEdit()
        self.lostMoneyAtEntry = QLineEdit()
        self.saveConfigBtn = QtGui.QPushButton(u"保存")
        self.connect(self.saveConfigBtn, QtCore.SIGNAL('clicked()'), self.onSaveConfigBtn)
        self.gridlayout.addWidget(lb4, 1, 6)
        self.gridlayout.addWidget(self.earnMoneyAtEntry, 1, 7, 1, 2)
        self.gridlayout.addWidget(self.lostMoneyAtEntry, 1, 9, 1, 3)
        self.gridlayout.addWidget(self.saveConfigBtn, 1, 26, 1, 2)

        lb6 = QLabel(u'程序命名')
        self.nameEntry = QLineEdit()
        self.registerBtn = QtGui.QPushButton(u"命名")
        self.registerBtn.setFixedSize(40, 20)
        self.connect(self.registerBtn, QtCore.SIGNAL('clicked()'), self.on_rename_btn)
        self.gridlayout.addWidget(lb6, 2, 0)
        self.gridlayout.addWidget(self.nameEntry, 2, 1, 1, 3)
        self.gridlayout.addWidget(self.registerBtn, 2, 4, 1, 2)

        lb7 = QLabel(u'舍N')
        self.first_n_Entry = QLineEdit()
        self.gridlayout.addWidget(lb7, 2, 6)
        self.gridlayout.addWidget(self.first_n_Entry, 2, 7)

        # 是否期期滚
        self.isQQG_combobox = QComboBox()
        self.isQQG_combobox.addItem(u'期期滚')
        self.isQQG_combobox.addItem(u'常规')
        self.gridlayout.addWidget(self.isQQG_combobox, 2, 8, 1, 2)

        # 是否赢追加还是输追加
        self.isLoseAdd_combobox = QComboBox()
        self.isLoseAdd_combobox.addItem(u'输追加')
        self.isLoseAdd_combobox.addItem(u'赢追加')
        self.gridlayout.addWidget(self.isLoseAdd_combobox, 2, 10, 1, 2)

        self.goBtn = QtGui.QPushButton(u"开始")
        self.connect(self.goBtn, QtCore.SIGNAL('clicked()'), self.on_start_btn)
        self.gridlayout.addWidget(self.goBtn, 2, 26, 1, 2)

        lb0 = QLabel(u'线路')
        self.linesEntry = QTextEdit()
        self.gridlayout.addWidget(lb0, 0, 12)
        self.gridlayout.addWidget(self.linesEntry, 0, 13, 3, 12)

        # 1
        self.ball1_1_Entry, self.ball2_1_Entry, self.ball3_1_Entry, self.ball4_1_Entry, self.ball5_1_Entry, \
        self.ball6_1_Entry, self.ball7_1_Entry, self.ball8_1_Entry, self.ball9_1_Entry, self.ball10_1_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 2
        self.ball1_2_Entry, self.ball2_2_Entry, self.ball3_2_Entry, self.ball4_2_Entry, self.ball5_2_Entry, \
        self.ball6_2_Entry, self.ball7_2_Entry, self.ball8_2_Entry, self.ball9_2_Entry, self.ball10_2_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 3
        self.ball1_3_Entry, self.ball2_3_Entry, self.ball3_3_Entry, self.ball4_3_Entry, self.ball5_3_Entry, \
        self.ball6_3_Entry, self.ball7_3_Entry, self.ball8_3_Entry, self.ball9_3_Entry, self.ball10_3_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 4
        self.ball1_4_Entry, self.ball2_4_Entry, self.ball3_4_Entry, self.ball4_4_Entry, self.ball5_4_Entry, \
        self.ball6_4_Entry, self.ball7_4_Entry, self.ball8_4_Entry, self.ball9_4_Entry, self.ball10_4_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 5
        self.ball1_5_Entry, self.ball2_5_Entry, self.ball3_5_Entry, self.ball4_5_Entry, self.ball5_5_Entry, \
        self.ball6_5_Entry, self.ball7_5_Entry, self.ball8_5_Entry, self.ball9_5_Entry, self.ball10_5_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 6
        self.ball1_6_Entry, self.ball2_6_Entry, self.ball3_6_Entry, self.ball4_6_Entry, self.ball5_6_Entry, \
        self.ball6_6_Entry, self.ball7_6_Entry, self.ball8_6_Entry, self.ball9_6_Entry, self.ball10_6_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 7
        self.ball1_7_Entry, self.ball2_7_Entry, self.ball3_7_Entry, self.ball4_7_Entry, self.ball5_7_Entry, \
        self.ball6_7_Entry, self.ball7_7_Entry, self.ball8_7_Entry, self.ball9_7_Entry, self.ball10_7_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 8
        self.ball1_8_Entry, self.ball2_8_Entry, self.ball3_8_Entry, self.ball4_8_Entry, self.ball5_8_Entry, \
        self.ball6_8_Entry, self.ball7_8_Entry, self.ball8_8_Entry, self.ball9_8_Entry, self.ball10_8_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 9
        self.ball1_9_Entry, self.ball2_9_Entry, self.ball3_9_Entry, self.ball4_9_Entry, self.ball5_9_Entry, \
        self.ball6_9_Entry, self.ball7_9_Entry, self.ball8_9_Entry, self.ball9_9_Entry, self.ball10_9_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 10
        self.ball1_10_Entry, self.ball2_10_Entry, self.ball3_10_Entry, self.ball4_10_Entry, self.ball5_10_Entry, \
        self.ball6_10_Entry, self.ball7_10_Entry, self.ball8_10_Entry, self.ball9_10_Entry, self.ball10_10_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()

        tmp_entrys = [
            [self.ball1_1_Entry, self.ball1_2_Entry, self.ball1_3_Entry, self.ball1_4_Entry, self.ball1_5_Entry, \
             self.ball1_6_Entry, self.ball1_7_Entry, self.ball1_8_Entry, self.ball1_9_Entry, self.ball1_10_Entry],
            [self.ball2_1_Entry, self.ball2_2_Entry, self.ball2_3_Entry, self.ball2_4_Entry, self.ball2_5_Entry, \
             self.ball2_6_Entry, self.ball2_7_Entry, self.ball2_8_Entry, self.ball2_9_Entry, self.ball2_10_Entry],
            [self.ball3_1_Entry, self.ball3_2_Entry, self.ball3_3_Entry, self.ball3_4_Entry, self.ball3_5_Entry, \
             self.ball3_6_Entry, self.ball3_7_Entry, self.ball3_8_Entry, self.ball3_9_Entry, self.ball3_10_Entry],
            [self.ball4_1_Entry, self.ball4_2_Entry, self.ball4_3_Entry, self.ball4_4_Entry, self.ball4_5_Entry, \
             self.ball4_6_Entry, self.ball4_7_Entry, self.ball4_8_Entry, self.ball4_9_Entry, self.ball4_10_Entry],
            [self.ball5_1_Entry, self.ball5_2_Entry, self.ball5_3_Entry, self.ball5_4_Entry, self.ball5_5_Entry, \
             self.ball5_6_Entry, self.ball5_7_Entry, self.ball5_8_Entry, self.ball5_9_Entry, self.ball5_10_Entry],
            [self.ball6_1_Entry, self.ball6_2_Entry, self.ball6_3_Entry, self.ball6_4_Entry, self.ball6_5_Entry, \
             self.ball6_6_Entry, self.ball6_7_Entry, self.ball6_8_Entry, self.ball6_9_Entry, self.ball6_10_Entry],
            [self.ball7_1_Entry, self.ball7_2_Entry, self.ball7_3_Entry, self.ball7_4_Entry, self.ball7_5_Entry, \
             self.ball7_6_Entry, self.ball7_7_Entry, self.ball7_8_Entry, self.ball7_9_Entry, self.ball7_10_Entry],
            [self.ball8_1_Entry, self.ball8_2_Entry, self.ball8_3_Entry, self.ball8_4_Entry, self.ball8_5_Entry, \
             self.ball8_6_Entry, self.ball8_7_Entry, self.ball8_8_Entry, self.ball8_9_Entry, self.ball8_10_Entry],
            [self.ball9_1_Entry, self.ball9_2_Entry, self.ball9_3_Entry, self.ball9_4_Entry, self.ball9_5_Entry, \
             self.ball9_6_Entry, self.ball9_7_Entry, self.ball9_8_Entry, self.ball9_9_Entry, self.ball9_10_Entry],
            [self.ball10_1_Entry, self.ball10_2_Entry, self.ball10_3_Entry, self.ball10_4_Entry, self.ball10_5_Entry, \
             self.ball10_6_Entry, self.ball10_7_Entry, self.ball10_8_Entry, self.ball10_9_Entry, self.ball10_10_Entry]]

        for i in range(len(tmp_entrys)):
            for j in range(len(tmp_entrys[i])):
                label = QLabel(u'%d-%d' % (i + 1, j + 1))
                self.gridlayout.addWidget(label, 4 + j, 0 + 4 * i)
                self.gridlayout.addWidget(tmp_entrys[i][j], 4 + j, 1 + 4 * i, 1, 3)

        self.viewEntry = QTableWidget(0, 7)
        self.gridlayout.addWidget(self.viewEntry, 14, 0, 20, 28)
        self.viewEntry.setHorizontalHeaderLabels([u'期数', u'位置', u'投注号码', u'倍投', u'金额', u'下注否', u'中否'])
        self.viewEntry.horizontalHeader().setStretchLastSection(True)
        self.viewEntry.horizontalHeader().setResizeMode(QtGui.QHeaderView.Stretch)

        self.setLayout(self.gridlayout)

    # 初始化配置
    def initConfig(self):
        if not os.path.exists('./config/cqssc.db'):
            self.create_db()
            return

        cqssc_db = sqlite3.connect(MySettings.db_file_path)
        cursor = cqssc_db.execute("SELECT * FROM config;")

        for row in cursor:
            lines = row[0].replace(' ', '\n')
            urls = row[0].split(' ')
            if len(urls) > 0:
                self.browser.setUrl(QUrl(urls[0]))
            self.linesEntry.setText(lines)
            self.lines = row[0].split(' ')
            self.userEntry.setText(row[1])
            self.passEntry.setText(row[2])
            self.username = self.userEntry.text()
            self.password = self.passEntry.text()

            self.betAmountEntry.setText(row[3])
            # 载入各球投注倍数
            bets = row[3]
            if '-' in bets:
                self.balls_bet_amount = bets.split('-')
            else:
                self.balls_bet_amount = [bets]
            # 载入止盈止损
            self.earnMoneyAtEntry.setText(row[4])
            self.lostMoneyAtEntry.setText(row[5])
            if row[4] == '':
                self.earn_money_at = '9999999999'
            else:
                self.earn_money_at = row[4]
            if row[5] == '':
                self.lost_money_at = '-9999999999'
            else:
                self.lost_money_at = row[5]

            # 载入名字
            self.nameEntry.setText(row[6])
            QMetaObject.invokeMethod(self.parent, "mySetWindowTitle", Qt.QueuedConnection, Q_ARG(str, row[6]))

            # 载入前N期
            self.first_n_Entry.setText(row[7])
            self.first_n = int(row[7])

            # 期期滚
            self.isQQG = row[110]
            self.isQQG_combobox.setCurrentIndex(int(self.isQQG))

            # 输追加
            self.isLoseAdd = row[111]
            self.isLoseAdd_combobox.setCurrentIndex(int(self.isLoseAdd))

            # ball 1
            self.ball1_1_Entry.setText(row[10]);
            self.ball1_2_Entry.setText(row[11]);
            self.ball1_3_Entry.setText(row[12])
            self.ball1_4_Entry.setText(row[13]);
            self.ball1_5_Entry.setText(row[14]);
            self.ball1_6_Entry.setText(row[15])
            self.ball1_7_Entry.setText(row[16]);
            self.ball1_8_Entry.setText(row[17]);
            self.ball1_9_Entry.setText(row[18])
            self.ball1_10_Entry.setText(row[19])

            # ball 2
            self.ball2_1_Entry.setText(row[20]);
            self.ball2_2_Entry.setText(row[21]);
            self.ball2_3_Entry.setText(row[22])
            self.ball2_4_Entry.setText(row[23]);
            self.ball2_5_Entry.setText(row[24]);
            self.ball2_6_Entry.setText(row[25])
            self.ball2_7_Entry.setText(row[26]);
            self.ball2_8_Entry.setText(row[27]);
            self.ball2_9_Entry.setText(row[28])
            self.ball2_10_Entry.setText(row[29])

            # ball 3
            self.ball3_1_Entry.setText(row[30]);
            self.ball3_2_Entry.setText(row[31]);
            self.ball3_3_Entry.setText(row[32])
            self.ball3_4_Entry.setText(row[33]);
            self.ball3_5_Entry.setText(row[34]);
            self.ball3_6_Entry.setText(row[35])
            self.ball3_7_Entry.setText(row[36]);
            self.ball3_8_Entry.setText(row[37]);
            self.ball3_9_Entry.setText(row[38])
            self.ball3_10_Entry.setText(row[39])

            # ball 4
            self.ball4_1_Entry.setText(row[40]);
            self.ball4_2_Entry.setText(row[41]);
            self.ball4_3_Entry.setText(row[42])
            self.ball4_4_Entry.setText(row[43]);
            self.ball4_5_Entry.setText(row[44]);
            self.ball4_6_Entry.setText(row[45])
            self.ball4_7_Entry.setText(row[46]);
            self.ball4_8_Entry.setText(row[47]);
            self.ball4_9_Entry.setText(row[48])
            self.ball4_10_Entry.setText(row[49])

            # ball 5
            self.ball5_1_Entry.setText(row[50]);
            self.ball5_2_Entry.setText(row[51]);
            self.ball5_3_Entry.setText(row[52])
            self.ball5_4_Entry.setText(row[53]);
            self.ball5_5_Entry.setText(row[54]);
            self.ball5_6_Entry.setText(row[55])
            self.ball5_7_Entry.setText(row[56]);
            self.ball5_8_Entry.setText(row[57]);
            self.ball5_9_Entry.setText(row[58])
            self.ball5_10_Entry.setText(row[59])

            # ball 6
            self.ball6_1_Entry.setText(row[60]);
            self.ball6_2_Entry.setText(row[61]);
            self.ball6_3_Entry.setText(row[62])
            self.ball6_4_Entry.setText(row[63]);
            self.ball6_5_Entry.setText(row[64]);
            self.ball6_6_Entry.setText(row[65])
            self.ball6_7_Entry.setText(row[66]);
            self.ball6_8_Entry.setText(row[67]);
            self.ball6_9_Entry.setText(row[68])
            self.ball6_10_Entry.setText(row[69])

            # ball 7
            self.ball7_1_Entry.setText(row[70]);
            self.ball7_2_Entry.setText(row[71]);
            self.ball7_3_Entry.setText(row[72])
            self.ball7_4_Entry.setText(row[73]);
            self.ball7_5_Entry.setText(row[74]);
            self.ball7_6_Entry.setText(row[75])
            self.ball7_7_Entry.setText(row[76]);
            self.ball7_8_Entry.setText(row[77]);
            self.ball7_9_Entry.setText(row[78])
            self.ball7_10_Entry.setText(row[79])

            # ball 8
            self.ball8_1_Entry.setText(row[80]);
            self.ball8_2_Entry.setText(row[81]);
            self.ball8_3_Entry.setText(row[82])
            self.ball8_4_Entry.setText(row[83]);
            self.ball8_5_Entry.setText(row[84]);
            self.ball8_6_Entry.setText(row[85])
            self.ball8_7_Entry.setText(row[86]);
            self.ball8_8_Entry.setText(row[87]);
            self.ball8_9_Entry.setText(row[88])
            self.ball8_10_Entry.setText(row[89])

            # ball 9
            self.ball9_1_Entry.setText(row[90]);
            self.ball9_2_Entry.setText(row[91]);
            self.ball9_3_Entry.setText(row[92])
            self.ball9_4_Entry.setText(row[93]);
            self.ball9_5_Entry.setText(row[94]);
            self.ball9_6_Entry.setText(row[95])
            self.ball9_7_Entry.setText(row[96]);
            self.ball9_8_Entry.setText(row[97]);
            self.ball9_9_Entry.setText(row[98])
            self.ball9_10_Entry.setText(row[99])

            # ball 10
            self.ball10_1_Entry.setText(row[100]);
            self.ball10_2_Entry.setText(row[101]);
            self.ball10_3_Entry.setText(row[102])
            self.ball10_4_Entry.setText(row[103]);
            self.ball10_5_Entry.setText(row[104]);
            self.ball10_6_Entry.setText(row[105])
            self.ball10_7_Entry.setText(row[106]);
            self.ball10_8_Entry.setText(row[107]);
            self.ball10_9_Entry.setText(row[108])
            self.ball10_10_Entry.setText(row[109])

            self.ball1 = [row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18], row[19]]
            self.ball2 = [row[20], row[21], row[22], row[23], row[24], row[25], row[26], row[27], row[28], row[29]]
            self.ball3 = [row[30], row[31], row[32], row[33], row[34], row[35], row[36], row[37], row[38], row[39]]
            self.ball4 = [row[40], row[41], row[42], row[43], row[44], row[45], row[46], row[47], row[48], row[49]]
            self.ball5 = [row[50], row[51], row[52], row[53], row[54], row[55], row[56], row[57], row[58], row[59]]
            self.ball6 = [row[60], row[61], row[62], row[63], row[64], row[65], row[66], row[67], row[68], row[69]]
            self.ball7 = [row[70], row[71], row[72], row[73], row[74], row[75], row[76], row[77], row[78], row[79]]
            self.ball8 = [row[80], row[81], row[82], row[83], row[84], row[85], row[86], row[87], row[88], row[89]]
            self.ball9 = [row[90], row[91], row[92], row[93], row[94], row[95], row[96], row[97], row[98], row[99]]
            self.ball10 = [row[100], row[101], row[102], row[103], row[104], row[105], row[106], row[107], row[108],
                           row[109]]
            self.balls = [self.ball1, self.ball2, self.ball3, self.ball4, self.ball5, \
                          self.ball6, self.ball7, self.ball8, self.ball9, self.ball10]

        cursor.close()
        cqssc_db.commit()
        cqssc_db.close()

    # 创建数据库文件
    def create_db(self):
        """
        创建一个db
        :return:
        """
        mydb = sqlite3.connect(MySettings.db_file_path)
        sql = "create table config(lines text NULL,username text NULL,password text NULL,bet_amount text NULL, earn_money_at text NULL,lost_money_at text NULL,register_code text NULL, first_n text NULL,miaomiao text NULL, create_date date NULL,\
                ball1_1 text NULL,ball1_2 text NULL,ball1_3 text NULL,ball1_4 text NULL,ball1_5 text NULL,\
                ball1_6 text NULL,ball1_7 text NULL,ball1_8 text NULL,ball1_9 text NULL,ball1_10 text NULL,\
                ball2_1 text NULL,ball2_2 text NULL,ball2_3 text NULL,ball2_4 text NULL,ball2_5 text NULL,\
                ball2_6 text NULL,ball2_7 text NULL,ball2_8 text NULL,ball2_9 text NULL,ball2_10 text NULL,\
                ball3_1 text NULL,ball3_2 text NULL,ball3_3 text NULL,ball3_4 text NULL,ball3_5 text NULL,\
                ball3_6 text NULL,ball3_7 text NULL,ball3_8 text NULL,ball3_9 text NULL,ball3_10 text NULL,\
                ball4_1 text NULL,ball4_2 text NULL,ball4_3 text NULL,ball4_4 text NULL,ball4_5 text NULL,\
                ball4_6 text NULL,ball4_7 text NULL,ball4_8 text NULL,ball4_9 text NULL,ball4_10 text NULL,\
                ball5_1 text NULL,ball5_2 text NULL,ball5_3 text NULL,ball5_4 text NULL,ball5_5 text NULL,\
                ball5_6 text NULL,ball5_7 text NULL,ball5_8 text NULL,ball5_9 text NULL,ball5_10 text NULL,\
                ball6_1 text NULL,ball6_2 text NULL,ball6_3 text NULL,ball6_4 text NULL,ball6_5 text NULL,\
                ball6_6 text NULL,ball6_7 text NULL,ball6_8 text NULL,ball6_9 text NULL,ball6_10 text NULL,\
                ball7_1 text NULL,ball7_2 text NULL,ball7_3 text NULL,ball7_4 text NULL,ball7_5 text NULL,\
                ball7_6 text NULL,ball7_7 text NULL,ball7_8 text NULL,ball7_9 text NULL,ball7_10 text NULL,\
                ball8_1 text NULL,ball8_2 text NULL,ball8_3 text NULL,ball8_4 text NULL,ball8_5 text NULL,\
                ball8_6 text NULL,ball8_7 text NULL,ball8_8 text NULL,ball8_9 text NULL,ball8_10 text NULL,\
                ball9_1 text NULL,ball9_2 text NULL,ball9_3 text NULL,ball9_4 text NULL,ball9_5 text NULL,\
                ball9_6 text NULL,ball9_7 text NULL,ball9_8 text NULL,ball9_9 text NULL,ball9_10 text NULL,\
                ball10_1 text NULL,ball10_2 text NULL,ball10_3 text NULL,ball10_4 text NULL,ball10_5 text NULL,\
                ball10_6 text NULL,ball10_7 text NULL,ball10_8 text NULL,ball10_9 text NULL,ball10_10 text NULL\
                ,isQQG,isLoseAdd);"
        mydb.execute(sql)
        mydb.commit()

        sql = "insert into config(lines,username,password,bet_amount,earn_money_at,lost_money_at,register_code,first_n,miaomiao,create_date,\
                ball1_1,ball1_2,ball1_3,ball1_4,ball1_5,ball1_6,ball1_7,ball1_8,ball1_9,ball1_10,\
                ball2_1,ball2_2,ball2_3,ball2_4,ball2_5,ball2_6,ball2_7,ball2_8,ball2_9,ball2_10,\
                ball3_1,ball3_2,ball3_3,ball3_4,ball3_5,ball3_6,ball3_7,ball3_8,ball3_9,ball3_10,\
                ball4_1,ball4_2,ball4_3,ball4_4,ball4_5,ball4_6,ball4_7,ball4_8,ball4_9,ball4_10,\
                ball5_1,ball5_2,ball5_3,ball5_4,ball5_5,ball5_6,ball5_7,ball5_8,ball5_9,ball5_10,\
                ball6_1,ball6_2,ball6_3,ball6_4,ball6_5,ball6_6,ball6_7,ball6_8,ball6_9,ball6_10,\
                ball7_1,ball7_2,ball7_3,ball7_4,ball7_5,ball7_6,ball7_7,ball7_8,ball7_9,ball7_10,\
                ball8_1,ball8_2,ball8_3,ball8_4,ball8_5,ball8_6,ball8_7,ball8_8,ball8_9,ball8_10,\
                ball9_1,ball9_2,ball9_3,ball9_4,ball9_5,ball9_6,ball9_7,ball9_8,ball9_9,ball9_10,\
                ball10_1,ball10_2,ball10_3,ball10_4,ball10_5,ball10_6,ball10_7,ball10_8,ball10_9,ball10_10\
                ,isQQG,isLoseAdd)"
        sql += " values('','','','','','','','','hehehe',date(),\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','','1','1');"
        mydb.execute(sql)
        mydb.commit()
        mydb.close()

    # 响应刷新按钮
    def onRefreshButton(self):
        QMetaObject.invokeMethod(self.browser, "refresh", Qt.QueuedConnection, Q_ARG(str, self.lines[self.lines_flag]))

    # 响应开始按钮
    def on_start_btn(self):
        if self.goBtn.text() == u'开始':
            self.goTimer = QTimer()
            self.goTimer.timeout.connect(self.do_start)
            self.goTimer.start(1000)
            self.goBtn.setText(u'停止')
        else:
            if self.goTimer != None:
                self.goTimer.stop()
            if self.betTimer != None:
                self.betTimer.stop()
            self.curP = '-1'
            self.all_ball_needToBetList = []
            self.goBtn.setText(u'开始')
            QtGui.QMessageBox.about(self, u'请注意', u"已经停止，下注列表全部清空。")

    def do_start(self):
        self.cur_money = int(self.preBetDataDic['data']['win'])
        self.timesnow = int(self.preBetDataDic['data']['betnotice']['timesnow'])
        self.timeclose = int(self.preBetDataDic['data']['betnotice']['timeclose'])
        self.timeopen = int(self.preBetDataDic['data']['betnotice']['timeopen'])
        logging.info(u"当前金额=%s" % self.cur_money)
        logging.info(u"当前期数=%s" % self.timesnow)
        logging.info(u"当前剩余时间=%s" % self.timeclose)
        logging.info(u"下局开始时间=%s" % self.timeopen)

        # 判断止损条件
        if not (int(self.lost_money_at) < self.cur_money < int(self.earn_money_at)):
            self.goTimer.stop()
            logging.info(u"已停止达到赢损条件。")
            QtGui.QMessageBox.about(self, u'已停止', u"达到赢损条件。")

        # 杀掉老的进程
        if self.goThread and self.goThread.isRunning():
            logging.info(u"老的goThread还在，杀死它...")
            self.goThread.quit()
            self.goThread.wait()

        # 至少留5秒的时候来
        if self.timeclose < 5:
            logging.info(u"下注时间来不及了...")
            self.goTimer.setInterval(self.timeopen * 1000)

        # 一旦开始了，就开始一次就行了
        self.goThread = MyDataGetter(self, self.browser, self.curP, self.balls_bet_flag,
                                     self.balls_bet_amount, self.all_ball_needToBetList, self.first_n,
                                     self.change_flag, self.is_bet_success1, self.is_bet_success2,
                                     self.reslist)
        self.goThread.start()
        self.goTimer.stop()

    def do_start2(self):
        limit_seconds = MySettings.allow_bet_time

        timeclose = self.getTimeclose()

        # 判断是否封盘
        if 0 < timeclose:
            money = self.get_cur_money()
            if money != '#':
                # 判断止盈止损
                if int(self.lost_money_at) < int(money) < int(self.earn_money_at):
                    if self.goThread:
                        if self.goThread.isRunning():
                            logging.info(u"老的goThread还在，杀死它...")
                            self.goThread.quit()
                            self.goThread.wait()
                    self.goThread = MyDataGetter(self, self.browser, self.curP, self.balls_bet_flag,
                                                 self.balls_bet_amount, self.all_ball_needToBetList, self.first_n,
                                                 self.change_flag, self.is_bet_success1, self.is_bet_success2,
                                                 self.reslist)
                    self.goThread.start()
                    self.goTimer.stop()
                else:
                    self.goTimer.stop()
                    QtGui.QMessageBox.about(self, u'已停止', u"达到赢损条件。")
        else:
            logging.info(u"等待解封时间...，间隔时间=%ss" % (MySettings.go_interval_time / 1000))
            self.goTimer.setInterval(MySettings.go_interval_time)

    # 响应保存按钮
    def onSaveConfigBtn(self):
        try:
            lines = self.linesEntry.toPlainText()
            lines = lines.replace('\n', ' ')
            lines_list = []
            for i in lines.split(' '):
                lines_list.append(str(i))
            lines = ' '.join(lines_list)

            username = self.userEntry.text()
            password = self.passEntry.text()
            betAmount = self.betAmountEntry.text()
            earn_money_at = self.earnMoneyAtEntry.text()
            lost_money_at = self.lostMoneyAtEntry.text()
            register_code = self.nameEntry.text()
            first_n = self.first_n_Entry.text()
            isQQG = str(self.isQQG_combobox.currentIndex())
            isLoseAdd = str(self.isLoseAdd_combobox.currentIndex())

            # 实时更改
            self.balls_bet_amount = betAmount.split('-')
            self.first_n = int(first_n)
            self.earn_money_at = earn_money_at
            self.lost_money_at = lost_money_at
            self.username = username
            self.password = password
            self.lines = lines.split(' ')
            self.isQQG = isQQG
            self.isLoseAdd = isLoseAdd
            if self.isQQG == '1':
                QtGui.QMessageBox.about(self, u'请注意', u"设置常规后，未赌完的期期滚会赌完为止。")
            elif self.isQQG == '0':
                QtGui.QMessageBox.about(self, u'请注意', u"设置期期滚后，常规下注转成期期滚。")
                for i in self.all_ball_needToBetList:
                    i[3] = 0

            if not os.path.exists('./config/cqssc.db'):
                QtGui.QMessageBox.about(self, u'错误', u"数据库文件不存在...请重新打开软件.")
                logging.info(u"数据库文件不存在...请重新打开软件.")
                return

            cqssc_db = sqlite3.connect(MySettings.db_file_path)
            sql = u"update config set lines = '" + lines + "',username = '" + username + "',password = '" + password + "',bet_amount = '" + betAmount + "' ,earn_money_at = '" + earn_money_at + "', lost_money_at = '" + lost_money_at + "',register_code='" + register_code + "',first_n = '" + first_n + "',\
                ball1_1='" + self.ball1_1_Entry.text() + "',ball1_2='" + self.ball1_2_Entry.text() + "',ball1_3='" + self.ball1_3_Entry.text() + "',ball1_4='" + self.ball1_4_Entry.text() + "',ball1_5='" + self.ball1_5_Entry.text() + "',\
                ball1_6='" + self.ball1_6_Entry.text() + "',ball1_7='" + self.ball1_7_Entry.text() + "',ball1_8='" + self.ball1_8_Entry.text() + "',ball1_9='" + self.ball1_9_Entry.text() + "',ball1_10='" + self.ball1_10_Entry.text() + "',\
                ball2_1='" + self.ball2_1_Entry.text() + "',ball2_2='" + self.ball2_2_Entry.text() + "',ball2_3='" + self.ball2_3_Entry.text() + "',ball2_4='" + self.ball2_4_Entry.text() + "',ball2_5='" + self.ball2_5_Entry.text() + "',\
                ball2_6='" + self.ball2_6_Entry.text() + "',ball2_7='" + self.ball2_7_Entry.text() + "',ball2_8='" + self.ball2_8_Entry.text() + "',ball2_9='" + self.ball2_9_Entry.text() + "',ball2_10='" + self.ball2_10_Entry.text() + "',\
                ball3_1='" + self.ball3_1_Entry.text() + "',ball3_2='" + self.ball3_2_Entry.text() + "',ball3_3='" + self.ball3_3_Entry.text() + "',ball3_4='" + self.ball3_4_Entry.text() + "',ball3_5='" + self.ball3_5_Entry.text() + "',\
                ball3_6='" + self.ball3_6_Entry.text() + "',ball3_7='" + self.ball3_7_Entry.text() + "',ball3_8='" + self.ball3_8_Entry.text() + "',ball3_9='" + self.ball3_9_Entry.text() + "',ball3_10='" + self.ball3_10_Entry.text() + "',\
                ball4_1='" + self.ball4_1_Entry.text() + "',ball4_2='" + self.ball4_2_Entry.text() + "',ball4_3='" + self.ball4_3_Entry.text() + "',ball4_4='" + self.ball4_4_Entry.text() + "',ball4_5='" + self.ball4_5_Entry.text() + "',\
                ball4_6='" + self.ball4_6_Entry.text() + "',ball4_7='" + self.ball4_7_Entry.text() + "',ball4_8='" + self.ball4_8_Entry.text() + "',ball4_9='" + self.ball4_9_Entry.text() + "',ball4_10='" + self.ball4_10_Entry.text() + "',\
                ball5_1='" + self.ball5_1_Entry.text() + "',ball5_2='" + self.ball5_2_Entry.text() + "',ball5_3='" + self.ball5_3_Entry.text() + "',ball5_4='" + self.ball5_4_Entry.text() + "',ball5_5='" + self.ball5_5_Entry.text() + "',\
                ball5_6='" + self.ball5_6_Entry.text() + "',ball5_7='" + self.ball5_7_Entry.text() + "',ball5_8='" + self.ball5_8_Entry.text() + "',ball5_9='" + self.ball5_9_Entry.text() + "',ball5_10='" + self.ball5_10_Entry.text() + "',\
                ball6_1='" + self.ball6_1_Entry.text() + "',ball6_2='" + self.ball6_2_Entry.text() + "',ball6_3='" + self.ball6_3_Entry.text() + "',ball6_4='" + self.ball6_4_Entry.text() + "',ball6_5='" + self.ball6_5_Entry.text() + "',\
                ball6_6='" + self.ball6_6_Entry.text() + "',ball6_7='" + self.ball6_7_Entry.text() + "',ball6_8='" + self.ball6_8_Entry.text() + "',ball6_9='" + self.ball6_9_Entry.text() + "',ball6_10='" + self.ball6_10_Entry.text() + "',\
                ball7_1='" + self.ball7_1_Entry.text() + "',ball7_2='" + self.ball7_2_Entry.text() + "',ball7_3='" + self.ball7_3_Entry.text() + "',ball7_4='" + self.ball7_4_Entry.text() + "',ball7_5='" + self.ball7_5_Entry.text() + "',\
                ball7_6='" + self.ball7_6_Entry.text() + "',ball7_7='" + self.ball7_7_Entry.text() + "',ball7_8='" + self.ball7_8_Entry.text() + "',ball7_9='" + self.ball7_9_Entry.text() + "',ball7_10='" + self.ball7_10_Entry.text() + "',\
                ball8_1='" + self.ball8_1_Entry.text() + "',ball8_2='" + self.ball8_2_Entry.text() + "',ball8_3='" + self.ball8_3_Entry.text() + "',ball8_4='" + self.ball8_4_Entry.text() + "',ball8_5='" + self.ball8_5_Entry.text() + "',\
                ball8_6='" + self.ball8_6_Entry.text() + "',ball8_7='" + self.ball8_7_Entry.text() + "',ball8_8='" + self.ball8_8_Entry.text() + "',ball8_9='" + self.ball8_9_Entry.text() + "',ball8_10='" + self.ball8_10_Entry.text() + "',\
                ball9_1='" + self.ball9_1_Entry.text() + "',ball9_2='" + self.ball9_2_Entry.text() + "',ball9_3='" + self.ball9_3_Entry.text() + "',ball9_4='" + self.ball9_4_Entry.text() + "',ball9_5='" + self.ball9_5_Entry.text() + "',\
                ball9_6='" + self.ball9_6_Entry.text() + "',ball9_7='" + self.ball9_7_Entry.text() + "',ball9_8='" + self.ball9_8_Entry.text() + "',ball9_9='" + self.ball9_9_Entry.text() + "',ball9_10='" + self.ball9_10_Entry.text() + "',\
                ball10_1='" + self.ball10_1_Entry.text() + "',ball10_2='" + self.ball10_2_Entry.text() + "',ball10_3='" + self.ball10_3_Entry.text() + "',ball10_4='" + self.ball10_4_Entry.text() + "',ball10_5='" + self.ball10_5_Entry.text() + "',\
                ball10_6='" + self.ball10_6_Entry.text() + "',ball10_7='" + self.ball10_7_Entry.text() + "',ball10_8='" + self.ball10_8_Entry.text() + "',ball10_9='" + self.ball10_9_Entry.text() + "',ball10_10='" + self.ball10_10_Entry.text() + "',\
                isQQG = '" + self.isQQG + "',isLoseAdd = '" + self.isLoseAdd + "';"

            cqssc_db.execute(unicode(sql))
            cqssc_db.commit()
            cqssc_db.close()

            self.ball1 = [self.ball1_1_Entry.text(), self.ball1_2_Entry.text(), self.ball1_3_Entry.text(),
                          self.ball1_4_Entry.text(), self.ball1_5_Entry.text(), self.ball1_6_Entry.text(),
                          self.ball1_7_Entry.text(), self.ball1_8_Entry.text(), self.ball1_9_Entry.text(),
                          self.ball1_10_Entry.text()]
            self.ball2 = [self.ball2_1_Entry.text(), self.ball2_2_Entry.text(), self.ball2_3_Entry.text(),
                          self.ball2_4_Entry.text(), self.ball2_5_Entry.text(), self.ball2_6_Entry.text(),
                          self.ball2_7_Entry.text(), self.ball2_8_Entry.text(), self.ball2_9_Entry.text(),
                          self.ball2_10_Entry.text()]
            self.ball3 = [self.ball3_1_Entry.text(), self.ball3_2_Entry.text(), self.ball3_3_Entry.text(),
                          self.ball3_4_Entry.text(), self.ball3_5_Entry.text(), self.ball3_6_Entry.text(),
                          self.ball3_7_Entry.text(), self.ball3_8_Entry.text(), self.ball3_9_Entry.text(),
                          self.ball3_10_Entry.text()]
            self.ball4 = [self.ball4_1_Entry.text(), self.ball4_2_Entry.text(), self.ball4_3_Entry.text(),
                          self.ball4_4_Entry.text(), self.ball4_5_Entry.text(), self.ball4_6_Entry.text(),
                          self.ball4_7_Entry.text(), self.ball4_8_Entry.text(), self.ball4_9_Entry.text(),
                          self.ball4_10_Entry.text()]
            self.ball5 = [self.ball5_1_Entry.text(), self.ball5_2_Entry.text(), self.ball5_3_Entry.text(),
                          self.ball5_4_Entry.text(), self.ball5_5_Entry.text(), self.ball5_6_Entry.text(),
                          self.ball5_7_Entry.text(), self.ball5_8_Entry.text(), self.ball5_9_Entry.text(),
                          self.ball5_10_Entry.text()]
            self.ball6 = [self.ball6_1_Entry.text(), self.ball6_2_Entry.text(), self.ball6_3_Entry.text(),
                          self.ball6_4_Entry.text(), self.ball6_5_Entry.text(), self.ball6_6_Entry.text(),
                          self.ball6_7_Entry.text(), self.ball6_8_Entry.text(), self.ball6_9_Entry.text(),
                          self.ball6_10_Entry.text()]
            self.ball7 = [self.ball7_1_Entry.text(), self.ball7_2_Entry.text(), self.ball7_3_Entry.text(),
                          self.ball7_4_Entry.text(), self.ball7_5_Entry.text(), self.ball7_6_Entry.text(),
                          self.ball7_7_Entry.text(), self.ball7_8_Entry.text(), self.ball7_9_Entry.text(),
                          self.ball7_10_Entry.text()]
            self.ball8 = [self.ball8_1_Entry.text(), self.ball8_2_Entry.text(), self.ball8_3_Entry.text(),
                          self.ball8_4_Entry.text(), self.ball8_5_Entry.text(), self.ball8_6_Entry.text(),
                          self.ball8_7_Entry.text(), self.ball8_8_Entry.text(), self.ball8_9_Entry.text(),
                          self.ball8_10_Entry.text()]
            self.ball9 = [self.ball9_1_Entry.text(), self.ball9_2_Entry.text(), self.ball9_3_Entry.text(),
                          self.ball9_4_Entry.text(), self.ball9_5_Entry.text(), self.ball9_6_Entry.text(),
                          self.ball9_7_Entry.text(), self.ball9_8_Entry.text(), self.ball9_9_Entry.text(),
                          self.ball9_10_Entry.text()]
            self.ball10 = [self.ball10_1_Entry.text(), self.ball10_2_Entry.text(), self.ball10_3_Entry.text(),
                           self.ball10_4_Entry.text(), self.ball10_5_Entry.text(), self.ball10_6_Entry.text(),
                           self.ball10_7_Entry.text(), self.ball10_8_Entry.text(), self.ball10_9_Entry.text(),
                           self.ball10_10_Entry.text()]

            self.balls = [self.ball1, self.ball2, self.ball3, self.ball4, self.ball5, \
                          self.ball6, self.ball7, self.ball8, self.ball9, self.ball10]

            # 检查输入是否正确
            a = True
            msg = ''
            for i in range(len(self.balls)):
                for j in range(len(self.balls[i])):
                    for k in self.balls[i][j]:
                        if str(k) not in '0123456789-':
                            a = False
                            msg = '%d行 %d列' % (j + 1, i + 1)
                            break

            if not a:
                QtGui.QMessageBox.about(self, u'出了点问题', u"请检查%s输入框的数字之间是否为符号： , " % (msg))
            else:
                for i in self.balls:
                    for j in i:
                        if not j:
                            continue
                        m = j.split('-')
                        for k in m:
                            if int(k) > 10:
                                QtGui.QMessageBox.about(self, u'出了点问题', u"数字都是小于等于10吗？")
                                a = False
                                break

            if a:
                QtGui.QMessageBox.about(self, u'成功', u"保存成功")

            # 更新goThread的数据
            if self.goThread != None:
                QMetaObject.invokeMethod(self.goThread, "update_goThreadData", Qt.QueuedConnection,
                                         Q_ARG(int, self.first_n), Q_ARG(str, betAmount), Q_ARG(str, isQQG),
                                         Q_ARG(str, isLoseAdd))
                # QMetaObject.invokeMethod(self.goThread, "update_goThreadData2", Qt.QueuedConnection, Q_ARG(str, betAmount))
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 响应登录按钮
    def do_login(self):
        # 先杀死老的登录进程
        if self.loginThread:
            if self.loginThread.isRunning():
                logging.info(u"老的loginThread还在，杀死它...")
                self.loginThread.quit()
                self.loginThread.wait()

        # 先把这些老的进程弄死
        if self.getPreBetDataThread:
            # if self.getPreBetDataThread.isRunning():
            logging.info(u"登录中，老的getPreBetDataThread还在，杀死它...")
            self.getPreBetDataThread.quit()
            self.getPreBetDataThread.wait()

        # 如果获取数据的定时器还开着，那么就关掉
        if self.getPreBetDatgaTimer:
            logging.info(u"登录中，停掉【获取预下注数据定时器】...")
            self.getPreBetDatgaTimer.stop()

        from myutil.mythread.MyLoginThread import MyLoginThread
        self.loginThread = MyLoginThread(self.parent.overlay, self)
        self.loginThread.start()

        self.parent.overlay.show()

        # 在这里才能把时间间隔调整...
        logging.info(u"我把【登录定时器】的时间间隔调整到15秒...")
        self.loginTimer.setInterval(15 * 1000)

    @pyqtSlot()
    def onLoginBtn(self):
        try:
            logging.info(u"你按下了登录按钮！")

            # 不管如何，一开始登录要保证这个浮层是隐藏的...
            # QMetaObject.invokeMethod(self.parent.overlay, "myclose", Qt.QueuedConnection)

            # 先把老的登录进程杀死
            self.loginTimer = QTimer()
            self.loginTimer.timeout.connect(self.do_login)
            self.loginTimer.start()
            # from myutil.MyLoginThread import MyLoginThread
            # self.loginThread = MyLoginThread(self.parent.overlay, self)
            # self.loginThread.start()
            #
            # self.parent.overlay.show()
        except Exception, ex:
            logging.error(ex, exc_info=1)

    @pyqtSlot(dict)
    def startGetPreBetData(self, data_dic):
        """
        如果登录成功，则会回调这个函数，则开启获取预下注数据！
        :param data_dic:
        :return:
        """
        try:
            # 因为登录成功，所以先把那个自动登录进程杀死吧。
            logging.info(u"我停掉了【登录定时器】...")
            self.loginTimer.stop()

            self.loginSuccessData = data_dic
            self.getPreBetDatgaTimer = QTimer()
            self.getPreBetDatgaTimer.timeout.connect(self.do_getPreBetData)
            self.getPreBetDatgaTimer.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 开启获取预下注数据线程！
    def do_getPreBetData(self):
        try:
            if self.getPreBetDataThread:
                if self.getPreBetDataThread.isRunning():
                    logging.info(u"老的getPreBetDataThread还在，杀死它...")
                    self.getPreBetDataThread.quit()
                    self.getPreBetDataThread.wait()

            from myutil.mythread.MyGetPreBetDataThread import MyGetPreBetDataThread
            self.getPreBetDataThread = MyGetPreBetDataThread(self.parent,
                                                             self,
                                                             self.loginSuccessData['origin_url'],
                                                             self.loginSuccessData['pk_pre_bet_get_data_url'],
                                                             self.loginSuccessData['cookies_jar'],
                                                             self.loginSuccessData['headers']
                                                             )
            self.getPreBetDataThread.start()

            # 在这里才能把时间间隔调整...
            logging.info(u"我把【获取预下注数据定时器】的时间间隔调整到10秒...")
            self.getPreBetDatgaTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)

    @pyqtSlot(dict)
    def updatePreBetData(self, data_dict):
        try:
            logging.info("################CONSOLE START Update PreBetData################")
            self.preBetDataDic = data_dict
            logging.info("################CONSOLE END Update PreBetData################")

            timeclose = self.preBetDataDic['data']['betnotice']['timeclose']
            timeopen = self.preBetDataDic['data']['betnotice']['timeopen']

            logging.info("timeclose=%s" % timeclose)
            logging.info("timeopen=%s" % timeopen)

            # 如果在封盘期间，则把定时器弄长一点。。。
            if timeclose <= 0 and timeopen > 0:
                self.getPreBetDatgaTimer.setInterval(timeopen * 1000)
            else:
                self.getPreBetDatgaTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 重置获取数据定时器
    @pyqtSlot(int)
    def setGoTimer(self, seconds):
        self.goTimer.setInterval(seconds * 1000)

    # 更新Table数据-1
    @pyqtSlot(str, list, list, list)
    def loadTableData(self, curP, all_ball_needToBetList, bet_flag_list, change_flag):
        try:
            self.balls_bet_flag = bet_flag_list
            self.all_ball_needToBetList = all_ball_needToBetList
            self.curP = curP
            self.change_flag = change_flag

            self.colorflag += 1
            self.c = QColor("darkgray") if self.colorflag % 2 == 0 else QColor("gray")

            for i in range(len(self.all_ball_needToBetList)):
                # 添加一行
                row = self.viewEntry.rowCount()
                self.viewEntry.insertRow(row)

                newItem = QTableWidgetItem(str(int(curP) + 1))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 0, newItem)

                newItem = QTableWidgetItem(u'位置' + str(self.all_ball_needToBetList[i][0]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 1, newItem)

                newItem = QTableWidgetItem(' '.join(self.all_ball_needToBetList[i][1]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 2, newItem)

                # 当前倍投
                newItem = QTableWidgetItem(str(self.all_ball_needToBetList[i][2]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 3, newItem)

                # 当前金额
                newItem = QTableWidgetItem(str(self.balls_bet_amount[int(self.all_ball_needToBetList[i][2])]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 4, newItem)
            logging.info('load data1 finish')
        except Exception, ex:
            logging.error(ex, exc_info=1)
            for i in self.all_ball_needToBetList:
                logging.info(i)

    # 更新Table数据-2-判断中否
    @pyqtSlot(list)
    def loadTableData2(self, all_ball_needToBetList):
        try:
            b = all_ball_needToBetList
            row = self.viewEntry.rowCount()
            for k in range(len(b)):
                if (b[k][0] < 6 and not self.is_bet_success1) or (b[k][0] >= 6 and not self.is_bet_success2):
                    newItem = QTableWidgetItem(u'无效')
                    newItem.setBackgroundColor(self.c)
                    newItem.setTextColor(QColor("black"))
                elif self.isLoseAdd == '0':  # 输追加
                    if b[k][2] == 0:
                        newItem = QTableWidgetItem(u'中')
                        newItem.setBackgroundColor(self.c)
                        newItem.setTextColor(QColor(255, 0, 0, 127))
                    else:
                        newItem = QTableWidgetItem(u'不中')
                        newItem.setBackgroundColor(self.c)
                elif self.isLoseAdd == '1':  # 赢追加
                    if b[k][2] == 0:
                        newItem = QTableWidgetItem(u'不中')
                        newItem.setBackgroundColor(self.c)
                    else:
                        newItem = QTableWidgetItem(u'中')
                        newItem.setBackgroundColor(self.c)
                        newItem.setTextColor(QColor(255, 0, 0, 127))

                self.viewEntry.setItem(row - len(b) + k, 6, newItem)
            logging.info(u"load data2 finish 结算完毕。。。")
        except Exception, ex:
            logging.error(ex, exc_info=1)
            for i in self.all_ball_needToBetList:
                logging.info(i)

    # 获取当前时间
    def getTimeHour(self):
        times = time.localtime(time.time())
        hour = times[3]

    # 获取封盘时间
    def getTimeclose(self):
        html = self.browser.page().currentFrame().toHtml().toUtf8()
        content = unicode(html, 'utf-8', 'ignore')
        soup = BeautifulSoup(content, "lxml")
        tag = soup.find(id="timeclose")

        if tag != None:
            timeclose = tag.text
            if ":" in timeclose:
                a = timeclose.split(":")
                return int(a[0]) * 60 + int(a[1])
            else:
                return -1
        else:
            return -1

    def isOnBetPage(self, cnt):
        doc = self.browser.page().currentFrame().documentElement()
        amount_inputs = doc.findAll('input[class=amount-input]')
        if len(amount_inputs) == cnt:
            return True
        else:
            return False

    @pyqtSlot()
    def onBet(self):
        ##界面更新
        for i in range(len(self.all_ball_needToBetList)):
            row = self.viewEntry.rowCount()
            newItem = QTableWidgetItem(u'未')
            newItem.setBackgroundColor(self.c)
            self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + i), 5, newItem)
        ##开搞
        self.is_bet_success1 = True
        self.is_bet_success2 = True

        from myutil.mythread import MyBetThread
        self.bet_thread = MyBetThread.MyBetDataThread(self.loginSuccessData, self.all_ball_needToBetList,
                                                      self.balls_bet_amount, self.preBetDataDic)
        self.bet_thread.start()

    # 获取今天输赢
    def get_cur_money(self):
        doc = self.browser.page().currentFrame().documentElement()
        elem = doc.findFirst('span[id=win]')
        money = '#'
        if elem:
            money = elem.toPlainText()
            money = str(money).replace(',', '')
        return money

    def getCurBetMoney(self):
        doc = self.browser.page().currentFrame().documentElement()
        elem = doc.findFirst('td[id=total_amount]')
        total_amount = elem.toPlainText()
        try:
            return int(total_amount)
        except:
            return -1

    def getAmountInputs(self):
        doc = self.browser.page().currentFrame().documentElement()
        return doc.findAll('input[class=amount-input]')

    def getTheoryMoney(self):
        try:
            res = 0
            for i in self.all_ball_needToBetList:
                res += int(self.balls_bet_amount[int(i[2])]) * len(i[1])
            return res
        except Exception, ex:
            logging.error(ex, exc_info=1)
            for i in self.all_ball_needToBetList:
                logging.info(i)

    def getBet_1_TheoryMoney(self):
        try:
            res = 0
            for i in self.all_ball_needToBetList:
                if i[0] < 6:
                    res += int(self.balls_bet_amount[int(i[2])]) * len(i[1])
            return res
        except Exception, ex:
            logging.error(ex, exc_info=1)
            for i in self.all_ball_needToBetList:
                logging.info(i)

    # 响应下注
    @pyqtSlot()
    def bet(self):
        bet_result = self.browser.bet(self.all_ball_needToBetList, self.balls_bet_amount)
        if bet_result['data']['success']:
            self.is_bet_success1 = True
            self.is_bet_success2 = True
        else:
            logging.error(bet_result)

    # 响应下注
    @pyqtSlot()
    def bet2(self):
        try:
            self.betTimer.setInterval(15000)

            timeclose = self.getTimeclose()
            total_amount = self.getCurBetMoney()
            amount_inputs = self.getAmountInputs()

            money1 = self.getBet_1_TheoryMoney()
            money2 = self.getTheoryMoney()

            logging.info("money1 = %s, money2=%s" % (money1, money2))

            if not self.is_bet_success1 and timeclose >= 5:
                if money1 == 0:
                    cnt = 0
                    for i in self.all_ball_needToBetList:
                        row = self.viewEntry.rowCount()
                        newItem = QTableWidgetItem(u'已投注')
                        newItem.setBackgroundColor(self.c)
                        self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + cnt), 5, newItem)
                        cnt += 1
                    self.is_bet_success1 = True
                    self.betTimer.setInterval(1000)
                    return

                if total_amount <= 0 and len(amount_inputs) == self.NumOfAmountInputs1:
                    logging.info("total_amount <= 0 and len(amount_inputs) == self.NumOfAmountInputs1")
                    QMetaObject.invokeMethod(self.browser, "login_agree", Qt.QueuedConnection)  # 万一有公告
                    tmp_list = ['1_', '2_', '3_', '4_', '5_']
                    for i in self.all_ball_needToBetList:
                        if i[0] < 6:
                            for k in i[1]:
                                elem = amount_inputs[self.balls_elem_dic[tmp_list[i[0] - 1] + k]]
                                amount = self.balls_bet_amount[i[2]]
                                if int(amount) > 0:
                                    elem.evaluateJavaScript(
                                            "var c = 0; if(this.value.length==0){c = 0+parseInt('" + amount + "');}else{c = parseInt(this.value)+parseInt('" + amount + "');}this.value = c.toString();")
                    QMetaObject.invokeMethod(self.browser, "submit", Qt.QueuedConnection)  # 下注
                    self.betTimer.setInterval(2500)
                elif total_amount == money1:
                    logging.info("total_amount ==  money1")
                    cnt = 0
                    for i in self.all_ball_needToBetList:
                        if i[0] < 6:
                            row = self.viewEntry.rowCount()
                            newItem = QTableWidgetItem(u'已投注')
                            newItem.setBackgroundColor(self.c)
                            self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + cnt), 5, newItem)
                        cnt += 1
                    self.is_bet_success1 = True
                    self.betTimer.setInterval(1000)
                else:
                    logging.info('bet-success1 @@Re-Bet-Again@@ total_amount=%s, money1=%s, money2=%s' % (
                        total_amount, money1, money2))
                    doc = self.browser.page().mainFrame().documentElement()
                    bet_again_elems = doc.findAll('a[class="btn_m elem_btn l-c-b-t2 ft000 bet-again"]')
                    for i in range(len(bet_again_elems)):
                        logging.info('bet-success1 @@Re-Bet-Again@@ %s' % i)
                        bet_again_elems[i].evaluateJavaScript(
                                "var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")
                        bet_again_elems[i].evaluateJavaScript("this.click();")

            elif self.is_bet_success1 and not self.is_bet_success2:

                if money2 - money1 == 0:
                    cnt = 0
                    for i in self.all_ball_needToBetList:
                        row = self.viewEntry.rowCount()
                        newItem = QTableWidgetItem(u'已投注')
                        newItem.setBackgroundColor(self.c)
                        self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + cnt), 5, newItem)
                        cnt += 1
                    self.is_bet_success2 = True
                    self.betTimer.stop()
                    QMetaObject.invokeMethod(self.browser, "login_tab5", Qt.QueuedConnection)
                    return

                self.betTimer.setInterval(15000)

                logging.info("self.is_bet_success1 and not self.is_bet_success2")
                QMetaObject.invokeMethod(self.browser, "login_agree", Qt.QueuedConnection)  # 万一有公告
                if not self.isOnBetPage(self.NumOfAmountInputs2):
                    QMetaObject.invokeMethod(self.browser, "login_tab4", Qt.QueuedConnection)
                    self.betTimer.setInterval(5000)
                elif total_amount == money1:
                    tmp_list = ['1_', '2_', '3_', '4_', '5_']
                    for i in self.all_ball_needToBetList:
                        if i[0] >= 6:
                            for k in i[1]:
                                elem = amount_inputs[self.balls_elem_dic2[tmp_list[i[0] - 1 - 5] + k]]
                                amount = self.balls_bet_amount[i[2]]
                                if int(amount) > 0:
                                    elem.evaluateJavaScript(
                                            "var c = 0; if(this.value.length==0){c = 0+parseInt('" + amount + "');}else{c = parseInt(this.value)+parseInt('" + amount + "');}this.value = c.toString();")

                    QMetaObject.invokeMethod(self.browser, "submit", Qt.QueuedConnection)  # 下注
                    self.betTimer.setInterval(2500)
                elif total_amount == money2:
                    cnt = 0
                    for i in self.all_ball_needToBetList:
                        if i[0] >= 6:
                            row = self.viewEntry.rowCount()
                            newItem = QTableWidgetItem(u'已投注')
                            newItem.setBackgroundColor(self.c)
                            self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + cnt), 5, newItem)
                        cnt += 1

                    self.is_bet_success2 = True
                    self.betTimer.stop()
                    QMetaObject.invokeMethod(self.browser, "login_tab5", Qt.QueuedConnection)
                else:
                    logging.info('bet-success2 @@Re-Bet-Again@@')
                    logging.info('bet-success1 @@Re-Bet-Again@@ total_amount=%s, money1=%s, money2=%s' % (
                        total_amount, money1, money2))

                    doc = self.browser.page().mainFrame().documentElement()
                    bet_again_elems = doc.findAll('a[class="btn_m elem_btn l-c-b-t2 ft000 bet-again"]')
                    for i in range(len(bet_again_elems)):
                        logging.info('bet-success1 @@Re-Bet-Again@@ %s' % i)
                        bet_again_elems[i].evaluateJavaScript(
                                "var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")
        except Exception, ex:
            logging.error(ex, exc_info=1)

    @pyqtSlot(str)
    def loginFailed(self, msg):
        # 在这里重新把时间调整回去马上
        logging.info(u"因为登录失败，马上开启【登录定时器】...")
        self.loginTimer.setInterval(0)
        # QtGui.QMessageBox.about(self, u'登录失败', msg)

    # 响应程序改名按钮
    def on_rename_btn(self):
        name = self.nameEntry.text()
        if name == '':
            QtGui.QMessageBox.about(self, u'错误', u"命名不能为空！")
        else:
            cqssc_db = sqlite3.connect(MySettings.db_file_path)
            sql = u"update config set register_code='{name}';".format(name=name)
            cqssc_db.execute(unicode(sql))
            cqssc_db.commit()
            cqssc_db.close()
            QMetaObject.invokeMethod(self.parent, "mySetWindowTitle", Qt.QueuedConnection, Q_ARG(str, name))

            QtGui.QMessageBox.about(self, u'重命名成功', u"祝您财源广进!")

    @pyqtSlot()
    def betFailed(self):
        QtGui.QMessageBox.about(self, u'失败了！', u"此次下注失败，貌似是时间不够用...")