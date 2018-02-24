# pycornucopia
This is a gadget and lottery related, it can identify the verification code、 login、 automatic reconnection、 automatic betting and so on. With highly modular, UI module responsible for the interface and ACTION module interface landscaping, specifically responsible for triggering action in the THREAD module, responsible for time-consuming background operation, the BET module provides the possibility of diversified bet the CORE module provides custom algorithms.   
In one word, pycornucopia=AutoLogin+Bet+Refresh+Balance.

## Identify The Verification Code

With the help of next-generation verification code training tools and its AntiVC.dll, we train our own cds file, the usage is as follows:
```
def getCheckcode(self):
    dll = ctypes.windll.LoadLibrary('./config/AntiVC.dll')
    a = dll.LoadCdsFromFile('./config/your_checkcode.cds', 'your_pass')
    yzm = '99999'
    file = './config/checkcode.png'
    if a != -1:
        ttt = dll.GetVcodeFromFile(a, file, yzm)
        return yzm
    else:
        return 'error'
```

## AutoLogin

With the help of QTimer, we can periodically trigger the login logic, and close the QTimer once the login is successful.
```
# coding:utf-8
import logging

from PyQt4.QtCore import *

from mythread.MyLoginThread import MyLoginThread
from myutil.tool.MyTool import beautiful_log


class MyLoginAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot()
    def run(console_instance):
        """
        action run
        :param console_instance: the instance of class MyConsole...
        :return: 
        """
        try:
            logging.info(u"your press the login btn !!！")
            console_instance.loginTimer = QTimer()
            console_instance.loginTimer.timeout.connect(lambda: MyLoginAction.do_login(console_instance))
            console_instance.loginTimer.start(1000)
        except Exception, ex:
            logging.error(ex, exc_info=1)

    @staticmethod
    def do_login(console_instance):
        """
        the real logic deal with login
        :param console_instance: the instance of class MyConsole...
        :return: 
        """
        console_instance.loginThread = MyLoginThread(console_instance.parent.overlay, console_instance)
        console_instance.loginThread.start()

        logging.info(u"QTimer setInterval= 15 seconds")
        console_instance.loginTimer.setInterval(15 * 1000)

class MyConsole(QWidget):
    @pyqtSlot(dict)
    def onLoginSuccess(self, loginSuccessData):
        """
        login success callback
        :param loginSuccessData: login dict
        :return: 
        """
        if self.loginTimer:
            logging.info(u"stop the timer")
            self.loginTimer.stop()
        if self.loginThread:
            logging.info(u"kill the thread")
            self.loginThread.quit()
            self.loginThread.wait()

        self.loginBtn.setEnabled(False)

```
Other timing logic in the project is mostly like the AutoLogin...

## Simulation mode
This is a very pioneering features that can simulate the advantages and disadvantages of offline state, with this feature, but also greatly improve the development efficiency, because the real data refresh takes 10 minutes, and in this mode, It only takes 1 second.   
The following is a simplified code:
```
# #coding:utf-8
import copy
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

            up_limit = int(self.console_instance.up_limit_combobox.currentText())
            down_limit = int(self.console_instance.down_limit_combobox.currentText())
            self.console_instance.history_data = filter(lambda x: int(x[0]) < down_limit,
                                                        self.console_instance.simulate_data)
            with open('config/simulate_history.json', 'wb') as f:
                f.write(json.dumps(self.console_instance.history_data))

            # cut the simulation data
            tmp_simulate_data = filter(lambda x: down_limit <= int(x[0]) <= up_limit,
                                       self.console_instance.simulate_data)
            logging.info(u"【Simulation mode】，after cut the data, len = %s" % (len(tmp_simulate_data)))
            logging.info(u"【Simulation mode】，first item = %s" % (tmp_simulate_data[0]))
            logging.info(u"【Simulation mode】，last item = %s" % (tmp_simulate_data[-1]))

            # simulation current timesnow + open_balls
            self.console_instance.timesnow = int(self.console_instance.history_data[0][0]) + 1
            self.console_instance.open_balls = self.console_instance.history_data[0][2:12]

            self.console_instance.simulate_money = 0
            for item in reversed(tmp_simulate_data):
                # balance everytime
                MyStartBetAction.do_balance(self.console_instance, simulate_mode=True)
                QMetaObject.invokeMethod(self.console_instance, "setSimulateMoney", Qt.QueuedConnection,
                                         Q_ARG(int, self.console_instance.simulate_money))
                MyStartBetAction.do_calculate(self.console_instance)
                b = copy.deepcopy(self.console_instance.all_ball_needToBetList)
                QMetaObject.invokeMethod(self.console_instance, "loadTableData", Qt.QueuedConnection, Q_ARG(list, b))
                QThread.msleep(10)
                # 
                logging.info(u"【Simulation mode】%s->history_data" % item)
                assert isinstance(self.console_instance.history_data, list)
                self.console_instance.history_data.insert(0, item)
                self.console_instance.timesnow = int(item[0]) + 1
                self.console_instance.open_balls = item[2:12]

            # last balance
            MyStartBetAction.do_balance(self.console_instance, simulate_mode=True)
            QMetaObject.invokeMethod(self.console_instance, "setSimulateMoney", Qt.QueuedConnection,
                                     Q_ARG(int, self.console_instance.simulate_money))
        except Exception, ex:
            logging.error(ex, exc_info=1)

```

## Core Module
The algorithm module only needs to calculate the number that needs to be bet currently.
```
# coding=utf-8
import logging

# Control gambling method is vertical mode, or horizontal mode! ! !
vertical_mode = False

# Control the need to track the flow of orders!
record_list_mode = False


def get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)

        # Skip n period
        lines = console_instance.history_data
        line = lines[int(console_instance.first_n)]
        balls = line[2:12]
        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

        dic = {
            1:  str(console_instance.ball1_1_Entry.text()).split('-'),
            2:  str(console_instance.ball2_1_Entry.text()).split('-'),
            3:  str(console_instance.ball3_1_Entry.text()).split('-'),
            4:  str(console_instance.ball4_1_Entry.text()).split('-'),
            5:  str(console_instance.ball5_1_Entry.text()).split('-'),
            6:  str(console_instance.ball6_1_Entry.text()).split('-'),
            7:  str(console_instance.ball7_1_Entry.text()).split('-'),
            8:  str(console_instance.ball8_1_Entry.text()).split('-'),
            9:  str(console_instance.ball9_1_Entry.text()).split('-'),
            10:  str(console_instance.ball10_1_Entry.text()).split('-'),
        }
        ball = balls[bet_index - 1]
        bet_balls = [[int(v), ball] for v in dic[bet_index]]

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(u"【Core】bet_balls=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)

```

what a fun tool...
