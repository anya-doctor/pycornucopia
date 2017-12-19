# #coding:utf-8
import copy
import logging
import re
import urllib
import urllib2

from PyQt4 import QtCore
from PyQt4.QtCore import *
from bs4 import BeautifulSoup

from myutil import MySettings


class MyBaseDataGetter(QtCore.QThread):
    def __init__(self, console, curP, balls_bet_flag, balls_bet_amount, all_ball_needToBetList, first_n,
                 change_flag, is_bet_success1, is_bet_success2, reslist):
        QtCore.QThread.__init__(self)
        self.console = console
        self.all_ball_needToBetList = all_ball_needToBetList
        self.pre_all_ball_needToBetList = all_ball_needToBetList
        self.balls_bet_flag = balls_bet_flag
        self.balls_bet_amount = balls_bet_amount
        self.curP = curP
        self.first_n = first_n
        self.change_flag = change_flag
        self.is_bet_success1 = is_bet_success1
        self.is_bet_success2 = is_bet_success2
        self.reslist = reslist

    def run(self):
        try:
            url = 'http://bwlc.net/bulletin/trax.html'
            rets = []
            tmpret = self.getPageSourceFrom(url)
            rets.append(tmpret)
            if tmpret[0] != '200' or not tmpret[1]:
                logging.info(u'数据获取异常，请检查网络连接~')
                QMetaObject.invokeMethod(self.console, "setGoTimer", Qt.QueuedConnection, Q_ARG(int, 5))
            else:
                # 获取本期数据
                curP, curN = self.getCurrentPeriodsAndNumbers(rets)
                if curP != '-1' and curP != self.curP:
                    out = open(MySettings.period_data_file_path, 'rb')
                    lines = out.readlines()
                    out.close()

                    if self.all_ball_needToBetList:
                        self.onHandlePreBet(curN, lines)

                        # 通知控制台中或不中
                        b = copy.deepcopy(self.all_ball_needToBetList)
                        QMetaObject.invokeMethod(self.console, "loadTableData2", Q_ARG(list, b))

                        if self.console.isQQG == '0':
                            # 期期滚- 过滤掉期期滚中了或者爆了的数据项
                            self.all_ball_needToBetList = filter(
                                lambda x: x[2] != 0 and x[2] != len(self.balls_bet_amount), b)
                        else:
                            # 常规 - 重置那些被爆了的
                            for i in self.all_ball_needToBetList:
                                if i[2] == len(self.balls_bet_amount):
                                    i[2] = 0  # 倍投
                                    i[4] = 0  # reverse_cnt

                    if not self.all_ball_needToBetList:
                        logging.info(u'列表为空...')
                        for i in range(1, 11):
                            a, b = self.getDataForBall(i, lines, 0, [])
                            if a:
                                self.all_ball_needToBetList.append([i, a, 0, int(self.console.isQQG), 0, [], b])
                    elif self.console.isQQG == '0':
                        logging.info(u'期期滚的节奏')
                        for i in range(1, 11):
                            a, b = self.getDataForBall(i, lines, 0, [])
                            if a:
                                self.all_ball_needToBetList.append([i, a, 0, int(self.console.isQQG), 0, [], b])
                    elif self.console.isQQG == '1' and self.isQQG():
                        logging.info(u'虽然不是期期滚，但第一次嘛')
                        for i in range(1, 11):
                            a, b = self.getDataForBall(i, lines, 0, [])
                            if a:
                                self.all_ball_needToBetList.append([i, a, 0, int(self.console.isQQG), 0, [], b])

                    logging.info(u"期数：%s" % curP)
                    logging.info(u"当前倍投参数为：[%s]" % ' '.join([str(v) for v in self.balls_bet_amount]))
                    for index, i in enumerate(self.all_ball_needToBetList):
                        bet_ball = i[0]
                        bet_flag = int(i[2])
                        bet_amount = self.balls_bet_amount[bet_flag]
                        is_qqg = u'常规' if i[3] == 1 else u'期期滚'
                        logging.info(u"index: %s. 第%s球，当前倍投：%s，当前下注金额：%s，模式：%s." %
                                     (index, bet_ball, bet_flag, bet_amount, is_qqg))

                    # 写数据到Table 通知控制台下注
                    QMetaObject.invokeMethod(self.console, "loadTableData", Qt.QueuedConnection)
                    QMetaObject.invokeMethod(self.console, "onStartBetHideBtn", Qt.QueuedConnection)
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 处理上期数据 + 下注列表数据更新
    def onHandlePreBet(self, curN, lines):
        pass

    # 更新console数据
    @pyqtSlot(int, str, str, str)
    def update_goThreadData(self, first_n, betAmount, isQQG, isLoseAdd):
        self.first_n = first_n
        self.balls_bet_amount = betAmount.split('-')
        # 突然设置为不期期滚之后，重置下注列表
        if isQQG == '1':
            self.all_ball_needToBetList = []

    # 下载网页
    def getPageSourceFrom(self, url):
        user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        values = {'name': 'Michael Foord',
                  'location': 'Northampton',
                  'language': 'Python'}
        headers = {'User-Agent': user_agent}
        data = urllib.urlencode(values)

        try:
            req = urllib2.Request(url, data, headers)
            req_timeout = 5
            response = urllib2.urlopen(req, None, req_timeout)
            the_page = response.read()
            return ['200', the_page]
        except Exception, e:
            return [str(e), None]

    # 获取本期期数和号码
    def getCurrentPeriodsAndNumbers(self, rets):
        cur_number_of_periods = '-1'  # 当前期数
        cur_number = '-1'  # 当前号码

        for i in range(len(rets)):
            if i == 0:
                out = open(MySettings.period_data_file_path, 'wb')
            else:
                out = open(MySettings.period_data_file_path, 'a')

            soup = BeautifulSoup(rets[i][1], "lxml")
            tb_tags = soup.find_all(class_='tb')
            soup = BeautifulSoup(str(tb_tags), "lxml")
            td_tags = soup.find_all('td')

            cnt = 0
            for j in range(len(td_tags)):
                try:
                    pattern = re.compile(r'>[\d,]+,?<')
                    match = pattern.search(str(td_tags[j]))
                    a = str(match.group()).replace('>', '').replace('<', '').replace(',', ' ')
                    if len(a) > 10:
                        b = a.split(' ')
                        for k in range(len(b)):
                            if b[k][0] == '0':
                                b[k] = b[k][1]
                        a = ' '.join(b)
                    out.write(a + ' ')
                    if cnt % 2 == 1:
                        out.write('\n')
                    cnt += 1

                    if j == 0:
                        cur_number_of_periods = a
                    if j == 1:
                        cur_number = a
                except:
                    continue

            out.close()
        return cur_number_of_periods, cur_number

    # 获取第index球缩水后的要下注的号码
    def getDataForBall(self, index, lines):
        pass

    # 判断当前模式是QQG还是常规,TRUE是期期滚，FALSE是常规
    def isQQG(self):
        cnt = 0
        for i in self.all_ball_needToBetList:
            if i[3] == 1:
                cnt += 1
        logging.info("isQQG CNT = %s" % cnt)

        dic = {
            1: int(self.console.ball1_1_Entry.text()),
            2: int(self.console.ball1_2_Entry.text()),
            3: int(self.console.ball1_3_Entry.text()),
            4: int(self.console.ball1_4_Entry.text()),
            5: int(self.console.ball1_5_Entry.text()),
            6: int(self.console.ball1_6_Entry.text()),
            7: int(self.console.ball1_7_Entry.text()),
            8: int(self.console.ball1_8_Entry.text()),
            9: int(self.console.ball1_9_Entry.text()),
            10: int(self.console.ball1_10_Entry.text()),
        }
        all_cnt = 0
        for key, value in dic.items():
            if dic[key] == 1:
                all_cnt += 1
        return cnt < all_cnt
