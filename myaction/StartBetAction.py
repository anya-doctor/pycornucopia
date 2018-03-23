# coding:utf-8
import copy
import logging

from PyQt4 import QtGui
from PyQt4.QtCore import *

from bet import vertical_mode, horizontal_mode
from common import common
from core import MyAlgorithm
from mythread import MyBetThread
from myutil.tool.MyTool import beautiful_log


class MyStartBetAction(object):
    @staticmethod
    @beautiful_log
    # 响应开始按钮
    def run(console_instance, repair_mode=False):
        if not console_instance.loginSuccessData:
            msgtitle = u"失败了"
            msg = u"请先登录，才能获取数据..."
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        elif console_instance.isSimulate_combobox.currentIndex() == 1:
            msgtitle = u"失败了"
            msg = u"请切换到正常模式"
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        else:
            if console_instance.goBtn.text() == u'开始':
                MyStartBetAction.for_start(console_instance, repair_mode)
                console_instance.goBtn.setText(u'停止')
            else:
                if console_instance.betTimer != None:
                    console_instance.betTimer.stop()
                console_instance.timesnow = 0
                console_instance.all_ball_needToBetList = []
                console_instance.goBtn.setText(u'开始')
                QtGui.QMessageBox.about(console_instance, u'请注意', u"已经停止，下注列表全部清空。")

    @staticmethod
    def for_start(console_instance, repair_mode=False):
        # 删除定时器，清空资源...
        if console_instance.betTimer:
            del console_instance.betTimer

        console_instance.betTimer = QTimer()
        console_instance.betTimer.timeout.connect(lambda: MyStartBetAction.do_bet(console_instance, repair_mode))
        console_instance.betTimer.start(1000)

    @staticmethod
    def do_bet(console_instance, repair_mode=False):
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
                    console_instance.lost_money_at, console_instance.earn_money_at, console_instance.cur_money))
                if not (console_instance.lost_money_at < console_instance.cur_money < console_instance.earn_money_at):
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
                        logging.info(u"【下注中】下注时间 timeclose=%s,来不及了，重启下注定时器..." % console_instance.timeclose)
                        logging.info(u"【下注中】下注时间 timeopen=%s" % console_instance.timeopen)
                        console_instance.betTimer.start(abs(console_instance.timeopen) * 1000)
                    else:
                        logging.info(u"【下注中】计算下注列表...")
                        if not repair_mode:
                            # 先清算上局数据，如果有的话...
                            if int(console_instance.pauseBet_combobox.currentIndex()) == 2:
                                MyStartBetAction.do_balance(console_instance, simulate_mode=True)
                                console_instance.setSimulateMoney(console_instance.simulate_money)
                            else:
                                MyStartBetAction.do_balance(console_instance)

                            # 计算需要下注的..
                            MyStartBetAction.do_calculate(console_instance)

                        # 先弄界面
                        b = copy.deepcopy(console_instance.all_ball_needToBetList)
                        console_instance.loadTableData(b)

                        logging.info(u"【下注中】开启下注线程...")
                        # 一旦开始了，就开始一次就行了

                        if int(console_instance.pauseBet_combobox.currentIndex()) == 2:
                            logging.info(u"【下注中】本期%s处于模拟下注模式！！不下注咯.." % console_instance.timesnow)
                            console_instance.is_bet_success = False
                            # UI跟上，填写：放弃投注...
                            b = copy.deepcopy(console_instance.all_ball_needToBetList)
                            console_instance.loadTableData3(b, mode=2)
                        elif int(console_instance.pauseBet_combobox.currentIndex()) == 1:
                            logging.info(u"【下注中】本期%s处于暂停下注模式！！不下注咯.." % console_instance.timesnow)
                            console_instance.is_bet_success = False
                            # UI跟上，填写：放弃投注...
                            b = copy.deepcopy(console_instance.all_ball_needToBetList)
                            console_instance.loadTableData3(b, mode=1)
                        else:
                            logging.info(u"【下注中】本期%s处于正常下注模式！下注咯.." % console_instance.timesnow)
                            console_instance.betThread = MyBetThread.MyBetDataThread(console_instance,
                                                                                     console_instance.all_ball_needToBetList,
                                                                                     console_instance.preBetDataDic[
                                                                                         'data']['integrate'])
                            console_instance.betThread.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)
            console_instance.betTimer.start(3000)

    @staticmethod
    def do_balance(console_instance, simulate_mode=False):
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
        logging.info(u"【下注中-结算】当前模式，console_instance.isQQG=%s" % console_instance.isQQG)
        logging.info(u"【下注中-结算】当前模式，console_instance.isLoseAdd=%s" % console_instance.isLoseAdd)

        if not console_instance.all_ball_needToBetList:  # 说明上期有数据
            logging.info(u"【下注中-结算】結算發現無下注列表，跳過結算環節...")
            return

        open_balls = console_instance.open_balls

        logging.info("open_balls=%s" % open_balls)
        for item in console_instance.all_ball_needToBetList:
            logging.info("item=%s" % item)
            # 如果本item没有下注的list，则跳过
            if not item[3]:
                continue

            win_flag = False
            tmp_win_cnt = 0
            for inner_item in item[3]:
                if int(open_balls[inner_item[0] - 1]) == int(inner_item[1]):
                    logging.info(u"【下注中-结算】结算对比位置%s开奖%s == 下注球%s 结算发现中！！！" % (
                        inner_item[0], open_balls[inner_item[0] - 1], inner_item[1]))
                    tmp_win_cnt += 1

                    if simulate_mode:
                        console_instance.simulate_money -= int(console_instance.balls_bet_amount[item[2]])
                        console_instance.simulate_money += int(
                                console_instance.balls_bet_amount[item[2]]) * 9.91
                else:
                    if simulate_mode:
                        console_instance.simulate_money -= int(console_instance.balls_bet_amount[item[2]])

            # 兼容老版本算法，如果没有win_ping_dic，默认是给一个大众标准，中一个算赢，就是不考虑组合赢
            if console_instance.play_mode == common.PLAYMODE_CQSSC and not hasattr(MyAlgorithm, "win_ping_dic"):
                MyAlgorithm.win_ping_dic = common.win_ping_ssc_dic
            elif console_instance.play_mode == common.PLAYMODE_PK10 and not hasattr(MyAlgorithm, "win_ping_dic"):
                MyAlgorithm.win_ping_dic = common.win_ping_pk_dic

            if console_instance.isLoseAdd:  # 输加注
                if tmp_win_cnt >= MyAlgorithm.win_ping_dic[len(item[3])]['win_cnt']:
                    item[2] = 0
                    item[7] = u'中'
                    win_flag = True
                elif tmp_win_cnt == MyAlgorithm.win_ping_dic[len(item[3])]['ping_cnt']:
                    item[7] = u'平'
                else:
                    item[2] += 1
                    item[7] = u'不中'
            elif not console_instance.isLoseAdd:
                if tmp_win_cnt >= MyAlgorithm.win_ping_dic[len(item[3])]['win_cnt']:
                    item[2] += 1
                    item[7] = u'中'
                    win_flag = True
                elif tmp_win_cnt == MyAlgorithm.win_ping_dic[len(item[3])]['ping_cnt']:
                    item[7] = u'平'
                else:
                    item[2] = 0
                    item[7] = u'不中'

            # 补充record_list
            if hasattr(MyAlgorithm, "record_list_mode") and MyAlgorithm.record_list_mode:
                x = copy.deepcopy(item[3])
                x.append(win_flag)
                item[6].append(x)

            logging.info("item=%s" % item)

        # 通知控制台中或不中
        logging.info(u"【下注中-结算】结算通知UI-2...")
        b = copy.deepcopy(console_instance.all_ball_needToBetList)
        table_row_num = console_instance.viewEntry.rowCount()
        console_instance.loadTableData2(b, table_row_num)

        if console_instance.isQQG:
            # 期期滚- 过滤掉期期滚中了或者爆了的数据项
            console_instance.all_ball_needToBetList = filter(
                    lambda x: (x[7] != u'中') and (item[2] < len(console_instance.balls_bet_amount)),
                    console_instance.all_ball_needToBetList)
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
        # 如果老一辈的算法没有vertical_mode，默认都是垂直模式！
        # 如果有vertical_mode，那么判断是否是True
        if not hasattr(MyAlgorithm, "vertical_mode") or MyAlgorithm.vertical_mode:
            vertical_mode.run(console_instance)
        else:
            horizontal_mode.run(console_instance)
