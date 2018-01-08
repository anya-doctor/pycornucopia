# coding:utf-8
import json
import logging

from PyQt4.QtCore import *
from PyQt4.QtGui import QComboBox, QTableWidgetItem

from myaction.StartBetAction import MyStartBetAction
from myutil.tool.MyTool import beautiful_log


class MyStartSimulateBetAction(object):
    @staticmethod
    @beautiful_log
    # 响应开始按钮
    def run(console_instance):
        assert isinstance(console_instance.isSimulate_combobox, QComboBox)
        if not console_instance.loginSuccessData:
            msgtitle = u"失败了"
            msg = u"请先登录，才能获取数据..."
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        elif not console_instance.isSimulate_combobox.currentIndex() == 1:  # 0正常，1模拟
            msgtitle = u"失败了"
            msg = u"请切换到模拟模式"
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        elif not console_instance.simulate_data:
            msgtitle = u"失败了"
            msg = u"请先载入历史数据，才能开始模拟..."
            QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))
        else:
            MyStartSimulateBetAction.for_start(console_instance)

    @staticmethod
    def for_start(console_instance):
        # 每一次开始，都会初始化历史数据，因为太重要了。。。
        up_limit = int(console_instance.up_limit_combobox.currentText())
        down_limit = int(console_instance.down_limit_combobox.currentText())
        console_instance.history_data = filter(lambda x: int(x[0]) < down_limit, console_instance.simulate_data)
        with open('config/simulate_history.json', 'wb') as f:
            f.write(json.dumps(console_instance.history_data))

        # 截断模拟数据
        tmp_simulate_data = filter(lambda x: down_limit <= int(x[0]) <= up_limit, console_instance.simulate_data)
        logging.info(u"【模拟下注中】，截断数据后len=%s" % (len(tmp_simulate_data)))
        logging.info(u"【模拟下注中】，第一个=%s" % (tmp_simulate_data[0]))
        logging.info(u"【模拟下注中】，最后一个=%s" % (tmp_simulate_data[-1]))

        # 模拟当前timesnow + open_balls
        console_instance.timesnow = int(console_instance.history_data[0][0]) + 1
        console_instance.open_balls = console_instance.history_data[0][2:12]

        console_instance.simulate_money = 0
        for item in reversed(tmp_simulate_data):
            # 结算
            MyStartBetAction.do_balance(console_instance, simulate_mode=True)

            console_instance.simulate_lb.setText(u"模拟赢钱：" + str(console_instance.simulate_money))

            MyStartBetAction.do_calculate(console_instance)
            console_instance.loadTableData()
            MyStartSimulateBetAction.simulate_bet(console_instance)

            # 把新的一期附带到history_data
            logging.info(u"【模拟下注中】附带%s->history_data" % item)
            assert isinstance(console_instance.history_data, list)
            console_instance.history_data.insert(0, item)
            console_instance.timesnow = int(item[0]) + 1
            console_instance.open_balls = item[2:12]

        # 最后一次结算
        MyStartBetAction.do_balance(console_instance, simulate_mode=True)
        console_instance.simulate_lb.setText(u"模拟赢钱：" + str(console_instance.simulate_money))
        with open('config/simulate_history.json', 'wb') as f:
            f.write(json.dumps(console_instance.history_data))

    @staticmethod
    def simulate_bet(console_instance):
        # 更新下注面板信息...
        cnt = 0
        logging.info(u"【下注结果界面】bet_list=%s" % console_instance.all_ball_needToBetList)

        for item in console_instance.all_ball_needToBetList:
            row = console_instance.viewEntry.rowCount()
            logging.info(u"【下注结果界面】row_count=%s,cnt=%s" % (row, cnt))
            newItem = QTableWidgetItem(u'已投注')
            newItem.setBackgroundColor(console_instance.c)
            console_instance.viewEntry.setItem((row - len(console_instance.all_ball_needToBetList) + cnt), 5, newItem)
            cnt += 1
