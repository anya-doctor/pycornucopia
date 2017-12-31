# coding:utf-8
import copy
import logging

from PyQt4 import QtGui
from PyQt4.QtCore import *

from common.common import BET_MODE_VERTICAL
from mythread import MyBetThread
from myutil.MyTool import beautiful_log


class MyStartBetAction(object):
    @staticmethod
    @beautiful_log
    # 响应开始按钮
    def run(console_instance):
        if console_instance.goBtn.text() == u'开始':
            MyStartBetAction.for_start(console_instance)
            console_instance.goBtn.setText(u'停止')
        else:
            if console_instance.betTimer != None:
                console_instance.betTimer.stop()
            console_instance.curP = '-1'
            console_instance.all_ball_needToBetList = []
            console_instance.goBtn.setText(u'开始')
            QtGui.QMessageBox.about(console_instance, u'请注意', u"已经停止，下注列表全部清空。")

    @staticmethod
    def for_start(console_instance):
        # 删除定时器，清空资源...
        if console_instance.betTimer:
            del console_instance.betTimer

        console_instance.betTimer = QTimer()
        console_instance.betTimer.timeout.connect(lambda: MyStartBetAction.do_bet(console_instance))
        console_instance.betTimer.start(1000)

    @staticmethod
    def do_bet(console_instance):
        try:
            if 'win' not in console_instance.preBetDataDic['data']:
                logging.info(u"【下注中】還在結算階段，拿不到最新數據，等待之...")
                console_instance.betTimer.setInterval(5 * 1000)
            else:
                console_instance.cur_money = int(console_instance.preBetDataDic['data']['win'].replace(',', ''))
                console_instance.timesnow = int(console_instance.preBetDataDic['data']['betnotice']['timesnow'])
                console_instance.timeclose = int(console_instance.preBetDataDic['data']['betnotice']['timeclose'])
                console_instance.timeopen = int(console_instance.preBetDataDic['data']['betnotice']['timeopen'])
                logging.info(u"当前金额=%s" % console_instance.cur_money)
                logging.info(u"当前期数=%s" % console_instance.timesnow)
                logging.info(u"当前剩余时间=%s" % console_instance.timeclose)
                logging.info(u"下局开始时间=%s" % console_instance.timeopen)

                # 判断止损条件
                logging.info(u"【赢损】设置损=%s,设置盈=%s,当前=%s" % (
                    int(console_instance.lost_money_at), int(console_instance.earn_money_at),
                    console_instance.cur_money))
                if not (int(console_instance.lost_money_at) < console_instance.cur_money < int(
                        console_instance.earn_money_at)):
                    console_instance.betTimer.stop()
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
                        console_instance.betTimer.start(console_instance.timeopen * 1000)
                    else:
                        logging.info(u"【下注中】计算下注列表...")
                        # 先清算上局数据，如果有的话...
                        MyStartBetAction.do_balance(console_instance)

                        # 计算需要下注的..
                        MyStartBetAction.do_calculate(console_instance)

                        # 先弄界面
                        console_instance.loadTableData()

                        logging.info(u"【下注中】开启下注线程...")
                        # 一旦开始了，就开始一次就行了
                        console_instance.betThread = MyBetThread.MyBetDataThread(console_instance)
                        console_instance.betThread.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)
            console_instance.betTimer.start(3000)

    @staticmethod
    def do_balance(console_instance):
        """
        做好结算工作
        all_ball_needToBetList = [
                    [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
                    [],
                    ...
                ]
        :param console_instance:
        :return:
        """

        if not console_instance.all_ball_needToBetList:  # 说明上期有数据
            return

        open_balls = console_instance.open_balls

        for item in console_instance.all_ball_needToBetList:
            # 更新期数
            item[1] = console_instance.timesnow

            if console_instance.isLoseAdd == '0':  # 输加注
                win_flag = False
                for inner_item in item[3]:
                    if int(open_balls[inner_item[0]]) == int(inner_item[1]):
                        win_flag = True
                        break

                if win_flag:
                    item[2] = 0
                else:
                    item[2] += 1

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

    @staticmethod
    def do_calculate(console_instance):
        """
        all_ball_needToBetList = [
            [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
            [],
            ...
        ]
        :param console_instance:
        :return:
        """
        # 先不考虑期期滚
        MyStartBetAction.do_calculate_helper(console_instance, BET_MODE_VERTICAL)

    @staticmethod
    def do_calculate_helper(console_instance, bet_mode=BET_MODE_VERTICAL):
        """
        目前只会垂直模式的下注，水平模式没灵感啊...
        :param console_instance:
        :param bet_mode:
        :return:
        """
        if bet_mode == BET_MODE_VERTICAL:
            for i in range(1, 11):
                a, b = MyStartBetAction.verical_get_bet_list(console_instance, i)
                if a:
                    # 组装  [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
                    c = [[i, v] for v in a]
                    console_instance.all_ball_needToBetList.append(
                            [console_instance.timesnow, console_instance.timesnow, 0, c])
        else:
            pass

    @staticmethod
    def verical_get_bet_list(console_instance, bet_index):
        try:
            logging.info(u"【下注中】垂直模式：位置=%s" % bet_index)
            # 某些号码不想要
            dic = {
                1: int(console_instance.ball1_1_Entry.text()),
                2: int(console_instance.ball1_2_Entry.text()),
                3: int(console_instance.ball1_3_Entry.text()),
                4: int(console_instance.ball1_4_Entry.text()),
                5: int(console_instance.ball1_5_Entry.text()),
                6: int(console_instance.ball1_6_Entry.text()),
                7: int(console_instance.ball1_7_Entry.text()),
                8: int(console_instance.ball1_8_Entry.text()),
                9: int(console_instance.ball1_9_Entry.text()),
                10: int(console_instance.ball1_10_Entry.text()),
            }
            if dic[bet_index] == 0:
                return [], []

            # 舍弃N期
            lines = console_instance.history_data
            line = lines[int(console_instance.first_n)]

            bet_balls = [str(line[2]), str(line[3])]
            ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            not_bet_balls = [v for v in ten_balls if v not in bet_balls]
            ret = bet_balls, not_bet_balls
            logging.info(u"【计算结果】下注=%s" % (ret[0]))
            return ret
        except Exception, ex:
            logging.error(ex, exc_info=1)
