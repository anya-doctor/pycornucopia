# coding=utf-8
import logging

# 重庆取冷码！！！


# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = False

# 控制需不需要追踪下单的流水！
record_list_mode = False

# 控制单个中就算中，还是组合中！！！
win_ping_dic = {
    1 * 5: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    2 * 5: {
        'win_cnt': 2,
        'ping_cnt': 1,
    },
    3 * 5: {
        'win_cnt': 2,
        'ping_cnt': -1,
    },
    4 * 5: {
        'win_cnt': 3,
        'ping_cnt': 2,
    },
    5 * 5: {
        'win_cnt': 3,
        'ping_cnt': -1,
    },
}


def get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中-算出球】垂直模式=%s：位置=%s" % (vertical_mode, bet_index))

        if bet_index > 1:
            logging.info(u"【下注中-算出球】因为算法特殊性，只要bet_index==1即可，跳过%s..." % bet_index)
            return [], []

        # 舍弃N期
        lines = console_instance.history_data
        line = lines[int(console_instance.first_n)]
        line2 = lines[int(console_instance.first_n) + 1]
        balls = line[2:7]
        balls2 = line2[2:7]
        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

        # 确定范围
        range_num = int(console_instance.ball1_1_Entry.text())
        affect_num = int(console_instance.ball1_2_Entry.text())
        logging.info("range_num=%s, affect_num=%s" % (range_num, affect_num))

        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

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
            balls = line[2:7]
            balls = list(set(balls))
            for i in balls:
                dic[str(i)] += 1

        logging.info(dic)

        # 找到热码
        a = sorted([[v, k] for k, v in dic.items()], reverse=True)
        b = [int(k) for v, k in a[-affect_num:]]
        logging.info(b)

        bet_balls = []
        for i in range(1, 6):
            for j in b:
                bet_balls.append([i, j])

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(
                u"【下注中-算出球】win_cnt=%s, ping_cnt=%s" % (
                win_ping_dic[len(bet_balls)]['win_cnt'], win_ping_dic[len(bet_balls)]['ping_cnt']))
        if isinstance(bet_balls, tuple):
            for i in range(len(bet_balls)):
                logging.info(u"【下注中-算出球】下注=%s" % bet_balls[i])
        elif isinstance(bet_balls, list):
            logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
