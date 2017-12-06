# coding:utf-8
import logging

from PyQt4.QtCore import *

from myutil.MyTool import beautiful_log


class CreateNextBetDataAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance, index, lines=[], reverse_cnt=0, last_bet=[], re_last_bet=[]):
        try:
            logging.info(u"【计算下注】第%s球, 不中次数=%s, 上次下注=%s, 上次不下注列表=%s" % (index, reverse_cnt, last_bet, re_last_bet))
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
            if dic[index] == 0:
                return [], []

            # 舍弃N期
            # line = lines[console_instance.first_n]
            # balls = line.split(' ')

            balls = console_instance.open_ball

            # 大大 - 小小 - 单单 - 双双
            mylst = [str(console_instance.ball2_1_Entry.text()).split('-'),
                     str(console_instance.ball2_2_Entry.text()).split('-'),
                     str(console_instance.ball2_3_Entry.text()).split('-'),
                     str(console_instance.ball2_4_Entry.text()).split('-'),
                     str(console_instance.ball2_5_Entry.text()).split('-'),
                     str(console_instance.ball2_6_Entry.text()).split('-'),
                     str(console_instance.ball2_7_Entry.text()).split('-'),
                     str(console_instance.ball2_8_Entry.text()).split('-'),
                     ]

            ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            # 初始化状态
            if not last_bet or reverse_cnt == 0:
                logging.info(u"【初始化状态】...")
                if balls[index] in mylst[0]:
                    bet_balls = mylst[0]
                else:
                    bet_balls = mylst[1]
                not_bet_balls = [v for v in ten_balls if v not in bet_balls]
                ret = bet_balls, not_bet_balls
            else:
                last_index = mylst.index(last_bet)  # 先找出的是第一个大
                if reverse_cnt % 2 == 1:  # 说明是后面那个大
                    last_index += 1

                bet_balls = mylst[(last_index + 1) % len(mylst)]

                not_bet_balls = [v for v in ten_balls if v not in bet_balls]
                ret = bet_balls, not_bet_balls

            logging.info(u"【计算结果】下注=%s" % (ret[0]))
            return ret
        except Exception, ex:
            logging.error(ex, exc_info=1)
