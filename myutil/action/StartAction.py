# coding:utf-8
import logging

from PyQt4 import QtGui
from PyQt4.QtCore import *

from algorithm.MyDataGetter import MyDataGetter
from myutil.MyTool import beautiful_log


class MyStartAction(object):
    @staticmethod
    @beautiful_log
    # 响应开始按钮
    def run(console_instance):
        if console_instance.goBtn.text() == u'开始':
            console_instance.goTimer = QTimer()
            console_instance.goTimer.timeout.connect(lambda: MyStartAction.do_start(console_instance))
            console_instance.goTimer.start(1000)
            console_instance.goBtn.setText(u'停止')
        else:
            if console_instance.goTimer != None:
                console_instance.goTimer.stop()
            if console_instance.betTimer != None:
                console_instance.betTimer.stop()
            console_instance.curP = '-1'
            console_instance.all_ball_needToBetList = []
            console_instance.goBtn.setText(u'开始')
            QtGui.QMessageBox.about(console_instance, u'请注意', u"已经停止，下注列表全部清空。")

    @staticmethod
    def do_start(console_instance):
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
                # 触发一次就够了, 定时器关闭...
                console_instance.goTimer.stop()

                # 杀掉老的进程
                if console_instance.goThread and console_instance.goThread.isRunning():
                    logging.info(u"老的goThread还在，杀死它...")
                    console_instance.goThread.quit()
                    console_instance.goThread.wait()

                # 至少留5秒的时候来
                if console_instance.timeclose < 5:
                    logging.info(u"下注时间来不及了...")
                    console_instance.goTimer.setInterval(console_instance.timeopen * 1000)

                # 一旦开始了，就开始一次就行了
                console_instance.goThread = MyDataGetter(console_instance, console_instance.curP,
                                                         console_instance.balls_bet_flag,
                                                         console_instance.balls_bet_amount,
                                                         console_instance.all_ball_needToBetList,
                                                         console_instance.first_n,
                                                         console_instance.change_flag, console_instance.is_bet_success1,
                                                         console_instance.is_bet_success2,
                                                         console_instance.reslist)
                console_instance.goThread.start()
        except Exception, ex:
            logging.error(ex, exc_info=1)
            console_instance.goTimer.start(3000)
