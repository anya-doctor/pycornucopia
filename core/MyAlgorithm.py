# coding=utf-8
import logging

# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = True

# 控制需不需要追踪下单的流水！
record_list_mode = False


def verical_get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中-算出球】垂直模式：位置=%s" % bet_index)
        # 舍弃N期
        lines = console_instance.history_data
        line = lines[int(console_instance.first_n)]
        balls = line[2:12]

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
            '10': 0
        }

        # 开始统计
        for line in lines[console_instance.first_n: console_instance.first_n + range_num]:
            balls = line[2:12]
            dic[str(balls[bet_index - 1])] += 1

        # 找到冷码
        t_cnt = 0
        t_key = []
        for key, value in dic.iteritems():
            if value == 0:
                t_cnt += 1
                t_key.append(key)

        logging.info("t_cnt=%s, t_key=%s" % (t_cnt, t_key))

        bet_balls = []
        if t_cnt >= affect_num:
            bet_balls = t_key

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
