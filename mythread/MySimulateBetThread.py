# #coding:utf-8
import json
import logging

from PyQt4 import QtCore
from PyQt4.QtCore import *


class MySimulateBetThread(QtCore.QThread):
    def __init__(self, console_instance):
        QtCore.QThread.__init__(self)
        self.console_instance = console_instance

    def run(self):
        try:
            from myaction.StartBetAction import MyStartBetAction
            from myaction.StartSimulateBetAction import MyStartSimulateBetAction

            logging.info(u"【模拟下注线程】线程run()中...")
            # 每一次开始，都会初始化历史数据，因为太重要了。。。
            up_limit = int(self.console_instance.up_limit_combobox.currentText())
            down_limit = int(self.console_instance.down_limit_combobox.currentText())
            self.console_instance.history_data = filter(lambda x: int(x[0]) < down_limit,
                                                        self.console_instance.simulate_data)
            with open('config/simulate_history.json', 'wb') as f:
                f.write(json.dumps(self.console_instance.history_data))

            # 截断模拟数据
            tmp_simulate_data = filter(lambda x: down_limit <= int(x[0]) <= up_limit,
                                       self.console_instance.simulate_data)
            logging.info(u"【模拟下注中】，截断数据后len=%s" % (len(tmp_simulate_data)))
            logging.info(u"【模拟下注中】，第一个=%s" % (tmp_simulate_data[0]))
            logging.info(u"【模拟下注中】，最后一个=%s" % (tmp_simulate_data[-1]))

            # 模拟当前timesnow + open_balls
            self.console_instance.timesnow = int(self.console_instance.history_data[0][0]) + 1
            self.console_instance.open_balls = self.console_instance.history_data[0][2:12]

            self.console_instance.simulate_money = 0
            for item in reversed(tmp_simulate_data):
                # 结算
                MyStartBetAction.do_balance(self.console_instance, simulate_mode=True)
                QMetaObject.invokeMethod(self.console_instance, "setSimulateMoney", Qt.QueuedConnection,
                                         Q_ARG(int, self.console_instance.simulate_money))
                MyStartBetAction.do_calculate(self.console_instance)
                QMetaObject.invokeMethod(self.console_instance, "loadTableData", Qt.QueuedConnection)

                # 把新的一期附带到history_data
                logging.info(u"【模拟下注中】附带%s->history_data" % item)
                assert isinstance(self.console_instance.history_data, list)
                self.console_instance.history_data.insert(0, item)
                self.console_instance.timesnow = int(item[0]) + 1
                self.console_instance.open_balls = item[2:12]

            # 最后一次结算
            MyStartBetAction.do_balance(self.console_instance, simulate_mode=True)
            QMetaObject.invokeMethod(self.console_instance, "setSimulateMoney", Qt.QueuedConnection,
                                         Q_ARG(int, self.console_instance.simulate_money))
            #with open('config/simulate_history.json', 'wb') as f:
            #    f.write(json.dumps(self.console_instance.history_data))
        except Exception, ex:
            logging.error(ex, exc_info=1)
