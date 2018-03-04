# coding=utf-8
import logging

# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = False

# 控制需不需要追踪下单的流水！
record_list_mode = False

# 控制单个中就算中，还是组合中！！！
win_cnt = 1
ping_cnt = -1


def get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中-算出球】垂直模式：位置=%s" % bet_index)

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

        logging.info("balls=%s" % balls)
        logging.info("balls2=%s" % balls2)

        t = [v for v in sorted(list(set(balls2))) if v not in balls]
        bet_balls = []
        for i in range(1, 6):
            for j in t:
                bet_balls.append([i, j])
        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        # 5中3算赢，无平
        global win_cnt, ping_cnt
        if len(t) == 5:
            win_cnt = 3
            ping_cnt = -1

        # 4中3算赢，中2算平
        elif len(t) == 4:
            win_cnt = 3
            ping_cnt = 2

        # 3中2算赢，中2算平
        elif len(t) == 3:
            win_cnt = 2
            ping_cnt = -1

        # 2中2算赢，中1算平
        elif len(t) == 2:
            win_cnt = 2
            ping_cnt = 1

        # 1中1算赢，无平
        elif len(t) == 1:
            win_cnt = 1
            ping_cnt = -1

        logging.info(u"【下注中-算出球】win_cnt=%s, ping_cnt=%s" % (win_cnt, ping_cnt))
        if isinstance(bet_balls, tuple):
            for i in range(len(bet_balls)):
                logging.info(u"【下注中-算出球】下注=%s" % bet_balls[i])
        elif isinstance(bet_balls, list):
            logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
