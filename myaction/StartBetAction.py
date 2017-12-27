# coding:utf-8
import copy
import logging

from PyQt4 import QtGui
from PyQt4.QtCore import *

from algorithm.MyDataGetter import MyDataGetter
from myutil.MyTool import beautiful_log


class MyStartBetAction(object):
    @staticmethod
    @beautiful_log
    # 响应开始按钮
    def run(console_instance):
        if console_instance.goBtn.text() == u'开始':
            # 删除定时器，清空资源...
            if console_instance.betTimer:
                del console_instance.betTimer

            console_instance.betTimer = QTimer()
            console_instance.betTimer.timeout.connect(lambda: MyStartBetAction.do_bet(console_instance))
            console_instance.betTimer.start(1000)
            console_instance.goBtn.setText(u'停止')
        else:
            if console_instance.betTimer != None:
                console_instance.betTimer.stop()
            console_instance.curP = '-1'
            console_instance.all_ball_needToBetList = []
            console_instance.goBtn.setText(u'开始')
            QtGui.QMessageBox.about(console_instance, u'请注意', u"已经停止，下注列表全部清空。")

    @staticmethod
    def do_bet(console_instance):
        try:
            console_instance.cur_money = int(console_instance.preBetDataDic['data']['win'])
            console_instance.timesnow = int(console_instance.preBetDataDic['data']['betnotice']['timesnow'])
            console_instance.timeclose = int(console_instance.preBetDataDic['data']['betnotice']['timeclose'])
            console_instance.timeopen = int(console_instance.preBetDataDic['data']['betnotice']['timeopen'])
            logging.info(u"当前金额=%s" % console_instance.cur_money)
            logging.info(u"当前期数=%s" % console_instance.timesnow)
            logging.info(u"当前剩余时间=%s" % console_instance.timeclose)
            logging.info(u"下局开始时间=%s" % console_instance.timeopen)

            # 判断止损条件
            logging.info(u"【赢损】损=%s,盈=%s,当前=%s" % (
                int(console_instance.lost_money_at), int(console_instance.earn_money_at), console_instance.cur_money))
            if not (int(console_instance.lost_money_at) < console_instance.cur_money < int(
                    console_instance.earn_money_at)):
                console_instance.goTimer.stop()
                logging.info(u"已停止达到赢损条件。")
                QtGui.QMessageBox.about(console_instance, u'已停止', u"达到赢损条件。")
                # 重新设置按钮文字...
                console_instance.goBtn.setText(u'开始')
            else:
                # 理论上触发一次就够了, 定时器关闭...
                console_instance.betTimer.stop()

                # 杀掉老的进程
                if console_instance.betThread and console_instance.betThread.isRunning():
                    logging.info(u"【下注中】老的betThread还在，杀死它...")
                    console_instance.betThread.quit()
                    console_instance.betThread.wait()

                # 至少留5秒的时候来
                if console_instance.timeclose < 5:
                    logging.info(u"【下注中】下注时间=%s,来不及了，重启下注定时器..." % console_instance.timeclose)
                    console_instance.betTimer.setInterval(console_instance.timeopen * 1000)
                else:
                    logging.info(u"【下注中】计算下注列表...")

                    logging.info(u"【下注中】开启下注线程...")
                    # 一旦开始了，就开始一次就行了
                    console_instance.betThread = MyDataGetter(console_instance, console_instance.curP,
                                                             console_instance.balls_bet_flag,
                                                             console_instance.balls_bet_amount,
                                                             console_instance.all_ball_needToBetList,
                                                             console_instance.first_n,
                                                             console_instance.change_flag, console_instance.is_bet_success1,
                                                             console_instance.is_bet_success2,
                                                             console_instance.reslist)
                    console_instance.betThread.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)
            console_instance.goTimer.start(3000)

    @staticmethod
    def do_balance(console_instance):
        """
        做好结算工作
            index = i[0]
            betlist = i[1]
            betflag = i[2]

            reverse_cnt = i[4]
            last_bet = i[5]
            re_last_bet = i[6]
        :param console_instance:
        :return:
        """

        if not console_instance.all_ball_needToBetList:  # 说明上期有数据
            return

        open_balls = console_instance.open_balls
        cur_ball_number = open_balls

        for i in console_instance.all_ball_needToBetList:
            index = i[0]
            betlist = i[1]
            if console_instance.console.isLoseAdd == '0':  # 输加注
                if cur_ball_number[index - 1] in betlist:  # 中了就删了
                    i[2] = 0
                    # 中了就重置[]
                    i[5] = []
                    i[4] = 0
                else:
                    i[2] += 1
                    i[5] = copy.deepcopy(i[1])
                    i[4] += 1  # 根据reverse_flag，判断转不转
            else:  # 赢加注
                if cur_ball_number[index - 1] in betlist:  # 中了加注
                    i[2] += 1
                    i[5] = copy.deepcopy(i[1])
                    i[4] += 1
                else:
                    i[2] = 0
                    i[5] = []
                    i[4] = 0

        # 通知控制台中或不中
        b = copy.deepcopy(console_instance.all_ball_needToBetList)
        QMetaObject.invokeMethod(console_instance, "loadTableData2", Q_ARG(list, b))

        if console_instance.isQQG == '0':
            # 期期滚- 过滤掉期期滚中了或者爆了的数据项
            console_instance.all_ball_needToBetList = filter(
                    lambda x: x[2] != 0 and x[2] != len(console_instance.balls_bet_amount), b)
        else:
            # 常规 - 重置那些被爆了的
            for i in console_instance.all_ball_needToBetList:
                if i[2] == len(console_instance.balls_bet_amount):
                    i[2] = 0  # 倍投
                    i[4] = 0  # reverse_cnt

    @staticmethod
    def do_calculate(console_instance):
        # 先清算上局数据，如果有的话...
        if console_instance.all_ball_needToBetList:
            MyStartBetAction.do_balance(console_instance)

        if not console_instance.all_ball_needToBetList:
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

