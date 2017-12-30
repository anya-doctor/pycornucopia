# #coding:utf-8
import logging

from PyQt4 import QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import *

from myaction.BalanceDataAction import BalanceDataAction
from myaction.CreateNextBetDataAction import CreateNextBetDataAction
from myaction.GetHistoryResultDataAction import MyGetHistoryResultDataAction
from myaction.GetPreBetDataAction import MyGetPreBetDataAction
from myaction.LoginAction import MyLoginAction
from myaction.ReNameAction import MyReNameAction
from myaction.SaveConfigAction import MySaveConfigAction
from myaction.StartBetAction import MyStartBetAction
from myaction.UpdateHistoryResultDataAction import MyUpdateHistoryResultDataAction
from myaction.UpdatePreBetDataAction import MyUpdatePreBetDataAction
from myutil.gui.MyUI import MyUIUtil


class MyConsole(QWidget):
    def __init__(self, parent=None):
        """
        投注的倍数 self.balls_bet_amount

        :param parent:
        :return:
        """
        QWidget.__init__(self)

        self.parent = parent
        self.username = ''
        self.password = ''
        self.row_index = 0  # 当前到第几行了
        self.is_bet_success1 = False
        self.is_bet_success2 = False
        self.balls_bet_flag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  # [0,0,0,0,0]
        self.all_ball_needToBetList = []  # [[1,2,3,4],[3,4,5,6],[2,1,3,4],[2,3,4,1],[7,8,9,0]]
        self.balls_bet_amount = []  # ['1','2','4','8']

        self.goThread = None
        self.betThread = None
        self.getPreBetDataThread = None
        self.loginThread = None
        self.getHistoryResultDataThread = None

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
        self.getHistoryResultDataTimer = None

        self.login_fail_cnt = 0

        # 显示的标签
        self.qishu_label = None
        self.timeclose_label = None
        self.timeopen_label = None
        self.win_label = None
        self.open_balls_label = None

        self.timesold = 0
        self.timesnow = 0
        self.open_balls = []
        self.history_data = {}

        self.fake_mode = False
        self.fake_mode_getPreBetData = False

        MyUIUtil.initUI(self)
        MyUIUtil.initConfig(self)

    @pyqtSlot()
    def onLoginBtn(self):
        MyLoginAction.run(self)

    def onReNameBtn(self):
        MyReNameAction.run(self)

    def onSaveConfigBtn(self):
        MySaveConfigAction.run(self)

    def onStartBtn(self):
        MyStartBetAction.run(self)

    @pyqtSlot(dict)
    def onGetPreBetDataHideBtn(self, loging_success_data_dic):
        # 获取预下注数据
        MyGetPreBetDataAction.run(self, loging_success_data_dic)

        # 登录成功后，就会开始获取数据，这个时候就可以把失败次数=0
        self.login_fail_cnt = 0

    @pyqtSlot(dict)
    def onUpdatePreBetDataHideBtn(self, data_dic):
        MyUpdatePreBetDataAction.run(self, data_dic)

    @pyqtSlot(dict)
    def onGetHistoryResultDataHideBtn(self, loging_success_data_dic):
        # 获取历史数据
        logging.info(u"【获取历史数据】...")
        MyGetHistoryResultDataAction.run(self, loging_success_data_dic)

    @pyqtSlot(dict)
    def onUpdateHistoryResultDataHideBtn(self, data_dic):
        # 定时器关闭
        logging.info(u"【控制台】关闭获取开奖结果定时器")
        self.getHistoryResultDataTimer.stop()

        MyUpdateHistoryResultDataAction.run(self, data_dic)

    # 重置获取数据定时器
    @pyqtSlot(int)
    def setGoTimer(self, seconds):
        self.goTimer.setInterval(seconds * 1000)

    # 更新Table数据-1
    @pyqtSlot()
    def loadTableData(self):
        try:
            self.colorflag += 1
            self.c = QColor("darkgray") if self.colorflag % 2 == 0 else QColor("gray")

            for i in range(len(self.all_ball_needToBetList)):
                # 添加一行
                row = self.viewEntry.rowCount()
                self.viewEntry.insertRow(row)

                newItem = QTableWidgetItem(str(int(self.timesnow) + 1))
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
                if self.isLoseAdd == '0':  # 输追加
                    if b[k][2] == 0:
                        newItem = QTableWidgetItem(u'中')
                        newItem.setBackgroundColor(self.c)
                        newItem.setTextColor(QColor(255, 0, 0, 127))
                    else:
                        newItem = QTableWidgetItem(u'不中')
                        newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row - len(b) + k, 6, newItem)
            logging.info(u"load data2 finish 结算完毕。。。")
        except Exception, ex:
            logging.error(ex, exc_info=1)
            for i in self.all_ball_needToBetList:
                logging.info(i)

    @pyqtSlot()
    def onStartBetHideBtn(self):
        ##界面更新
        for i in range(len(self.all_ball_needToBetList)):
            row = self.viewEntry.rowCount()
            newItem = QTableWidgetItem(u'未')
            newItem.setBackgroundColor(self.c)
            self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + i), 5, newItem)
        ##开搞
        self.is_bet_success = True

        from mythread import MyBetThread
        self.bet_thread = MyBetThread.MyBetDataThread(self, self.loginSuccessData, self.all_ball_needToBetList,
                                                      self.balls_bet_amount, self.preBetDataDic)
        self.bet_thread.start()

    def balanceData(self):
        BalanceDataAction.run(self)

    def updateNextBetData(self, index, lines, reverse_cnt, last_bet=[], re_last_bet=[]):
        return CreateNextBetDataAction.run(self, index, lines, reverse_cnt, last_bet=[], re_last_bet=[])

    # 响应下注
    @pyqtSlot()
    def bet(self):
        bet_result = self.browser.bet(self.all_ball_needToBetList, self.balls_bet_amount)
        if bet_result['data']['success']:
            self.is_bet_success1 = True
            self.is_bet_success2 = True
        else:
            logging.error(bet_result)

    @pyqtSlot()
    def onLoginSuccess(self):
        # 因为登录成功，所以先把那个自动登录进程杀死吧。
        if self.loginTimer:
            logging.info(u"【登录成功】我停掉了定时器...")
            self.loginTimer.stop()
        if self.loginThread:
            logging.info(u"【登录成功】我停掉了线程...")
            self.loginThread.quit()
            self.loginThread.wait()

    @pyqtSlot(str)
    def onLoginFailed(self, msg):
        # 在这里重新把时间调整回去马上
        logging.info(u"因为登录失败，马上开启【登录定时器】...")
        self.loginTimer.setInterval(500)
        self.login_fail_cnt += 1
        logging.info(u"登录失败次数=%s" % self.login_fail_cnt)
        if self.login_fail_cnt >= 5:
            # 先杀死老的登录进程
            self.loginTimer.stop()
            if self.loginThread:
                if self.loginThread.isRunning():
                    logging.info(u"老的loginThread还在，杀死它...")
                    self.loginThread.quit()
                    self.loginThread.wait()

            QtGui.QMessageBox.about(self, u'登录失败', u"请检查下线路吧。。")
            self.login_fail_cnt = 0

    @pyqtSlot()
    def betFailed(self):
        QtGui.QMessageBox.about(self, u'失败了！', u"此次下注失败，貌似是时间不够用...")

    @pyqtSlot()
    def betSuccess(self):
        # 更新下注面板信息...
        cnt = 0
        logging.info(u"【下注结果界面】bet_list=%s" % self.all_ball_needToBetList)

        for i in self.all_ball_needToBetList:
            row = self.viewEntry.rowCount()
            logging.info(u"【下注结果界面】row_count=%s" % row)
            newItem = QTableWidgetItem(u'已投注')
            newItem.setBackgroundColor(self.c)
            self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + cnt), 5, newItem)
            cnt += 1
