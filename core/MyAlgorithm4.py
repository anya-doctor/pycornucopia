# coding=utf-8
import logging


def verical_get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中】垂直模式：位置=%s" % bet_index)
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
        if dic[bet_index] == 0:
            return [], []

        # 舍弃N期
        lines = console_instance.history_data
        line = lines[int(console_instance.first_n)]
        balls = line[2:12]

        cnt = int(console_instance.ball2_1_Entry.text())
        up = int(console_instance.ball2_2_Entry.text())
        down = int(console_instance.ball2_3_Entry.text())
        logging.info(u"【下注中】历史前%s期，up=%s,down=%s" % (cnt, up, down))
        bet_balls = []
        dic = {}
        for line in lines[int(console_instance.first_n): int(console_instance.first_n) + cnt]:
            balls = line[2:12]
            if balls[bet_index - 1] not in dic:
                dic[balls[bet_index - 1]] = 1
            else:
                dic[balls[bet_index - 1]] += 1
        for key, value in dic.iteritems():
            if down <= value <= up and key:
                bet_balls.append(str(key))

        if len(bet_balls) > 2 and bet_balls[1] == ['']:
            bet_balls = (bet_balls[0],)

        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        if isinstance(bet_balls, tuple):
            for i in range(len(bet_balls)):
                logging.info(u"【计算结果】下注=%s" % bet_balls[i])
        elif isinstance(bet_balls, list):
            logging.info(u"【计算结果】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
