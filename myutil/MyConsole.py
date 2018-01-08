# #coding:utf-8
import logging

from PyQt4 import QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import *

from myaction.GetHistoryResultDataAction import MyGetHistoryResultDataAction
from myaction.GetPreBetDataAction import MyGetPreBetDataAction
from myaction.LoginAction import MyLoginAction
from myaction.ReNameAction import MyReNameAction
from myaction.SaveConfigAction import MySaveConfigAction
from myaction.StartBetAction import MyStartBetAction
from myaction.UpdateHistoryResultDataAction import MyUpdateHistoryResultDataAction
from myaction.UpdatePreBetDataAction import MyUpdatePreBetDataAction
from myaction.UpdateSimulateHistoryResultDataAction import MyUpdateSimulateHistoryResultDataAction
from mythread import MyBetThread
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
        self.balls_bet_flag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  # [0,0,0,0,0]
        self.all_ball_needToBetList = []  # [[1,2,3,4],[3,4,5,6],[2,1,3,4],[2,3,4,1],[7,8,9,0]]
        self.balls_bet_amount = []  # [1,2,4,8]

        self.goThread = None
        self.betThread = None
        self.rebetThread = None  #专门用来处理下注的时候被挤下线等情况的重新下注
        self.getPreBetDataThread = None
        self.loginThread = None
        self.getHistoryResultDataThread = None
        self.getSimulateHistoryResultDataThread = None

        self.betTimer = None
        self.rebetTimer = None
        self.getPreBetDatgaTimer = None
        self.loginTimer = None
        self.getHistoryResultDataTimer = None
        self.getSimulateHistoryResultDataTimer = None

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

        self.login_fail_cnt = 0  # 登录失败次数

        # 显示的标签
        self.qishu_label = None
        self.timeclose_label = None
        self.timeopen_label = None
        self.win_label = None
        self.open_balls_label = None
        self.limit_label = None
        self.remain_label = None
        self.already_bet_label = None
        self.now_bet_money_label = None

        self.timesold = 0
        self.timesnow = 0
        self.open_balls = []
        self.history_data = []
        self.preBetDataDic = {}
        self.simulate_data = []  # 模拟用的历史数据

        self.fake_mode = False
        self.fake_mode_getPreBetData = False

        # 登录成功会填充这个dict
        self.loginSuccessData = {}

        self.isQQG = False
        self.isLoseAdd = True

        self.is_bet_success = False

        MyUIUtil.initUI(self)
        MyUIUtil.initConfig(self)

        # 设置一些按钮不可点击
        assert isinstance(self.goBtn, QPushButton)
        self.goBtn.setEnabled(False)

        """
            all_ball_needToBetList = [
                [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
                [],
                ...
            ]
        """

    @pyqtSlot()
    def onLoginBtn(self):
        # 每次登录，这个重要的data都要清空，否则会影响后续判断
        self.loginSuccessData = {}

        MyLoginAction.run(self)

    def onReNameBtn(self):
        MyReNameAction.run(self)

    def onSaveConfigBtn(self):
        MySaveConfigAction.run(self)

    def onStartBtn(self):
        MyStartBetAction.run(self)

    @pyqtSlot()
    def onGetPreBetDataHideBtn(self):
        # 获取预下注数据
        MyGetPreBetDataAction.run(self)

        # 登录成功后，就会开始获取数据，这个时候就可以把失败次数=0
        self.login_fail_cnt = 0

    @pyqtSlot(dict)
    def onUpdatePreBetDataHideBtn(self, data_dic):
        MyUpdatePreBetDataAction.run(self, data_dic)

    @pyqtSlot()
    def onGetHistoryResultDataHideBtn(self):
        # 获取历史数据
        logging.info(u"【获取历史数据】...")
        MyGetHistoryResultDataAction.run(self)

    @pyqtSlot(dict)
    def onUpdateHistoryResultDataHideBtn(self, data_dic):
        # 定时器关闭
        logging.info(u"【控制台】关闭获取开奖结果定时器")
        self.getHistoryResultDataTimer.stop()

        MyUpdateHistoryResultDataAction.run(self, data_dic)

    @pyqtSlot(dict)
    def onUpdateSimulateHistoryResultDataHideBtn(self, data_dic):
        # 定时器关闭
        logging.info(u"【控制台】关闭获取模拟用的开奖结果定时器")
        self.getSimulateHistoryResultDataTimer.stop()

        MyUpdateSimulateHistoryResultDataAction.run(self, data_dic)

    # 重置获取数据定时器
    @pyqtSlot(int)
    def setGoTimer(self, seconds):
        self.goTimer.setInterval(seconds * 1000)

    # 更新Table数据-1
    @pyqtSlot()
    def loadTableData(self):
        try:
            # 本次下注金额
            now_bet_money = 0
            for i in self.all_ball_needToBetList:
                for j in i[3]:
                    now_bet_money += self.balls_bet_amount[i[2]]
            self.now_bet_money_label.setText(u"本次下注金额：%s" % now_bet_money)

            self.colorflag += 1
            self.c = QColor("darkgray") if self.colorflag % 2 == 0 else QColor("gray")

            for index, item in enumerate(self.all_ball_needToBetList):
                # 添加一行
                row = self.viewEntry.rowCount()
                self.viewEntry.insertRow(row)

                newItem = QTableWidgetItem(str(item[0]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 0, newItem)

                newItem = QTableWidgetItem(str(item[1]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 1, newItem)

                betstr = u""
                for v in item[3]:
                    if v[0] == 1:
                        betstr += u"冠军%s, " % (v[1])
                    elif v[0] == 2:
                        betstr += u"亚军%s, " % (v[1])
                    else:
                        dic = {
                            3: u'三',
                            4: u'四',
                            5: u'五',
                            6: u'六',
                            7: u'七',
                            8: u'八',
                            9: u'九',
                            10: u'十',
                        }
                        betstr += u"第%s名%s, " % (dic[v[0]], v[1])
                betstr = betstr[0:-2]  # 去掉最后一个，
                newItem = QTableWidgetItem(betstr)
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 2, newItem)

                # 当前倍投
                newItem = QTableWidgetItem(str(item[2]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 3, newItem)

                # 当前金额
                newItem = QTableWidgetItem(str(self.balls_bet_amount[int(item[2])]))
                newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row, 4, newItem)
            logging.info(u'【控制台】UI界面-1更新...')
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
                if b[k][2] == 0:
                    newItem = QTableWidgetItem(u'中')
                    newItem.setBackgroundColor(self.c)
                    newItem.setTextColor(QColor(255, 0, 0, 127))
                else:
                    newItem = QTableWidgetItem(u'不中')
                    newItem.setBackgroundColor(self.c)
                self.viewEntry.setItem(row - len(b) + k, 6, newItem)

                result_item = QTableWidgetItem(', '.join([str(v) for v in self.open_balls]))
                result_item.setBackgroundColor(self.c)
                self.viewEntry.setItem(row - len(b) + k, 7, result_item)

            logging.info(u"【控制台】UI界面-2更新，结算完毕...")
        except Exception, ex:
            logging.error(ex, exc_info=1)
            for i in self.all_ball_needToBetList:
                logging.info(i)

    @pyqtSlot(dict)
    def onLoginSuccess(self, loginSuccessData):
        # 登录成功
        self.loginSuccessData = loginSuccessData

        # 因为登录成功，所以先把那个自动登录进程杀死吧。
        if self.loginTimer:
            logging.info(u"【登录成功】我停掉了定时器...")
            self.loginTimer.stop()
        if self.loginThread:
            logging.info(u"【登录成功】我停掉了线程...")
            self.loginThread.quit()
            self.loginThread.wait()

        self.loginBtn.setEnabled(False)

    @pyqtSlot(str)
    def onLoginFailed(self, msg):
        # 在这里重新把时间调整回去马上
        logging.info(u"因为登录失败，马上开启【登录定时器】...")
        self.loginTimer.setInterval(500)
        self.login_fail_cnt += 1
        logging.info(u"登录失败次数=%s" % self.login_fail_cnt)
        if self.login_fail_cnt >= 3:
            self.lines_flag += 1

            # 天道好循环
            lines = str(self.linesEntry.toPlainText())
            lines = lines.split('\n')
            if self.lines_flag == len(lines):
                self.lines_flag = 0

            logging.info(u"【控制台】因为登录失败次数=%s，所以切换下一条线路，线路=%s." % (self.login_fail_cnt, self.lines_flag))
            self.login_fail_cnt = 0

    @pyqtSlot(dict)
    def betFailed(self, ret_json):
        self.is_bet_success = False

        # 更新下注面板信息...
        cnt = 0
        row = self.viewEntry.rowCount()

        logging.info(u"【下注结果界面】bet_list=%s" % self.all_ball_needToBetList)
        logging.info(u"【下注结果界面】row_count=%s" % row)

        dic = {
            1: u'冠军',
            2: u'亞軍',
            3: u'第三名',
            4: u'第四名',
            5: u'第五名',
            6: u'第六名',
            7: u'第七名',
            8: u'第八名',
            9: u'第九名',
            10: u'第十名',
        }
        fail_msg = u"失败%s单" % len(ret_json['errors'])
        for item in self.all_ball_needToBetList:
            newItem = QTableWidgetItem(fail_msg)
            newItem.setBackgroundColor(self.c)
            self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + cnt), 5, newItem)
            cnt += 1

    @pyqtSlot()
    def betSuccess(self):
        self.is_bet_success = True

        # 更新下注面板信息...
        cnt = 0
        row = self.viewEntry.rowCount()

        logging.info(u"【下注结果界面】bet_list=%s" % self.all_ball_needToBetList)
        logging.info(u"【下注结果界面】row_count=%s" % row)

        for item in self.all_ball_needToBetList:
            newItem = QTableWidgetItem(u'已投注')
            newItem.setBackgroundColor(self.c)
            self.viewEntry.setItem((row - len(self.all_ball_needToBetList) + cnt), 5, newItem)
            cnt += 1

    @pyqtSlot(str, str)
    def alert(self, msgtitle, msg):
        QtGui.QMessageBox.about(self, msgtitle, msg)

    @pyqtSlot()
    def onRetBetHidenBtn(self):
        logging.info(u"【控制台】触发逻辑：onRetBetHidenBtn.")
        # 删除定时器，清空资源...
        if self.rebetTimer:
            del self.rebetTimer

        # 一旦开始了，就开始一次就行了
        self.rebetTimer = QTimer()
        self.rebetTimer.timeout.connect(lambda: self.rebet())
        self.rebetTimer.start(1000)

    def rebet(self):
        if not self.loginSuccessData:
            logging.info(u"【重新下注线程】貌似还没登录，稍等5秒钟...")
            self.rebetTimer.setInterval(5 * 1000)
        else:
            if 'win' not in self.preBetDataDic['data']:
                logging.info(u"【重新下注线程】還在結算階段，拿不到最新數據，等待之...")
                self.rebetTimer.setInterval(5 * 1000)
            else:
                self.cur_money = int(self.preBetDataDic['data']['win'].replace(',', ''))
                self.timesnow = int(self.preBetDataDic['data']['betnotice']['timesnow'])
                self.timeclose = int(self.preBetDataDic['data']['betnotice']['timeclose'])
                self.timeopen = int(self.preBetDataDic['data']['betnotice']['timeopen'])
                logging.info(u"【重新下注线程】当前金额=%s" % self.cur_money)
                logging.info(u"【重新下注线程】当前期数=%s" % self.timesnow)
                logging.info(u"【重新下注线程】当前剩余时间=%s" % self.timeclose)
                logging.info(u"【重新下注线程】下局开始时间=%s" % self.timeopen)

                # 判断止损条件
                logging.info(u"【重新下注线程】设置损=%s,设置盈=%s,当前=%s" % (self.lost_money_at, self.earn_money_at, self.cur_money))
                if not (self.lost_money_at < self.cur_money < self.earn_money_at):
                    self.rebetTimer.stop()
                    logging.info(u"已停止达到赢损条件。")
                    QtGui.QMessageBox.about(self, u'已停止', u"达到赢损条件。")
                    # 重新设置按钮文字...
                    self.goBtn.setText(u'开始')
                else:
                    # 理论上触发一次就够了, 定时器关闭...
                    self.rebetTimer.stop()

                    # 杀掉老的进程
                    if self.rebetThread and self.rebetThread.isRunning():
                        logging.info(u"【重新下注线程】老的 rebetThread 还在，杀死它...")
                        self.rebetThread.quit()
                        self.rebetThread.wait()

                    # 至少留5秒的时候来
                    if self.timeclose < 1:
                        logging.info(u"【重新下注线程】下注时间=%s,来不及了，本次下注失败，停止下注。" % self.timeclose)
                        self.rebetTimer.stop()
                    else:
                        self.rebetThread = MyBetThread.MyBetDataThread(self)
                        self.rebetThread.start(1000)
