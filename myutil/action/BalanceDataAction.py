# coding:utf-8
import copy
import logging

from PyQt4.QtCore import *
from PyQt4.QtGui import QTableWidgetItem, QColor

from myutil.MyTool import beautiful_log


class BalanceDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            # 过滤掉上期没数据的情况
            if not console_instance.all_ball_needToBetList:
                return

            for i in console_instance.all_ball_needToBetList:
                index = i[0]
                betlist = i[1]
                betflag = i[2]

                reverse_cnt = i[4]
                last_bet = i[5]
                re_last_bet = i[6]

                if console_instance.isLoseAdd == '0':  # 输加注
                    if console_instance.open_balls[index - 1] in betlist:  # 中了就删了
                        i[2] = 0
                        # 中了就重置[]
                        i[5] = []
                        i[4] = 0
                    else:
                        i[2] += 1
                        i[5] = copy.deepcopy(i[1])

                        # 根据reverse_flag，判断转不转
                        i[4] += 1
                else:  # 赢加注
                    if console_instance.open_balls[index - 1] in betlist:  # 中了加注
                        i[2] += 1
                        i[5] = copy.deepcopy(i[1])
                        i[4] += 1
                    else:
                        i[2] = 0
                        i[5] = []
                        i[4] = 0

                # 常规，更新下注数据
                if i[3] == 1:
                    i[1], i[6] = console_instance.updateNextBetData(index, None, i[4], i[5], i[6])

            # 更新下UI
            BalanceDataAction.update_ui(console_instance)
        except Exception, ex:
            logging.error(ex, exc_info=1)

    @staticmethod
    def update_ui(console_instance):
        try:
            c = QColor("darkgray")

            b = console_instance.all_ball_needToBetList
            row = console_instance.viewEntry.rowCount()
            for k in range(len(b)):
                if console_instance.isLoseAdd == '0':  # 输追加
                    if b[k][2] == 0:
                        newItem = QTableWidgetItem(u'中')
                        newItem.setBackgroundColor(c)
                        newItem.setTextColor(QColor(255, 0, 0, 127))
                    else:
                        newItem = QTableWidgetItem(u'不中')
                        newItem.setBackgroundColor(c)
                else:
                    if b[k][2] == 0:
                        newItem = QTableWidgetItem(u'不中')
                        newItem.setBackgroundColor(c)
                    else:
                        newItem = QTableWidgetItem(u'中')
                        newItem.setBackgroundColor(c)
                        newItem.setTextColor(QColor(255, 0, 0, 127))

                console_instance.viewEntry.setItem(row - len(b) + k, 6, newItem)
            logging.info(u"load data2 finish 结算完毕。。。")
        except Exception, ex:
            logging.error(ex, exc_info=1)
