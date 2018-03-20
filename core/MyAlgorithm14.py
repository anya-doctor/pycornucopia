# coding=utf-8
import logging

# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = False

# 控制需不需要追踪下单的流水！
record_list_mode = False

# 控制单个中就算中，还是组合中！！！
win_ping_dic = {
    1: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    2: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    3: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    4: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    5: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    6: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    7: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    8: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    9: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    10: {
        'win_cnt': 1,
        'ping_cnt': -1,
    }
}



def get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        if vertical_mode:
            logging.info(u"【下注中-算出球】垂直模式：位置=%s" % bet_index)
        else:
            logging.info(u"【下注中-算出球】水平模式：位置=%s" % bet_index)

        # 舍弃N期
        lines = console_instance.history_data
        line = lines[int(console_instance.first_n)]
        balls = line[2:12]
        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

        dic = {
            1:  str(console_instance.ball1_1_Entry.text()).split('-'),
            2:  str(console_instance.ball2_1_Entry.text()).split('-'),
            3:  str(console_instance.ball3_1_Entry.text()).split('-'),
            4:  str(console_instance.ball4_1_Entry.text()).split('-'),
            5:  str(console_instance.ball5_1_Entry.text()).split('-'),
            6:  str(console_instance.ball6_1_Entry.text()).split('-'),
            7:  str(console_instance.ball7_1_Entry.text()).split('-'),
            8:  str(console_instance.ball8_1_Entry.text()).split('-'),
            9:  str(console_instance.ball9_1_Entry.text()).split('-'),
            10:  str(console_instance.ball10_1_Entry.text()).split('-'),
        }
        ball = balls[bet_index - 1]
        bet_balls = [[int(v), ball] for v in dic[bet_index]]

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
