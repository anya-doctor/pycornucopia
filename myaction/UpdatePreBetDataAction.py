# coding:utf-8
import json
import logging

from PyQt4.QtCore import *
from PyQt4.QtGui import QPalette

from myaction.StartBetAction import MyStartBetAction
from myutil import MyTool
from myutil.MyTool import beautiful_log


class MyUpdatePreBetDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance, data_dict):
        try:
            logging.info(u"【控制台】更新预下注数据")
            console_instance.preBetDataDic = data_dict
            timesnow = console_instance.preBetDataDic['data']['betnotice']['timesnow']
            timeclose = console_instance.preBetDataDic['data']['betnotice']['timeclose']
            timeopen = console_instance.preBetDataDic['data']['betnotice']['timeopen']
            console_instance.open_balls = console_instance.preBetDataDic['data']['betnotice']['resultnum']

            # 稍微处理下开奖号码 "03" => "3"
            for index, ball in enumerate(console_instance.open_balls):
                if ball[0] == '0':
                    console_instance.open_balls[index] = ball[1]

            # 如果发现更新了期数，则开始结算..
            logging.info(u"【更新预下注数据】console_instance.timesnow=%s, timesnow=%s" % (console_instance.timesnow, timesnow))
            if int(console_instance.timesnow) == 0:
                # 更新期数, 这是第一次进来，只有初始化，没有结算
                if 0 < int(timesnow):
                    # 更新期数
                    console_instance.timesnow = timesnow
            else:
                # 更新期数，顺便结算...
                if int(console_instance.timesnow) == int(timesnow):
                    # 虽然期数相同，但是可以看看是否需要填充开奖结果，有些开奖结果很傻逼，最近一期是空的。。
                    if console_instance.history_data and console_instance.history_data[0][2] == "":
                        logging.info(u"【更新历史数据Action】虽然期数没更新，但开奖数据最近一期为空，填充之...")
                        # 更新数据
                        now_history_data = [int(v) for v in console_instance.open_balls]
                        now_history_data.insert(0, console_instance.history_data[0][1])
                        now_history_data.insert(0, console_instance.history_data[0][0])
                        console_instance.history_data[0] = now_history_data
                        # 更新UI
                        QMetaObject.invokeMethod(console_instance.parent, "completeHistoryResultData",
                                                 Qt.QueuedConnection,
                                                 Q_ARG(str, str(timesnow)), Q_ARG(list, console_instance.open_balls))

                elif int(console_instance.timesnow) < int(timesnow):
                    same_flag = True
                    for index, ball in enumerate(console_instance.history_data[0][2:12]):
                        if int(console_instance.open_balls[index]) != int(ball):
                            same_flag = False
                            break
                    if same_flag:
                        logging.info(u"【更新历史数据Action】虽然期数更新了，但數據還在結算中，等待...")
                        pass
                    else:
                        # 更新期数
                        console_instance.timesnow = timesnow
                        # 更新历史数据

                        logging.info(u"【更新历史数据】###########")
                        if console_instance.history_data and 'data' in console_instance.history_data:
                            now_history_data = [int(v) for v in console_instance.open_balls]
                            now_history_data.insert(0, MyTool.getCurrentTimeStr())
                            now_history_data.insert(0, str(int(console_instance.timesnow) - 1))

                            console_instance.history_data.insert(0, now_history_data)
                            with open('config/history.json', 'wb') as f:
                                f.write(json.dumps(console_instance.history_data))

                        QMetaObject.invokeMethod(console_instance.parent, "appendHistoryResultData",
                                                 Qt.QueuedConnection,
                                                 Q_ARG(str, str(timesnow)), Q_ARG(list, console_instance.open_balls))

                        # 开始下一局 写数据到Table 通知控制台下注
                        if console_instance.all_ball_needToBetList:
                            MyStartBetAction.for_start(console_instance)

            if 'win' in console_instance.preBetDataDic['data']:
                win = console_instance.preBetDataDic['data']['win']
            else:
                win = '???'

            logging.info("timesnow=%s" % timesnow)
            logging.info("timeclose=%s" % timeclose)
            logging.info("timeopen=%s" % timeopen)
            logging.info("win=%s" % win)
            logging.info("open_balls=%s" % console_instance.open_balls)

            # 顺便更新下控制台的UI
            console_instance.timeclose_label.setText(u'封盘：' + str(timeclose))
            console_instance.timeopen_label.setText(u'下局：' + str(timeopen))
            console_instance.qishu_label.setText(u'期数：' + str(timesnow))
            console_instance.open_balls_label.setText(u'开奖：' + str(" ".join(console_instance.open_balls)))

            pa = QPalette()
            pa.setColor(QPalette.WindowText, Qt.red)
            console_instance.win_label.setPalette(pa)
            if win == '???':
                console_instance.win_label.setText(u'赢钱：结算中')
            else:
                console_instance.win_label.setText(u'赢钱：' + str(win))

            # 如果在封盘期间，则把定时器弄长一点。。。
            if timeclose <= 0 and timeopen > 0:
                console_instance.getPreBetDatgaTimer.setInterval(timeopen * 1000)
            else:
                console_instance.getPreBetDatgaTimer.setInterval(10 * 1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)
