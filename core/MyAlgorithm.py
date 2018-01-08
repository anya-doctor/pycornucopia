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

        bet_dic = {
            1: (str(console_instance.ball3_1_Entry.text()).split('-'),
                str(console_instance.ball4_1_Entry.text()).split('-')),
            2: (str(console_instance.ball3_2_Entry.text()).split('-'),
                str(console_instance.ball4_2_Entry.text()).split('-')),
            3: (str(console_instance.ball3_3_Entry.text()).split('-'),
                str(console_instance.ball4_3_Entry.text()).split('-')),
            4: (str(console_instance.ball3_4_Entry.text()).split('-'),
                str(console_instance.ball4_4_Entry.text()).split('-')),
            5: (str(console_instance.ball3_5_Entry.text()).split('-'),
                str(console_instance.ball4_5_Entry.text()).split('-')),
            6: (str(console_instance.ball3_6_Entry.text()).split('-'),
                str(console_instance.ball4_6_Entry.text()).split('-')),
            7: (str(console_instance.ball3_7_Entry.text()).split('-'),
                str(console_instance.ball4_7_Entry.text()).split('-')),
            8: (str(console_instance.ball3_8_Entry.text()).split('-'),
                str(console_instance.ball4_8_Entry.text()).split('-')),
            9: (str(console_instance.ball3_9_Entry.text()).split('-'),
                str(console_instance.ball4_9_Entry.text()).split('-')),
            10: (str(console_instance.ball3_10_Entry.text()).split('-'),
                 str(console_instance.ball4_10_Entry.text()).split('-')),
        }

        bet_balls = bet_dic[balls[bet_index - 1]]
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
