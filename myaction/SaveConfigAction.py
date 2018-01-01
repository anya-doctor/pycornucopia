# coding:utf-8
import logging
import os
import sqlite3

from PyQt4 import QtGui
from PyQt4.QtCore import *

from common import MySettings
from myutil.tool.MyTool import beautiful_log


class MySaveConfigAction(object):
    # 响应保存按钮
    @staticmethod
    @beautiful_log
    def run(console_instance):
        try:
            lines = console_instance.linesEntry.toPlainText()
            lines = lines.replace('\n', ' ')
            lines_list = []
            for i in lines.split(' '):
                lines_list.append(str(i))
            lines = ' '.join(lines_list)

            username = console_instance.userEntry.text()
            password = console_instance.passEntry.text()
            betAmount = console_instance.betAmountEntry.text()
            earn_money_at = console_instance.earnMoneyAtEntry.text()
            lost_money_at = console_instance.lostMoneyAtEntry.text()
            register_code = console_instance.nameEntry.text()
            first_n = console_instance.first_n_Entry.text()
            isQQG = True if int(console_instance.isQQG_combobox.currentIndex()) == 0 else False
            isLoseAdd = True if int(console_instance.isLoseAdd_combobox.currentIndex()) == 0 else False

            # 实时更改
            console_instance.balls_bet_amount = betAmount.split('-')
            console_instance.first_n = int(first_n)
            console_instance.earn_money_at = earn_money_at
            console_instance.lost_money_at = lost_money_at
            console_instance.username = username
            console_instance.password = password
            console_instance.lines = lines.split(' ')
            console_instance.isQQG = isQQG
            console_instance.isLoseAdd = isLoseAdd

            if not os.path.exists('./config/cqssc.db'):
                QtGui.QMessageBox.about(console_instance, u'错误', u"数据库文件不存在...请重新打开软件.")
                logging.info(u"数据库文件不存在...请重新打开软件.")
                return

            cqssc_db = sqlite3.connect(MySettings.db_file_path)
            sql = u"update config set lines = '" + lines + "',username = '" + username + "',password = '" + password + "',bet_amount = '" + betAmount + "' ,earn_money_at = '" + earn_money_at + "', lost_money_at = '" + lost_money_at + "',register_code='" + register_code + "',first_n = '" + first_n + "',\
                ball1_1='" + console_instance.ball1_1_Entry.text() + "',ball1_2='" + console_instance.ball1_2_Entry.text() + "',ball1_3='" + console_instance.ball1_3_Entry.text() + "',ball1_4='" + console_instance.ball1_4_Entry.text() + "',ball1_5='" + console_instance.ball1_5_Entry.text() + "',\
                ball1_6='" + console_instance.ball1_6_Entry.text() + "',ball1_7='" + console_instance.ball1_7_Entry.text() + "',ball1_8='" + console_instance.ball1_8_Entry.text() + "',ball1_9='" + console_instance.ball1_9_Entry.text() + "',ball1_10='" + console_instance.ball1_10_Entry.text() + "',\
                ball2_1='" + console_instance.ball2_1_Entry.text() + "',ball2_2='" + console_instance.ball2_2_Entry.text() + "',ball2_3='" + console_instance.ball2_3_Entry.text() + "',ball2_4='" + console_instance.ball2_4_Entry.text() + "',ball2_5='" + console_instance.ball2_5_Entry.text() + "',\
                ball2_6='" + console_instance.ball2_6_Entry.text() + "',ball2_7='" + console_instance.ball2_7_Entry.text() + "',ball2_8='" + console_instance.ball2_8_Entry.text() + "',ball2_9='" + console_instance.ball2_9_Entry.text() + "',ball2_10='" + console_instance.ball2_10_Entry.text() + "',\
                ball3_1='" + console_instance.ball3_1_Entry.text() + "',ball3_2='" + console_instance.ball3_2_Entry.text() + "',ball3_3='" + console_instance.ball3_3_Entry.text() + "',ball3_4='" + console_instance.ball3_4_Entry.text() + "',ball3_5='" + console_instance.ball3_5_Entry.text() + "',\
                ball3_6='" + console_instance.ball3_6_Entry.text() + "',ball3_7='" + console_instance.ball3_7_Entry.text() + "',ball3_8='" + console_instance.ball3_8_Entry.text() + "',ball3_9='" + console_instance.ball3_9_Entry.text() + "',ball3_10='" + console_instance.ball3_10_Entry.text() + "',\
                ball4_1='" + console_instance.ball4_1_Entry.text() + "',ball4_2='" + console_instance.ball4_2_Entry.text() + "',ball4_3='" + console_instance.ball4_3_Entry.text() + "',ball4_4='" + console_instance.ball4_4_Entry.text() + "',ball4_5='" + console_instance.ball4_5_Entry.text() + "',\
                ball4_6='" + console_instance.ball4_6_Entry.text() + "',ball4_7='" + console_instance.ball4_7_Entry.text() + "',ball4_8='" + console_instance.ball4_8_Entry.text() + "',ball4_9='" + console_instance.ball4_9_Entry.text() + "',ball4_10='" + console_instance.ball4_10_Entry.text() + "',\
                ball5_1='" + console_instance.ball5_1_Entry.text() + "',ball5_2='" + console_instance.ball5_2_Entry.text() + "',ball5_3='" + console_instance.ball5_3_Entry.text() + "',ball5_4='" + console_instance.ball5_4_Entry.text() + "',ball5_5='" + console_instance.ball5_5_Entry.text() + "',\
                ball5_6='" + console_instance.ball5_6_Entry.text() + "',ball5_7='" + console_instance.ball5_7_Entry.text() + "',ball5_8='" + console_instance.ball5_8_Entry.text() + "',ball5_9='" + console_instance.ball5_9_Entry.text() + "',ball5_10='" + console_instance.ball5_10_Entry.text() + "',\
                ball6_1='" + console_instance.ball6_1_Entry.text() + "',ball6_2='" + console_instance.ball6_2_Entry.text() + "',ball6_3='" + console_instance.ball6_3_Entry.text() + "',ball6_4='" + console_instance.ball6_4_Entry.text() + "',ball6_5='" + console_instance.ball6_5_Entry.text() + "',\
                ball6_6='" + console_instance.ball6_6_Entry.text() + "',ball6_7='" + console_instance.ball6_7_Entry.text() + "',ball6_8='" + console_instance.ball6_8_Entry.text() + "',ball6_9='" + console_instance.ball6_9_Entry.text() + "',ball6_10='" + console_instance.ball6_10_Entry.text() + "',\
                ball7_1='" + console_instance.ball7_1_Entry.text() + "',ball7_2='" + console_instance.ball7_2_Entry.text() + "',ball7_3='" + console_instance.ball7_3_Entry.text() + "',ball7_4='" + console_instance.ball7_4_Entry.text() + "',ball7_5='" + console_instance.ball7_5_Entry.text() + "',\
                ball7_6='" + console_instance.ball7_6_Entry.text() + "',ball7_7='" + console_instance.ball7_7_Entry.text() + "',ball7_8='" + console_instance.ball7_8_Entry.text() + "',ball7_9='" + console_instance.ball7_9_Entry.text() + "',ball7_10='" + console_instance.ball7_10_Entry.text() + "',\
                ball8_1='" + console_instance.ball8_1_Entry.text() + "',ball8_2='" + console_instance.ball8_2_Entry.text() + "',ball8_3='" + console_instance.ball8_3_Entry.text() + "',ball8_4='" + console_instance.ball8_4_Entry.text() + "',ball8_5='" + console_instance.ball8_5_Entry.text() + "',\
                ball8_6='" + console_instance.ball8_6_Entry.text() + "',ball8_7='" + console_instance.ball8_7_Entry.text() + "',ball8_8='" + console_instance.ball8_8_Entry.text() + "',ball8_9='" + console_instance.ball8_9_Entry.text() + "',ball8_10='" + console_instance.ball8_10_Entry.text() + "',\
                ball9_1='" + console_instance.ball9_1_Entry.text() + "',ball9_2='" + console_instance.ball9_2_Entry.text() + "',ball9_3='" + console_instance.ball9_3_Entry.text() + "',ball9_4='" + console_instance.ball9_4_Entry.text() + "',ball9_5='" + console_instance.ball9_5_Entry.text() + "',\
                ball9_6='" + console_instance.ball9_6_Entry.text() + "',ball9_7='" + console_instance.ball9_7_Entry.text() + "',ball9_8='" + console_instance.ball9_8_Entry.text() + "',ball9_9='" + console_instance.ball9_9_Entry.text() + "',ball9_10='" + console_instance.ball9_10_Entry.text() + "',\
                ball10_1='" + console_instance.ball10_1_Entry.text() + "',ball10_2='" + console_instance.ball10_2_Entry.text() + "',ball10_3='" + console_instance.ball10_3_Entry.text() + "',ball10_4='" + console_instance.ball10_4_Entry.text() + "',ball10_5='" + console_instance.ball10_5_Entry.text() + "',\
                ball10_6='" + console_instance.ball10_6_Entry.text() + "',ball10_7='" + console_instance.ball10_7_Entry.text() + "',ball10_8='" + console_instance.ball10_8_Entry.text() + "',ball10_9='" + console_instance.ball10_9_Entry.text() + "',ball10_10='" + console_instance.ball10_10_Entry.text() + "',\
                isQQG = '" + ('0' if console_instance.isQQG else '1') + "',isLoseAdd = '" + (
                '0' if console_instance.isLoseAdd else '1') + "';"

            cqssc_db.execute(unicode(sql))
            cqssc_db.commit()
            cqssc_db.close()

            console_instance.ball1 = [console_instance.ball1_1_Entry.text(), console_instance.ball1_2_Entry.text(),
                                      console_instance.ball1_3_Entry.text(),
                                      console_instance.ball1_4_Entry.text(), console_instance.ball1_5_Entry.text(),
                                      console_instance.ball1_6_Entry.text(),
                                      console_instance.ball1_7_Entry.text(), console_instance.ball1_8_Entry.text(),
                                      console_instance.ball1_9_Entry.text(),
                                      console_instance.ball1_10_Entry.text()]
            console_instance.ball2 = [console_instance.ball2_1_Entry.text(), console_instance.ball2_2_Entry.text(),
                                      console_instance.ball2_3_Entry.text(),
                                      console_instance.ball2_4_Entry.text(), console_instance.ball2_5_Entry.text(),
                                      console_instance.ball2_6_Entry.text(),
                                      console_instance.ball2_7_Entry.text(), console_instance.ball2_8_Entry.text(),
                                      console_instance.ball2_9_Entry.text(),
                                      console_instance.ball2_10_Entry.text()]
            console_instance.ball3 = [console_instance.ball3_1_Entry.text(), console_instance.ball3_2_Entry.text(),
                                      console_instance.ball3_3_Entry.text(),
                                      console_instance.ball3_4_Entry.text(), console_instance.ball3_5_Entry.text(),
                                      console_instance.ball3_6_Entry.text(),
                                      console_instance.ball3_7_Entry.text(), console_instance.ball3_8_Entry.text(),
                                      console_instance.ball3_9_Entry.text(),
                                      console_instance.ball3_10_Entry.text()]
            console_instance.ball4 = [console_instance.ball4_1_Entry.text(), console_instance.ball4_2_Entry.text(),
                                      console_instance.ball4_3_Entry.text(),
                                      console_instance.ball4_4_Entry.text(), console_instance.ball4_5_Entry.text(),
                                      console_instance.ball4_6_Entry.text(),
                                      console_instance.ball4_7_Entry.text(), console_instance.ball4_8_Entry.text(),
                                      console_instance.ball4_9_Entry.text(),
                                      console_instance.ball4_10_Entry.text()]
            console_instance.ball5 = [console_instance.ball5_1_Entry.text(), console_instance.ball5_2_Entry.text(),
                                      console_instance.ball5_3_Entry.text(),
                                      console_instance.ball5_4_Entry.text(), console_instance.ball5_5_Entry.text(),
                                      console_instance.ball5_6_Entry.text(),
                                      console_instance.ball5_7_Entry.text(), console_instance.ball5_8_Entry.text(),
                                      console_instance.ball5_9_Entry.text(),
                                      console_instance.ball5_10_Entry.text()]
            console_instance.ball6 = [console_instance.ball6_1_Entry.text(), console_instance.ball6_2_Entry.text(),
                                      console_instance.ball6_3_Entry.text(),
                                      console_instance.ball6_4_Entry.text(), console_instance.ball6_5_Entry.text(),
                                      console_instance.ball6_6_Entry.text(),
                                      console_instance.ball6_7_Entry.text(), console_instance.ball6_8_Entry.text(),
                                      console_instance.ball6_9_Entry.text(),
                                      console_instance.ball6_10_Entry.text()]
            console_instance.ball7 = [console_instance.ball7_1_Entry.text(), console_instance.ball7_2_Entry.text(),
                                      console_instance.ball7_3_Entry.text(),
                                      console_instance.ball7_4_Entry.text(), console_instance.ball7_5_Entry.text(),
                                      console_instance.ball7_6_Entry.text(),
                                      console_instance.ball7_7_Entry.text(), console_instance.ball7_8_Entry.text(),
                                      console_instance.ball7_9_Entry.text(),
                                      console_instance.ball7_10_Entry.text()]
            console_instance.ball8 = [console_instance.ball8_1_Entry.text(), console_instance.ball8_2_Entry.text(),
                                      console_instance.ball8_3_Entry.text(),
                                      console_instance.ball8_4_Entry.text(), console_instance.ball8_5_Entry.text(),
                                      console_instance.ball8_6_Entry.text(),
                                      console_instance.ball8_7_Entry.text(), console_instance.ball8_8_Entry.text(),
                                      console_instance.ball8_9_Entry.text(),
                                      console_instance.ball8_10_Entry.text()]
            console_instance.ball9 = [console_instance.ball9_1_Entry.text(), console_instance.ball9_2_Entry.text(),
                                      console_instance.ball9_3_Entry.text(),
                                      console_instance.ball9_4_Entry.text(), console_instance.ball9_5_Entry.text(),
                                      console_instance.ball9_6_Entry.text(),
                                      console_instance.ball9_7_Entry.text(), console_instance.ball9_8_Entry.text(),
                                      console_instance.ball9_9_Entry.text(),
                                      console_instance.ball9_10_Entry.text()]
            console_instance.ball10 = [console_instance.ball10_1_Entry.text(), console_instance.ball10_2_Entry.text(),
                                       console_instance.ball10_3_Entry.text(),
                                       console_instance.ball10_4_Entry.text(), console_instance.ball10_5_Entry.text(),
                                       console_instance.ball10_6_Entry.text(),
                                       console_instance.ball10_7_Entry.text(), console_instance.ball10_8_Entry.text(),
                                       console_instance.ball10_9_Entry.text(),
                                       console_instance.ball10_10_Entry.text()]

            console_instance.balls = [console_instance.ball1, console_instance.ball2, console_instance.ball3,
                                      console_instance.ball4, console_instance.ball5, \
                                      console_instance.ball6, console_instance.ball7, console_instance.ball8,
                                      console_instance.ball9, console_instance.ball10]

            # 检查输入是否正确
            a = True
            msg = ''
            for i in range(len(console_instance.balls)):
                for j in range(len(console_instance.balls[i])):
                    for k in console_instance.balls[i][j]:
                        if str(k) not in '0123456789-':
                            a = False
                            msg = '%d行 %d列' % (j + 1, i + 1)
                            break

            if not a:
                QtGui.QMessageBox.about(console_instance, u'出了点问题', u"请检查%s输入框的数字之间是否为符号： , " % (msg))
            else:
                for i in console_instance.balls:
                    for j in i:
                        if not j:
                            continue
                        m = j.split('-')
                        for k in m:
                            if int(k) > 10:
                                QtGui.QMessageBox.about(console_instance, u'出了点问题', u"数字都是小于等于10吗？")
                                a = False
                                break

            if a:
                QtGui.QMessageBox.about(console_instance, u'成功', u"保存成功")

            # 更新goThread的数据
            if console_instance.goThread != None:
                QMetaObject.invokeMethod(console_instance.goThread, "update_goThreadData", Qt.QueuedConnection,
                                         Q_ARG(int, console_instance.first_n), Q_ARG(str, betAmount), Q_ARG(str, isQQG),
                                         Q_ARG(str, isLoseAdd))
                # QMetaObject.invokeMethod(console_instance.goThread, "update_goThreadData2", Qt.QueuedConnection, Q_ARG(str, betAmount))
        except Exception, ex:
            logging.error(ex, exc_info=1)
