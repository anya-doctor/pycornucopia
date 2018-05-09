# coding=utf-8
import logging

"""
2018年3月31日 星期六：
这个只适应重庆走位置。。。

console_instance.ball1_1_Entry.text() 填： 20期内
console_instance.ball1_2_Entry.text() 填： 2-3-4，表示第2，3，4热
console_instance.ball1_3_Entry.text() 填： 1-2-3-4，表示第1，2，3冷
console_instance.ball1_4_Entry.text() 填： 1-2-3-4-5-6-7-8，表示要下的位置
"""

# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = False

# 控制需不需要追踪下单的流水！
record_list_mode = False

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
        'win_cnt': 2,
        'ping_cnt': -1,
    },
    15: {
        'win_cnt': 2,
        'ping_cnt': -1,
    },
    20:{
        'win_cnt': 3,
        'ping_cnt': 2,
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
        balls = line[2:7]
        logging.info("balls=%s" % balls)
        logging.info("balls[3]=%s, balls[4]=%s" % (balls[3], balls[4]))
        mystr = "%s%s%s" % (balls[2], balls[3] , balls[4])

        a = str(float(int(mystr) * int(mystr)) / float(25)).replace('.', '')
        aa = []
        a_index = 0
        while len(aa) < 2:
            if a[a_index] not in aa:
                aa.append(a[a_index])
            else:
                logging.info(u"重复了，跳过a_index=%s" % a_index)
            a_index += 1
        logging.info("a=%s" % a)
        logging.info("aa=%s" % aa)

        b = str(int(mystr) * 133)
        bb = []
        b_index = 0
        while len(bb) < 2:
            if b[b_index] not in bb:
                bb.append(b[b_index])
            else:
                logging.info(u"重复了，跳过b_index=%s" % b_index)
            b_index += 1

        logging.info("b=%s" % b)
        logging.info("bb=%s" % bb)

        cc = list(set(aa + bb))
        cc = map(int, cc)

        bet_balls = []
        for pos in [1, 2, 3, 4, 5]:
            for ball in cc:
                bet_balls.append([int(pos), int(ball)])

        logging.info("bet_balls=%s" % bet_balls)

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
