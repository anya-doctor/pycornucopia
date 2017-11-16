# #coding:utf-8
import logging
import copy
from myutil.MyBaseDataGetter import MyBaseDataGetter


class MyDataGetter(MyBaseDataGetter):
    def __init__(self, console, bro, curP, balls_bet_flag, balls_bet_amount, all_ball_needToBetList, first_n,
                 change_flag, is_bet_success1, is_bet_success2, reslist):
        super(MyDataGetter, self).__init__(console, bro, curP, balls_bet_flag, balls_bet_amount, all_ball_needToBetList,
                                         first_n, change_flag, is_bet_success1, is_bet_success2, reslist)

    # 处理上期数据 + 下注列表数据更新
    def onHandlePreBet(self, curN, lines):
        try:
            if not self.all_ball_needToBetList:  # 说明上期有数据
                return

            cur_ball_number = curN.split(' ')[0:10]

            a = [self.console.is_bet_success1,self.console.is_bet_success2]
            for i in self.all_ball_needToBetList:
                index = i[0]
                betlist = i[1]
                betflag = i[2]

                reverse_cnt = i[4]
                last_bet = i[5]
                re_last_bet = i[6]

                if self.console.isLoseAdd == '0':  # 输加注
                    if cur_ball_number[index-1] in betlist:  # 中了就删了
                        i[2] = 0
                        # 中了就重置[]
                        i[5] = []
                        i[4] = 0
                    elif index < 6 and a[0]:
                        i[2] += 1
                        i[5] = copy.deepcopy(i[1])

                        # 根据reverse_flag，判断转不转
                        i[4] += 1
                    elif index >= 6 and a[1]:
                        i[2] += 1
                        i[5] = copy.deepcopy(i[1])

                        # 根据reverse_flag，判断转不转
                        i[4] += 1

                else:  # 赢加注
                    if cur_ball_number[index-1] in betlist:  # 中了加注
                        i[2] += 1
                        i[5] = copy.deepcopy(i[1])
                        i[4] += 1
                    elif index < 6 and a[0]:
                        i[2] = 0
                        i[5] = []
                        i[4] = 0
                    elif index >= 6 and a[1]:
                        i[2] = 0
                        i[5] = []
                        i[4] = 0

                # 常规，更新下注数据
                if i[3] == 1:
                    i[1], i[6] = self.getDataForBall(index, lines, i[4], i[5], i[6])
        except Exception, ex:
            logging.error(ex, exc_info=1)

    # 获取第index球缩水后的要下注的号码
    def getDataForBall(self, index, lines, reverse_cnt, last_bet=[], re_last_bet=[]):
        try:
            if len(lines) == 0:
                logging.info(u"找不到.\config\out.txt？")
                return -1
            else:
                logging.info("reverse_cnt=%s, last_bet=%s, ret_last_bet=%s" % (reverse_cnt, last_bet, re_last_bet))
                # 某些号码不想要
                dic = {
                    1: int(self.console.ball1_1_Entry.text()),
                    2: int(self.console.ball1_2_Entry.text()),
                    3: int(self.console.ball1_3_Entry.text()),
                    4: int(self.console.ball1_4_Entry.text()),
                    5: int(self.console.ball1_5_Entry.text()),
                    6: int(self.console.ball1_6_Entry.text()),
                    7: int(self.console.ball1_7_Entry.text()),
                    8: int(self.console.ball1_8_Entry.text()),
                    9: int(self.console.ball1_9_Entry.text()),
                    10: int(self.console.ball1_10_Entry.text()),
                }
                if dic[index] == 0:
                    return -1, [], []
                    
                # 舍弃N期
                line = lines[self.first_n]
                balls = line.split(' ')                
                
                # 大大 - 小小 - 单单 - 双双
                mylst = [str(self.console.ball2_1_Entry.text()).split('-'), str(self.console.ball2_2_Entry.text()).split('-'),
                         str(self.console.ball2_3_Entry.text()).split('-'), str(self.console.ball2_4_Entry.text()).split('-'),
                         str(self.console.ball2_5_Entry.text()).split('-'), str(self.console.ball2_6_Entry.text()).split('-'),
                         str(self.console.ball2_7_Entry.text()).split('-'), str(self.console.ball2_8_Entry.text()).split('-'),
                ]
                
                ten_balls = ['1','2','3','4','5','6','7','8','9','10']
                # 初始化状态
                if not last_bet or reverse_cnt == 0:
                    logging.info("初始化或者中了，重新来6...")
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

                    bet_balls =  mylst[(last_index + 1) % len(mylst)]
                    
                    not_bet_balls = [v for v in ten_balls if v not in bet_balls]
                    ret = bet_balls, not_bet_balls
                
                logging.info("ret%s  %s" % (ret[0], ret[1]))
                return ret
        except Exception, ex:
            logging.error(ex, exc_info=1)
