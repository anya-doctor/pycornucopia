# coding=utf-8
import logging

# 重庆取冷热码！！！
# 第一列第一行表示范围
# 第一列第二行表示 热码，2-3-4，表示拿第2热、第3热、第4热
# 第二列第二行表示 冷码， 2-3-4，表示拿第2冷、第3冷、第4冷


# 控制赌法是垂直模式，还是水平模式！！！
from common import common

vertical_mode = True

# 控制需不需要追踪下单的流水！
record_list_mode = False


# 控制单个中就算中，还是组合中！！！


def get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中-算出球】垂直模式=%s：位置=%s" % (vertical_mode, bet_index))
        # 舍弃N期
        lines = console_instance.history_data
        line = lines[int(console_instance.first_n)]
        line2 = lines[int(console_instance.first_n) + 1]

        # 确定范围
        range_num = int(console_instance.ball1_1_Entry.text())
        hot_lst = map(int, str(console_instance.ball1_2_Entry.text()).split('-')) if console_instance.ball1_2_Entry.text() else []
        cold_lst = map(int, str(console_instance.ball2_2_Entry.text()).split('-')) if console_instance.ball2_2_Entry.text() else []
        logging.info("range_num=%s, hot_lst=%s,cold_lst=%s" % (range_num, hot_lst, cold_lst))

        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        if console_instance.play_mode == common.PLAYMODE_PK10:
            dic = {
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0,
                '6': 0,
                '7': 0,
                '8': 0,
                '9': 0,
                '10': 0
            }
        else:
            dic = {
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0,
                '6': 0,
                '7': 0,
                '8': 0,
                '9': 0,
                '0': 0
            }

        # 开始统计
        for line in lines[console_instance.first_n: console_instance.first_n + range_num]:
            if console_instance.play_mode == common.PLAYMODE_PK10:
                balls = line[2:12]
            elif console_instance.play_mode == common.PLAYMODE_CQSSC:
                balls = line[2:7]
            ball = balls[bet_index-1]
            dic[str(ball)] += 1

        logging.info(dic)

        # 找到热码
        bet_balls_hot = []
        bet_balls_cold = []
        a = sorted([[v, k] for k, v in dic.items()], reverse=True)
        logging.info(u"热码排序=%s" % a)
        for hot_index in hot_lst:
            bet_balls_hot.append(a[hot_index][1])

        b = sorted([[v, k] for k, v in dic.items()])
        logging.info(u"冷码排序=%s" % b)
        for cold_index in cold_lst:
            bet_balls_cold.append(b[cold_index][1])

        logging.info("hot=%s" % bet_balls_hot)
        logging.info("cold=%s" % bet_balls_cold)

        bet_balls = list(set(bet_balls_hot + bet_balls_cold))
        logging.info("bet_balls=%s" % bet_balls)
        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        if isinstance(bet_balls, tuple):
            for i in range(len(bet_balls)):
                logging.info(u"【下注中-算出球】下注=%s" % bet_balls[i])
        elif isinstance(bet_balls, list):
            logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
