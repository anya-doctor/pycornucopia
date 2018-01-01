# coding:utf-8
import copy
import logging

from PyQt4 import QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import QComboBox

from common.common import BET_MODE_VERTICAL
from mythread import MyBetThread
from myutil.tool.MyTool import beautiful_log


class MyStartSimulateBetAction(object):
    @staticmethod
    @beautiful_log
    # 响应开始按钮
    def run(console_instance):
        if not console_instance.loginSuccessData:
            msgtitle = u"失败了"
            msg = u"请先登录，才能获取数据..."
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        elif not console_instance.simulate_data:
            msgtitle = u"失败了"
            msg = u"请先载入历史数据，才能开始模拟..."
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        else:
            if console_instance.simulateBtn.text() == u'开始模拟':
                assert isinstance(console_instance.up_limit_combobox, QComboBox)
                up_limit = str(console_instance.up_limit_combobox.currentText())
                down_limit = str(console_instance.down_limit_combobox.currentText())
                if up_limit < down_limit:
                    msgtitle = u"操作错误"
                    msg = u"上限期数必须大于等于下限期数"
                    QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                             Q_ARG(str, msg))
                else:
                    MyStartSimulateBetAction.for_start(console_instance)
                console_instance.simulateBtn.setText(u'停止模拟')

                if console_instance.getPreBetDatgaTimer:
                    logging.info(u"【模拟下注中】停掉获取预下注数据定时器...")
                    console_instance.getPreBetDatgaTimer.stop()
            else:
                console_instance.simulateBtn.setText(u'开始模拟')
                if console_instance.getPreBetDatgaTimer:
                    logging.info(u"【模拟下注中】开启获取预下注数据定时器...")
                    console_instance.getPreBetDatgaTimer.start(1000)
                    console_instance.getPreBetDatgaTimer.setinterval(10 * 1000)

    @staticmethod
    def for_start(console_instance):
        pass

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
                        MyStartSimulateBetAction.do_balance(console_instance)

                        # 计算需要下注的..
                        MyStartSimulateBetAction.do_calculate(console_instance)

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
        logging.info(u"【下注中】当前模式，console_instance.isQQG=%s" % console_instance.isQQG)
        logging.info(u"【下注中】当前模式，console_instance.isLoseAdd=%s" % console_instance.isLoseAdd)

        if not console_instance.all_ball_needToBetList:  # 说明上期有数据
            logging.info(u"【下注中】結算發現無下注列表，跳過結算環節...")
            return

        open_balls = console_instance.open_balls

        for item in console_instance.all_ball_needToBetList:
            # 更新期数
            item[1] = console_instance.timesnow

            if console_instance.isLoseAdd:  # 输加注
                logging.info(u"【下注中】结算進入輸追加模式...")
                win_flag = False
                for inner_item in item[3]:
                    logging.info(
                            u"【下注中】结算对比位置%s开奖%s == 下注球%s " % (inner_item[0], open_balls[inner_item[0]], inner_item[1]))
                    if int(open_balls[inner_item[0]]) == int(inner_item[1]):
                        logging.info(u"【下注中】结算发现中！！！")
                        win_flag = True
                        break

                if win_flag:
                    item[2] = 0
                else:
                    item[2] += 1
            else:
                logging.info(u"【下注中】進入赢追加模式...")
                pass

        # 通知控制台中或不中
        logging.info(u"【下注中】结算通知UI-2...")
        b = copy.deepcopy(console_instance.all_ball_needToBetList)
        QMetaObject.invokeMethod(console_instance, "loadTableData2", Q_ARG(list, b))

        if console_instance.isQQG:
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
        MyStartSimulateBetAction.do_calculate_helper(console_instance, BET_MODE_VERTICAL)

    @staticmethod
    def do_calculate_helper(console_instance, bet_mode=BET_MODE_VERTICAL):
        """
        目前只会垂直模式的下注，水平模式没灵感啊...
        :param console_instance:
        :param bet_mode:
        :return:
        """
        if bet_mode == BET_MODE_VERTICAL:
            # 如果下注列表為空則初始化
            logging.info(u"【下注中】下注列表為空，初始化...")
            if not console_instance.all_ball_needToBetList:
                for i in range(1, 11):
                    a, b = MyStartSimulateBetAction.verical_get_bet_list(console_instance, i)
                    if a:
                        # 组装  [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
                        c = [[i, v] for v in a]
                        console_instance.all_ball_needToBetList.append(
                                [console_instance.timesnow, console_instance.timesnow, 0, c])
            # 如果不為空
            else:
                # 如果是期期滾
                if console_instance.isQQG:
                    logging.info(u"【下注中】下注列表不為空，進入期期滾模式...")
                    for i in range(1, 11):
                        a, b = MyStartSimulateBetAction.verical_get_bet_list(console_instance, i)
                        if a:
                            # 组装  [timestart, timesnow, betflag, [[point, ball],[point, ball],...]],
                            c = [[i, v] for v in a]
                            console_instance.all_ball_needToBetList.append(
                                    [console_instance.timesnow, console_instance.timesnow, 0, c])
                # 如果是常規模式
                else:
                    logging.info(u"【下注中】下注列表不為空，進入常規模式...")
                    for item in console_instance.all_ball_needToBetList:
                        # 替換新的下注列表
                        index = item[3][0][0]
                        a, b = MyStartSimulateBetAction.verical_get_bet_list(console_instance, index)
                        if a:
                            c = [[index, v] for v in a]
                            item[3] = c
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

            bet_balls = [str(line[2])]
            ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            not_bet_balls = [v for v in ten_balls if v not in bet_balls]
            ret = bet_balls, not_bet_balls
            logging.info(u"【计算结果】下注=%s" % (ret[0]))
            return ret
        except Exception, ex:
            logging.error(ex, exc_info=1)