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

        # 只下注冠军
        if bet_index != 1:
            return [], []
        a = str(console_instance.ball2_10_Entry.text()).split('-')
        b = str(console_instance.ball3_10_Entry.text()).split('-')
        logging.info("### %s" % balls[9])
        logging.info("### %s" % a)
        logging.info("### %s" % b)
        if str(balls[9]) in a:
            bet_balls = a
        else:
            bet_balls = b

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
