# coding=utf-8
import logging

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

        # 舍弃N期
        lines = console_instance.history_data

        # 确定范围
        range_num = int(console_instance.ball1_1_Entry.text())
        logging.info("range_num=%s" % (range_num))

        # 开始统计
        left_cnt = 0
        right_cnt = 0
        for line in lines[console_instance.first_n: console_instance.first_n + range_num]:
            balls = line[2:12]
            assert isinstance(balls, list)
            if balls.index(bet_index) < 6:
                left_cnt += 1
            else:
                right_cnt += 1
        logging.info("left_cnt=%s, right_cnt=%s" % (left_cnt, right_cnt))
        if left_cnt >= right_cnt:
            bet_balls = [[i, bet_index] for i in range(1, 6)]
        else:
            bet_balls = [[i, bet_index] for i in range(6, 11)]

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
