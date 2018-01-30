# coding:utf-8
import copy
import json
import logging

from PyQt4.QtCore import *
from PyQt4.QtGui import QPalette
from myaction.GetHistoryResultDataAction import MyGetHistoryResultDataAction
from myaction.StartBetAction import MyStartBetAction
from myutil.tool import MyTool
from myutil.tool.MyTool import beautiful_log


class MyUpdatePreBetDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance, data_dict):
        try:
            console_instance.preBetDataDic = data_dict
            timesnow = console_instance.preBetDataDic['data']['betnotice']['timesnow']
            timeclose = console_instance.preBetDataDic['data']['betnotice']['timeclose']
            timeopen = console_instance.preBetDataDic['data']['betnotice']['timeopen']
            console_instance.open_balls = console_instance.preBetDataDic['data']['betnotice']['resultnum']

            logging.info(u"【更新预下注数据】timesnow=%s, console_instance.timesnow=%s" % (timesnow, console_instance.timesnow))
            logging.info(u"【更新预下注数据】timeclose=%s" % timeclose)
            logging.info(u"【更新预下注数据】timeopen=%s" % timeopen)
            logging.info(u"【更新预下注数据】open_balls=%s" % console_instance.open_balls)
            logging.info(u"【更新预下注数据】win=%s" % (data_dict['data']['win'] if 'win' in data_dict['data'] else 'NULL'))
            logging.info(u"【更新预下注数据】历史最新一期=%s" % (
                console_instance.history_data[0][0] if console_instance.history_data and len(
                    console_instance.history_data) > 0 else 'NULL'))

            # 稍微处理下开奖号码 "03" => "3"
            for index, ball in enumerate(console_instance.open_balls):
                if ball[0] == '0':
                    console_instance.open_balls[index] = ball[1]

            # 历史数据很重要啊！！！
            if int(console_instance.timesnow) == 0:  # 如果发现更新了期数，则开始结算..
                # 更新期数, 这是第一次进来，只有初始化，没有结算
                if 0 < int(timesnow):
                    # 更新期数
                    console_instance.timesnow = timesnow
                # 在稳定且时间区间正确的情况下，解开开始按钮的封印
                if 'win' in console_instance.preBetDataDic['data'] and int(timeclose) > 0 and int(timeopen) > 0:
                    if console_instance.goBtn.isEnabled() == False:
                        logging.info(u"【更新预下注数据】在稳定且时间区间正确的情况下-1，解开开始按钮的封印...")
                        console_instance.goBtn.setEnabled(True)

            elif int(console_instance.timesnow) > 0 and not console_instance.history_data:
                logging.error(u"【更新预下注数据】因为某种原因历史数据=NULL, 重启获取历史数据定时器..")
                MyGetHistoryResultDataAction.run(console_instance)
            elif 'win' not in console_instance.preBetDataDic['data']:
                logging.info(u"【更新预下注数据】還在結算階段-1，拿不到最新數據，等待之...")
            elif int(timesnow) - int(console_instance.timesnow) == 1 and \
                            [int(v) for v in console_instance.open_balls] == console_instance.history_data[0][2:12]:
                logging.info(u"【更新预下注数据】還在結算階段-2，拿不到最新數據，等待之...")
                logging.info(u"【更新预下注数据】不可能连续两期完全开奖相同的吧...")
            elif console_instance.history_data and int(timesnow) - int(console_instance.history_data[0][0]) >= 3:
                # 假设现在 timesnow = console_instance.timesnow = 661167，此时历史数据最新 = 661166
                # 在某个时刻，正在结算中，可能只要10秒吧，timesnow=661168，但是历史数据还是 661166
                # 所以是存在int(timesnow) - int(console_instance.history_data[0][0]) >= 2
                # 等结算完成，稳定在timesnow=661168, console_instance.timesnow = 661167， 历史数据最新 = 661166
                logging.info(
                    u"【更新预下注数据】断层，timesnow=%s, console_instance.timesnow=%s, 历史数据最新=%s断层了，重新获取一份..." % (
                        timesnow, console_instance.timesnow, console_instance.history_data[0][0]))
                MyGetHistoryResultDataAction.run(console_instance)
            else:
                # 在稳定且时间区间正确的情况下，解开开始按钮的封印
                if 'win' in console_instance.preBetDataDic['data'] and int(timeclose) > 0 and int(timeopen) > 0:
                    if console_instance.goBtn.isEnabled() == False:
                        logging.info(u"【更新预下注数据】在稳定且时间区间正确的情况下-2，解开开始按钮的封印...")
                        console_instance.goBtn.setEnabled(True)

                # 进来这里都是稳定的数据了，不存在什么结算啊，之类的...
                # 更新期数，顺便结算...
                if int(console_instance.timesnow) == int(timesnow):
                    pass
                elif int(timesnow) - int(console_instance.timesnow) == 1:  # 好的最新一期的更新
                    logging.info(u"【更新预下注数据】稳定的数据，走正常流程...")

                    # 更新历史数据
                    now_history_data = [int(v) for v in console_instance.open_balls]
                    now_history_data.insert(0, MyTool.getCurrentTimeStr())
                    now_history_data.insert(0, str(int(console_instance.timesnow)))
                    if int(console_instance.history_data[0][0]) == int(console_instance.timesnow):
                        logging.info(u"【更新预下注数据】历史最新=%s，console_instance.timesnow=%s, 更新历史数据发现有同一期但为空的数据，置换之..." % (
                            console_instance.history_data[0][0], console_instance.timesnow))
                        console_instance.history_data[0] = now_history_data
                        logging.info(console_instance.history_data[0])
                        logging.info(console_instance.history_data[1])
                        # 顺便要更新下UI结果面板...
                        b = copy.deepcopy(console_instance.history_data)
                        console_instance.parent.updateHistoryResultData(b)
                    elif int(console_instance.history_data[0][0]) == int(console_instance.timesnow) - 1:
                        logging.info(u"【更新预下注数据】历史最新=%s，console_instance.timesnow=%s, 更新历史数据, 增加之..." % (
                            console_instance.history_data[0][0], console_instance.timesnow))
                        console_instance.history_data.insert(0, now_history_data)

                        QMetaObject.invokeMethod(console_instance.parent, "appendHistoryResultData",
                                                 Qt.QueuedConnection,
                                                 Q_ARG(str, str(timesnow)),
                                                 Q_ARG(list, console_instance.open_balls))
                    else:
                        logging.error(
                            u"【更新预下注数据】什么情况！！！timesnow=%s, console_instance.timesnow=%s,历史最新=%s，更新历史数据,遇到意外！！！" % (
                                timesnow, console_instance.timesnow, console_instance.history_data[0][0]))
                        raise Exception

                    # 更新期数
                    console_instance.timesnow = timesnow

                    with open('config/history.json', 'wb') as f:
                        f.write(json.dumps(console_instance.history_data))

                    # 开始下一局 写数据到Table 通知控制台下注
                    if console_instance.all_ball_needToBetList:
                        MyStartBetAction.for_start(console_instance)
                elif int(timesnow) - int(console_instance.timesnow) >= 2:  # 好的，说明中间有断层
                    """
                        一旦进来这里，就说明断层开始。
                        假设之前：timesnow=661167, console.timesnow=661167， 历史最新一期=661166
                        然后断线1期后恢复：
                        此时此刻，timesnow=661168, console.timesnow=661167, 历史最新一期=661168（因为历史数据在进来那一瞬间就更新了）
                        如果是断线2期后恢复：
                        此时此刻，timesnow=661169, console.timesnow=661167, 历史最新一期=661169（因为历史数据在进来那一瞬间就更新了）
                        ...

                    """
                    logging.error(u"【更新预下注数据】%s-%s>1说明有断层现象.." % (timesnow, console_instance.timesnow))
                    # 第1步，把UI的空白补上
                    logging.error(u"【更新预下注数据】补上UI空白..")

                    cnt = int(timesnow) - int(console_instance.timesnow)
                    begin_timesnow = int(console_instance.timesnow)
                    logging.error(u"【更新预下注数据】cnt=%s" % cnt)

                    for i in range(cnt + 1):
                        cur_timesnow = int(begin_timesnow) + i
                        logging.error(u"【更新预下注数据】当前处理期数=%s" % (cur_timesnow))
                        if int(cur_timesnow) == int(begin_timesnow):
                            # 开奖信息
                            cur_openballs = filter(lambda x: int(x[0]) == int(cur_timesnow),
                                                   console_instance.history_data)
                            logging.info(u"第一期，######%s" % cur_openballs)
                            MyStartBetAction.do_balance(console_instance)  # 结算一次...
                            console_instance.timesnow = cur_timesnow + 1
                            MyStartBetAction.do_calculate(console_instance)  # 计算需要下注的..

                            b = copy.deepcopy(console_instance.all_ball_needToBetList)
                            console_instance.loadTableData(b)
                        elif int(cur_timesnow) < int(timesnow):
                            # 开奖信息
                            cur_openballs = filter(lambda x: int(x[0]) == int(cur_timesnow),
                                                   console_instance.history_data)
                            logging.info(u"第2期，######%s" % cur_openballs)
                            cur_openballs = cur_openballs[0][2:12]

                            console_instance.open_balls = cur_openballs
                            logging.error(u"【更新预下注数据】阶段-1，开奖结算UI，开奖结果=%s" % (cur_openballs))

                            MyStartBetAction.do_balance(console_instance)  # 结算一次...
                            console_instance.timesnow = cur_timesnow + 1
                            MyStartBetAction.do_calculate(console_instance)  # 计算需要下注的..
                            b = copy.deepcopy(console_instance.all_ball_needToBetList)
                            console_instance.loadTableData(b)
                            console_instance.is_bet_success = False  # 未下注成功的...
                        else:
                            logging.error(u"【更新预下注数据】阶段-2，触发下注...")
                            console_instance.onRetBetHidenBtn(console_instance.all_ball_needToBetList,
                                                              console_instance.preBetDataDic['data']['integrate'])

            if 'win' in console_instance.preBetDataDic['data']:
                win = console_instance.preBetDataDic['data']['win']
            else:
                win = '???'

            # 顺便更新下控制台的UI
            console_instance.timeclose_label.setText(u'封盘：' + str(timeclose))
            console_instance.timeopen_label.setText(u'下局：' + str(timeopen))
            console_instance.qishu_label.setText(u'期数：' + str(timesnow))
            console_instance.open_balls_label.setText(
                u'开奖：' + str(" ".join([str(v) for v in console_instance.open_balls])))

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
            logging.error("timesnow=%s" % timesnow)
            logging.error("timeclose=%s" % timeclose)
            logging.error("timeopen=%s" % timeopen)
            logging.error("open_balls=%s" % console_instance.open_balls)
