# #coding:utf-8
import logging
import time

from PyQt4 import QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from bs4 import BeautifulSoup

from myutil.action.GetPreBetDataAction import MyGetPreBetDataAction
from myutil.action.LoginAction import MyLoginAction
from myutil.action.ReNameAction import MyReNameAction
from myutil.action.SaveConfigAction import MySaveConfigAction
from myutil.action.StartAction import MyStartAction
from myutil.action.UpdatePreBetDataAction import MyUpdatePreBetDataAction
from myutil.gui.MyUI import MyUIUtil


class MyConsole(QWidget):
    def __init__(self, parent=None, browser=None):
        """
        投注的倍数 self.balls_bet_amount

        :param bro:
        :param parent:
        :return:
        """
        QWidget.__init__(self)

        self.browser = browser
        self.parent = parent
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

        self.login_fail_cnt = 0

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
        MyStartAction.run(self)

    @pyqtSlot(dict)
    def onGetPreBetDataHideBtn(self, data_dic):
        MyGetPreBetDataAction.run(self, data_dic)

    @pyqtSlot(dict)
    def onUpdatePreBetDataHideBtn(self, data_dic):
        MyUpdatePreBetDataAction.run(self, data_dic)

    # 响应刷新按钮
    def onRefreshButton(self):
        QMetaObject.invokeMethod(self.browser, "refresh", Qt.QueuedConnection, Q_ARG(str, self.lines[self.lines_flag]))

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

    @pyqtSlot()
    def betFailed(self):
        QtGui.QMessageBox.about(self, u'失败了！', u"此次下注失败，貌似是时间不够用...")
