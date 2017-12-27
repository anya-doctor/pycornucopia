# #coding:utf-8
import os
import sqlite3

from PyQt4 import QtCore, QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import *

from myaction.LoginAction import MyLoginAction
from myaction.ReNameAction import MyReNameAction
from myaction.SaveConfigAction import MySaveConfigAction
from myaction.StartBetAction import MyStartBetAction
from myutil import MySettings
from myutil.MyTool import beautiful_log
from myutil.db.MyDB import MyDBUtil


class MyUIUtil(object):
    # 初始化UI
    @classmethod
    @beautiful_log
    def initUI(cls, console_instance):
        console_instance.gridlayout = QtGui.QGridLayout()
        for i in range(40):
            console_instance.gridlayout.setColumnStretch(i, 1)
            console_instance.gridlayout.setRowStretch(i, 1)

        # 为了美观
        lb1 = QLabel(u'账户')
        lb2 = QLabel(u'密码')
        console_instance.userEntry = QLineEdit()
        console_instance.passEntry = QLineEdit()
        console_instance.passEntry.setEchoMode(QLineEdit.Password)
        console_instance.loginBtn = QtGui.QPushButton(u"登录")
        console_instance.connect(console_instance.loginBtn, QtCore.SIGNAL('clicked()'),
                                 lambda: MyLoginAction.run(console_instance))

        console_instance.gridlayout.addWidget(lb1, 0, 0)
        console_instance.gridlayout.addWidget(lb2, 1, 0)
        console_instance.gridlayout.addWidget(console_instance.userEntry, 0, 1, 1, 3)
        console_instance.gridlayout.addWidget(console_instance.passEntry, 1, 1, 1, 3)
        console_instance.gridlayout.addWidget(console_instance.loginBtn, 0, 4, 1, 2)

        lb3 = QLabel(u'倍投')
        console_instance.betAmountEntry = QLineEdit()
        console_instance.gridlayout.addWidget(lb3, 0, 6)
        console_instance.gridlayout.addWidget(console_instance.betAmountEntry, 0, 7, 1, 5)

        lb4 = QLabel(u'盈损')
        console_instance.earnMoneyAtEntry = QLineEdit()
        console_instance.lostMoneyAtEntry = QLineEdit()
        console_instance.saveConfigBtn = QtGui.QPushButton(u"保存")
        console_instance.connect(console_instance.saveConfigBtn, QtCore.SIGNAL('clicked()'),
                                 lambda: MySaveConfigAction.run(console_instance))
        console_instance.gridlayout.addWidget(lb4, 1, 6)
        console_instance.gridlayout.addWidget(console_instance.earnMoneyAtEntry, 1, 7, 1, 2)
        console_instance.gridlayout.addWidget(console_instance.lostMoneyAtEntry, 1, 9, 1, 3)
        console_instance.gridlayout.addWidget(console_instance.saveConfigBtn, 1, 26, 1, 2)

        lb6 = QLabel(u'程序命名')
        console_instance.nameEntry = QLineEdit()
        console_instance.registerBtn = QtGui.QPushButton(u"命名")
        console_instance.registerBtn.setFixedSize(40, 20)
        console_instance.connect(console_instance.registerBtn, QtCore.SIGNAL('clicked()'),
                                 lambda: MyReNameAction.run(console_instance))
        console_instance.gridlayout.addWidget(lb6, 2, 0)
        console_instance.gridlayout.addWidget(console_instance.nameEntry, 2, 1, 1, 3)
        console_instance.gridlayout.addWidget(console_instance.registerBtn, 2, 4, 1, 2)

        lb7 = QLabel(u'舍N')
        console_instance.first_n_Entry = QLineEdit()
        console_instance.gridlayout.addWidget(lb7, 2, 6)
        console_instance.gridlayout.addWidget(console_instance.first_n_Entry, 2, 7)

        # 是否期期滚
        console_instance.isQQG_combobox = QComboBox()
        console_instance.isQQG_combobox.addItem(u'期期滚')
        console_instance.isQQG_combobox.addItem(u'常规')
        console_instance.gridlayout.addWidget(console_instance.isQQG_combobox, 2, 8, 1, 2)

        # 是否赢追加还是输追加
        console_instance.isLoseAdd_combobox = QComboBox()
        console_instance.isLoseAdd_combobox.addItem(u'输追加')
        console_instance.isLoseAdd_combobox.addItem(u'赢追加')
        console_instance.gridlayout.addWidget(console_instance.isLoseAdd_combobox, 2, 10, 1, 2)

        console_instance.goBtn = QtGui.QPushButton(u"开始")
        console_instance.connect(console_instance.goBtn, QtCore.SIGNAL('clicked()'),
                                 lambda: MyStartBetAction.run(console_instance))
        console_instance.gridlayout.addWidget(console_instance.goBtn, 2, 26, 1, 2)

        lb0 = QLabel(u'线路')
        console_instance.linesEntry = QTextEdit()
        console_instance.gridlayout.addWidget(lb0, 0, 12)
        console_instance.gridlayout.addWidget(console_instance.linesEntry, 0, 13, 3, 12)

        # 1
        console_instance.ball1_1_Entry, console_instance.ball2_1_Entry, console_instance.ball3_1_Entry, console_instance.ball4_1_Entry, console_instance.ball5_1_Entry, \
        console_instance.ball6_1_Entry, console_instance.ball7_1_Entry, console_instance.ball8_1_Entry, console_instance.ball9_1_Entry, console_instance.ball10_1_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 2
        console_instance.ball1_2_Entry, console_instance.ball2_2_Entry, console_instance.ball3_2_Entry, console_instance.ball4_2_Entry, console_instance.ball5_2_Entry, \
        console_instance.ball6_2_Entry, console_instance.ball7_2_Entry, console_instance.ball8_2_Entry, console_instance.ball9_2_Entry, console_instance.ball10_2_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 3
        console_instance.ball1_3_Entry, console_instance.ball2_3_Entry, console_instance.ball3_3_Entry, console_instance.ball4_3_Entry, console_instance.ball5_3_Entry, \
        console_instance.ball6_3_Entry, console_instance.ball7_3_Entry, console_instance.ball8_3_Entry, console_instance.ball9_3_Entry, console_instance.ball10_3_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 4
        console_instance.ball1_4_Entry, console_instance.ball2_4_Entry, console_instance.ball3_4_Entry, console_instance.ball4_4_Entry, console_instance.ball5_4_Entry, \
        console_instance.ball6_4_Entry, console_instance.ball7_4_Entry, console_instance.ball8_4_Entry, console_instance.ball9_4_Entry, console_instance.ball10_4_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 5
        console_instance.ball1_5_Entry, console_instance.ball2_5_Entry, console_instance.ball3_5_Entry, console_instance.ball4_5_Entry, console_instance.ball5_5_Entry, \
        console_instance.ball6_5_Entry, console_instance.ball7_5_Entry, console_instance.ball8_5_Entry, console_instance.ball9_5_Entry, console_instance.ball10_5_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 6
        console_instance.ball1_6_Entry, console_instance.ball2_6_Entry, console_instance.ball3_6_Entry, console_instance.ball4_6_Entry, console_instance.ball5_6_Entry, \
        console_instance.ball6_6_Entry, console_instance.ball7_6_Entry, console_instance.ball8_6_Entry, console_instance.ball9_6_Entry, console_instance.ball10_6_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 7
        console_instance.ball1_7_Entry, console_instance.ball2_7_Entry, console_instance.ball3_7_Entry, console_instance.ball4_7_Entry, console_instance.ball5_7_Entry, \
        console_instance.ball6_7_Entry, console_instance.ball7_7_Entry, console_instance.ball8_7_Entry, console_instance.ball9_7_Entry, console_instance.ball10_7_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 8
        console_instance.ball1_8_Entry, console_instance.ball2_8_Entry, console_instance.ball3_8_Entry, console_instance.ball4_8_Entry, console_instance.ball5_8_Entry, \
        console_instance.ball6_8_Entry, console_instance.ball7_8_Entry, console_instance.ball8_8_Entry, console_instance.ball9_8_Entry, console_instance.ball10_8_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 9
        console_instance.ball1_9_Entry, console_instance.ball2_9_Entry, console_instance.ball3_9_Entry, console_instance.ball4_9_Entry, console_instance.ball5_9_Entry, \
        console_instance.ball6_9_Entry, console_instance.ball7_9_Entry, console_instance.ball8_9_Entry, console_instance.ball9_9_Entry, console_instance.ball10_9_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()
        # 10
        console_instance.ball1_10_Entry, console_instance.ball2_10_Entry, console_instance.ball3_10_Entry, console_instance.ball4_10_Entry, console_instance.ball5_10_Entry, \
        console_instance.ball6_10_Entry, console_instance.ball7_10_Entry, console_instance.ball8_10_Entry, console_instance.ball9_10_Entry, console_instance.ball10_10_Entry \
            = QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit(), QLineEdit()

        tmp_entrys = [
            [console_instance.ball1_1_Entry, console_instance.ball1_2_Entry, console_instance.ball1_3_Entry,
             console_instance.ball1_4_Entry, console_instance.ball1_5_Entry,
             console_instance.ball1_6_Entry, console_instance.ball1_7_Entry, console_instance.ball1_8_Entry,
             console_instance.ball1_9_Entry, console_instance.ball1_10_Entry],
            [console_instance.ball2_1_Entry, console_instance.ball2_2_Entry, console_instance.ball2_3_Entry,
             console_instance.ball2_4_Entry, console_instance.ball2_5_Entry,
             console_instance.ball2_6_Entry, console_instance.ball2_7_Entry, console_instance.ball2_8_Entry,
             console_instance.ball2_9_Entry, console_instance.ball2_10_Entry],
            [console_instance.ball3_1_Entry, console_instance.ball3_2_Entry, console_instance.ball3_3_Entry,
             console_instance.ball3_4_Entry, console_instance.ball3_5_Entry,
             console_instance.ball3_6_Entry, console_instance.ball3_7_Entry, console_instance.ball3_8_Entry,
             console_instance.ball3_9_Entry, console_instance.ball3_10_Entry],
            [console_instance.ball4_1_Entry, console_instance.ball4_2_Entry, console_instance.ball4_3_Entry,
             console_instance.ball4_4_Entry, console_instance.ball4_5_Entry,
             console_instance.ball4_6_Entry, console_instance.ball4_7_Entry, console_instance.ball4_8_Entry,
             console_instance.ball4_9_Entry, console_instance.ball4_10_Entry],
            [console_instance.ball5_1_Entry, console_instance.ball5_2_Entry, console_instance.ball5_3_Entry,
             console_instance.ball5_4_Entry, console_instance.ball5_5_Entry,
             console_instance.ball5_6_Entry, console_instance.ball5_7_Entry, console_instance.ball5_8_Entry,
             console_instance.ball5_9_Entry, console_instance.ball5_10_Entry],
            [console_instance.ball6_1_Entry, console_instance.ball6_2_Entry, console_instance.ball6_3_Entry,
             console_instance.ball6_4_Entry, console_instance.ball6_5_Entry,
             console_instance.ball6_6_Entry, console_instance.ball6_7_Entry, console_instance.ball6_8_Entry,
             console_instance.ball6_9_Entry, console_instance.ball6_10_Entry],
            [console_instance.ball7_1_Entry, console_instance.ball7_2_Entry, console_instance.ball7_3_Entry,
             console_instance.ball7_4_Entry, console_instance.ball7_5_Entry,
             console_instance.ball7_6_Entry, console_instance.ball7_7_Entry, console_instance.ball7_8_Entry,
             console_instance.ball7_9_Entry, console_instance.ball7_10_Entry],
            [console_instance.ball8_1_Entry, console_instance.ball8_2_Entry, console_instance.ball8_3_Entry,
             console_instance.ball8_4_Entry, console_instance.ball8_5_Entry,
             console_instance.ball8_6_Entry, console_instance.ball8_7_Entry, console_instance.ball8_8_Entry,
             console_instance.ball8_9_Entry, console_instance.ball8_10_Entry],
            [console_instance.ball9_1_Entry, console_instance.ball9_2_Entry, console_instance.ball9_3_Entry,
             console_instance.ball9_4_Entry, console_instance.ball9_5_Entry,
             console_instance.ball9_6_Entry, console_instance.ball9_7_Entry, console_instance.ball9_8_Entry,
             console_instance.ball9_9_Entry, console_instance.ball9_10_Entry],
            [console_instance.ball10_1_Entry, console_instance.ball10_2_Entry, console_instance.ball10_3_Entry,
             console_instance.ball10_4_Entry, console_instance.ball10_5_Entry,
             console_instance.ball10_6_Entry, console_instance.ball10_7_Entry, console_instance.ball10_8_Entry,
             console_instance.ball10_9_Entry, console_instance.ball10_10_Entry]]

        for i in range(len(tmp_entrys)):
            for j in range(len(tmp_entrys[i])):
                label = QLabel(u'%d-%d' % (i + 1, j + 1))
                console_instance.gridlayout.addWidget(label, 4 + j, 0 + 4 * i)
                console_instance.gridlayout.addWidget(tmp_entrys[i][j], 4 + j, 1 + 4 * i, 1, 3)

        console_instance.qishu_label = QLabel(u'期数: ')
        console_instance.timeclose_label = QLabel(u'封盘: ')
        console_instance.timeopen_label = QLabel(u'下局: ')
        console_instance.win_label = QLabel(u'赢钱: ')
        console_instance.open_balls_label = QLabel(u'开奖: ')
        console_instance.gridlayout.addWidget(console_instance.qishu_label, 14, 0, 1, 2)
        console_instance.gridlayout.addWidget(console_instance.timeclose_label, 14, 2, 1, 2)
        console_instance.gridlayout.addWidget(console_instance.timeopen_label, 14, 4, 1, 2)
        console_instance.gridlayout.addWidget(console_instance.win_label, 14, 6, 1, 2)
        console_instance.gridlayout.addWidget(console_instance.open_balls_label, 14, 8, 1, 6)

        pa = QPalette()
        pa.setColor(QPalette.WindowText, Qt.red)
        console_instance.win_label.setPalette(pa)

        console_instance.viewEntry = QTableWidget(0, 7)
        console_instance.gridlayout.addWidget(console_instance.viewEntry, 15, 0, 30, 28)
        console_instance.viewEntry.setHorizontalHeaderLabels([u'期数', u'位置', u'投注号码', u'倍投', u'金额', u'下注否', u'中否'])
        console_instance.viewEntry.horizontalHeader().setStretchLastSection(True)
        console_instance.viewEntry.horizontalHeader().setResizeMode(QtGui.QHeaderView.Stretch)

        console_instance.setLayout(console_instance.gridlayout)

    # 初始化配置
    @classmethod
    @beautiful_log
    def initConfig(cls, console_instance):
        if not os.path.exists('./config/cqssc.db'):
            MyDBUtil.create_db()
            return

        cqssc_db = sqlite3.connect(MySettings.db_file_path)
        cursor = cqssc_db.execute("SELECT * FROM config;")

        for row in cursor:
            lines = row[0].replace(' ', '\n')

            console_instance.linesEntry.setText(lines)
            console_instance.lines = row[0].split(' ')
            console_instance.userEntry.setText(row[1])
            console_instance.passEntry.setText(row[2])
            console_instance.username = console_instance.userEntry.text()
            console_instance.password = console_instance.passEntry.text()

            console_instance.betAmountEntry.setText(row[3])
            # 载入各球投注倍数
            bets = row[3]
            if '-' in bets:
                console_instance.balls_bet_amount = bets.split('-')
            else:
                console_instance.balls_bet_amount = [bets]
            # 载入止盈止损
            console_instance.earnMoneyAtEntry.setText(row[4])
            console_instance.lostMoneyAtEntry.setText(row[5])
            if row[4] == '':
                console_instance.earn_money_at = '9999999999'
            else:
                console_instance.earn_money_at = row[4]
            if row[5] == '':
                console_instance.lost_money_at = '-9999999999'
            else:
                console_instance.lost_money_at = row[5]

            # 载入名字
            console_instance.nameEntry.setText(row[6])
            QMetaObject.invokeMethod(console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                     Q_ARG(str, row[6]))

            # 载入前N期
            console_instance.first_n_Entry.setText(row[7])
            console_instance.first_n = int(row[7])

            # 期期滚
            console_instance.isQQG = row[110]
            console_instance.isQQG_combobox.setCurrentIndex(int(console_instance.isQQG))

            # 输追加
            console_instance.isLoseAdd = row[111]
            console_instance.isLoseAdd_combobox.setCurrentIndex(int(console_instance.isLoseAdd))

            # ball 1
            console_instance.ball1_1_Entry.setText(row[10])
            console_instance.ball1_2_Entry.setText(row[11])
            console_instance.ball1_3_Entry.setText(row[12])
            console_instance.ball1_4_Entry.setText(row[13])
            console_instance.ball1_5_Entry.setText(row[14])
            console_instance.ball1_6_Entry.setText(row[15])
            console_instance.ball1_7_Entry.setText(row[16])
            console_instance.ball1_8_Entry.setText(row[17])
            console_instance.ball1_9_Entry.setText(row[18])
            console_instance.ball1_10_Entry.setText(row[19])

            # ball 2
            console_instance.ball2_1_Entry.setText(row[20])
            console_instance.ball2_2_Entry.setText(row[21])
            console_instance.ball2_3_Entry.setText(row[22])
            console_instance.ball2_4_Entry.setText(row[23])
            console_instance.ball2_5_Entry.setText(row[24])
            console_instance.ball2_6_Entry.setText(row[25])
            console_instance.ball2_7_Entry.setText(row[26])
            console_instance.ball2_8_Entry.setText(row[27])
            console_instance.ball2_9_Entry.setText(row[28])
            console_instance.ball2_10_Entry.setText(row[29])

            # ball 3
            console_instance.ball3_1_Entry.setText(row[30])
            console_instance.ball3_2_Entry.setText(row[31])
            console_instance.ball3_3_Entry.setText(row[32])
            console_instance.ball3_4_Entry.setText(row[33])
            console_instance.ball3_5_Entry.setText(row[34])
            console_instance.ball3_6_Entry.setText(row[35])
            console_instance.ball3_7_Entry.setText(row[36])
            console_instance.ball3_8_Entry.setText(row[37])
            console_instance.ball3_9_Entry.setText(row[38])
            console_instance.ball3_10_Entry.setText(row[39])

            # ball 4
            console_instance.ball4_1_Entry.setText(row[40])
            console_instance.ball4_2_Entry.setText(row[41])
            console_instance.ball4_3_Entry.setText(row[42])
            console_instance.ball4_4_Entry.setText(row[43])
            console_instance.ball4_5_Entry.setText(row[44])
            console_instance.ball4_6_Entry.setText(row[45])
            console_instance.ball4_7_Entry.setText(row[46])
            console_instance.ball4_8_Entry.setText(row[47])
            console_instance.ball4_9_Entry.setText(row[48])
            console_instance.ball4_10_Entry.setText(row[49])

            # ball 5
            console_instance.ball5_1_Entry.setText(row[50])
            console_instance.ball5_2_Entry.setText(row[51])
            console_instance.ball5_3_Entry.setText(row[52])
            console_instance.ball5_4_Entry.setText(row[53])
            console_instance.ball5_5_Entry.setText(row[54])
            console_instance.ball5_6_Entry.setText(row[55])
            console_instance.ball5_7_Entry.setText(row[56])
            console_instance.ball5_8_Entry.setText(row[57])
            console_instance.ball5_9_Entry.setText(row[58])
            console_instance.ball5_10_Entry.setText(row[59])

            # ball 6
            console_instance.ball6_1_Entry.setText(row[60])
            console_instance.ball6_2_Entry.setText(row[61])
            console_instance.ball6_3_Entry.setText(row[62])
            console_instance.ball6_4_Entry.setText(row[63])
            console_instance.ball6_5_Entry.setText(row[64])
            console_instance.ball6_6_Entry.setText(row[65])
            console_instance.ball6_7_Entry.setText(row[66])
            console_instance.ball6_8_Entry.setText(row[67])
            console_instance.ball6_9_Entry.setText(row[68])
            console_instance.ball6_10_Entry.setText(row[69])

            # ball 7
            console_instance.ball7_1_Entry.setText(row[70])
            console_instance.ball7_2_Entry.setText(row[71])
            console_instance.ball7_3_Entry.setText(row[72])
            console_instance.ball7_4_Entry.setText(row[73])
            console_instance.ball7_5_Entry.setText(row[74])
            console_instance.ball7_6_Entry.setText(row[75])
            console_instance.ball7_7_Entry.setText(row[76])
            console_instance.ball7_8_Entry.setText(row[77])
            console_instance.ball7_9_Entry.setText(row[78])
            console_instance.ball7_10_Entry.setText(row[79])

            # ball 8
            console_instance.ball8_1_Entry.setText(row[80])
            console_instance.ball8_2_Entry.setText(row[81])
            console_instance.ball8_3_Entry.setText(row[82])
            console_instance.ball8_4_Entry.setText(row[83])
            console_instance.ball8_5_Entry.setText(row[84])
            console_instance.ball8_6_Entry.setText(row[85])
            console_instance.ball8_7_Entry.setText(row[86])
            console_instance.ball8_8_Entry.setText(row[87])
            console_instance.ball8_9_Entry.setText(row[88])
            console_instance.ball8_10_Entry.setText(row[89])

            # ball 9
            console_instance.ball9_1_Entry.setText(row[90])
            console_instance.ball9_2_Entry.setText(row[91])
            console_instance.ball9_3_Entry.setText(row[92])
            console_instance.ball9_4_Entry.setText(row[93])
            console_instance.ball9_5_Entry.setText(row[94])
            console_instance.ball9_6_Entry.setText(row[95])
            console_instance.ball9_7_Entry.setText(row[96])
            console_instance.ball9_8_Entry.setText(row[97])
            console_instance.ball9_9_Entry.setText(row[98])
            console_instance.ball9_10_Entry.setText(row[99])

            # ball 10
            console_instance.ball10_1_Entry.setText(row[100])
            console_instance.ball10_2_Entry.setText(row[101])
            console_instance.ball10_3_Entry.setText(row[102])
            console_instance.ball10_4_Entry.setText(row[103])
            console_instance.ball10_5_Entry.setText(row[104])
            console_instance.ball10_6_Entry.setText(row[105])
            console_instance.ball10_7_Entry.setText(row[106])
            console_instance.ball10_8_Entry.setText(row[107])
            console_instance.ball10_9_Entry.setText(row[108])
            console_instance.ball10_10_Entry.setText(row[109])

            console_instance.ball1 = [row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18],
                                      row[19]]
            console_instance.ball2 = [row[20], row[21], row[22], row[23], row[24], row[25], row[26], row[27], row[28],
                                      row[29]]
            console_instance.ball3 = [row[30], row[31], row[32], row[33], row[34], row[35], row[36], row[37], row[38],
                                      row[39]]
            console_instance.ball4 = [row[40], row[41], row[42], row[43], row[44], row[45], row[46], row[47], row[48],
                                      row[49]]
            console_instance.ball5 = [row[50], row[51], row[52], row[53], row[54], row[55], row[56], row[57], row[58],
                                      row[59]]
            console_instance.ball6 = [row[60], row[61], row[62], row[63], row[64], row[65], row[66], row[67], row[68],
                                      row[69]]
            console_instance.ball7 = [row[70], row[71], row[72], row[73], row[74], row[75], row[76], row[77], row[78],
                                      row[79]]
            console_instance.ball8 = [row[80], row[81], row[82], row[83], row[84], row[85], row[86], row[87], row[88],
                                      row[89]]
            console_instance.ball9 = [row[90], row[91], row[92], row[93], row[94], row[95], row[96], row[97], row[98],
                                      row[99]]
            console_instance.ball10 = [row[100], row[101], row[102], row[103], row[104], row[105], row[106], row[107],
                                       row[108],
                                       row[109]]
            console_instance.balls = [console_instance.ball1, console_instance.ball2, console_instance.ball3,
                                      console_instance.ball4, console_instance.ball5,
                                      console_instance.ball6, console_instance.ball7, console_instance.ball8,
                                      console_instance.ball9, console_instance.ball10]

        cursor.close()
        cqssc_db.commit()
        cqssc_db.close()
