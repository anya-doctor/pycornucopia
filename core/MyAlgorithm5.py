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
        if bet_index >= 6:
            return [], []
        if bet_index == 1:
            dic = {
                1: str(console_instance.ball10_1_Entry.text()).split('-'),
                2: str(console_instance.ball10_2_Entry.text()).split('-'),
                3: str(console_instance.ball10_3_Entry.text()).split('-'),
                4: str(console_instance.ball10_4_Entry.text()).split('-'),
                5: str(console_instance.ball10_5_Entry.text()).split('-'),
                6: str(console_instance.ball10_6_Entry.text()).split('-'),
                7: str(console_instance.ball10_7_Entry.text()).split('-'),
                8: str(console_instance.ball10_8_Entry.text()).split('-'),
                9: str(console_instance.ball10_9_Entry.text()).split('-'),
                10: str(console_instance.ball10_10_Entry.text()).split('-'),
            }
            bet_balls = dic[int(balls[9])]
        elif bet_index == 2:
            dic = {
                1: str(console_instance.ball9_1_Entry.text()).split('-'),
                2: str(console_instance.ball9_2_Entry.text()).split('-'),
                3: str(console_instance.ball9_3_Entry.text()).split('-'),
                4: str(console_instance.ball9_4_Entry.text()).split('-'),
                5: str(console_instance.ball9_5_Entry.text()).split('-'),
                6: str(console_instance.ball9_6_Entry.text()).split('-'),
                7: str(console_instance.ball9_7_Entry.text()).split('-'),
                8: str(console_instance.ball9_8_Entry.text()).split('-'),
                9: str(console_instance.ball9_9_Entry.text()).split('-'),
                10: str(console_instance.ball9_10_Entry.text()).split('-'),
            }
            bet_balls = dic[int(balls[8])]
        elif bet_index == 3:
            dic = {
                1: str(console_instance.ball8_1_Entry.text()).split('-'),
                2: str(console_instance.ball8_2_Entry.text()).split('-'),
                3: str(console_instance.ball8_3_Entry.text()).split('-'),
                4: str(console_instance.ball8_4_Entry.text()).split('-'),
                5: str(console_instance.ball8_5_Entry.text()).split('-'),
                6: str(console_instance.ball8_6_Entry.text()).split('-'),
                7: str(console_instance.ball8_7_Entry.text()).split('-'),
                8: str(console_instance.ball8_8_Entry.text()).split('-'),
                9: str(console_instance.ball8_9_Entry.text()).split('-'),
                10: str(console_instance.ball8_10_Entry.text()).split('-'),
            }
            bet_balls = dic[int(balls[7])]
        elif bet_index == 4:
            dic = {
                1: str(console_instance.ball7_1_Entry.text()).split('-'),
                2: str(console_instance.ball7_2_Entry.text()).split('-'),
                3: str(console_instance.ball7_3_Entry.text()).split('-'),
                4: str(console_instance.ball7_4_Entry.text()).split('-'),
                5: str(console_instance.ball7_5_Entry.text()).split('-'),
                6: str(console_instance.ball7_6_Entry.text()).split('-'),
                7: str(console_instance.ball7_7_Entry.text()).split('-'),
                8: str(console_instance.ball7_8_Entry.text()).split('-'),
                9: str(console_instance.ball7_9_Entry.text()).split('-'),
                10: str(console_instance.ball7_10_Entry.text()).split('-'),
            }
            bet_balls = dic[int(balls[6])]
        elif bet_index == 5:
            dic = {
                1: str(console_instance.ball6_1_Entry.text()).split('-'),
                2: str(console_instance.ball6_2_Entry.text()).split('-'),
                3: str(console_instance.ball6_3_Entry.text()).split('-'),
                4: str(console_instance.ball6_4_Entry.text()).split('-'),
                5: str(console_instance.ball6_5_Entry.text()).split('-'),
                6: str(console_instance.ball6_6_Entry.text()).split('-'),
                7: str(console_instance.ball6_7_Entry.text()).split('-'),
                8: str(console_instance.ball6_8_Entry.text()).split('-'),
                9: str(console_instance.ball6_9_Entry.text()).split('-'),
                10: str(console_instance.ball6_10_Entry.text()).split('-'),
            }
            bet_balls = dic[int(balls[5])]
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
