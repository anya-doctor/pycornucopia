# coding=utf-8
import logging

from common import common

"""
2018年3月31日 星期六：
这个只适应重庆走位置。。。

console_instance.ball1_1_Entry.text() 填： 20期内
console_instance.ball1_2_Entry.text() 填： 2-3-4，表示第2，3，4热
console_instance.ball1_3_Entry.text() 填： 1-2-3-4，表示第1，2，3冷
console_instance.ball1_4_Entry.text() 填： 1-2-3-4-5-6-7-8，表示要下的位置
"""

# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = True

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
    20: {
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
        n = int(console_instance.ball1_1_Entry.text())
        m = int(console_instance.ball1_2_Entry.text())
        logging.info(u"【下注中-算出球】n=%s, m=%s" % (n, m))
        lines = console_instance.history_data

        # 0 = 次數， 1000 = 距離
        if console_instance.play_mode == common.PLAYMODE_PK10:
            dic = {
                '1': [0, 1000],
                '2': [0, 1000],
                '3': [0, 1000],
                '4': [0, 1000],
                '5': [0, 1000],
                '6': [0, 1000],
                '7': [0, 1000],
                '8': [0, 1000],
                '9': [0, 1000],
                '10': [0, 1000],
            }
        else:
            dic = {
                '1': [0, 1000],
                '2': [0, 1000],
                '3': [0, 1000],
                '4': [0, 1000],
                '5': [0, 1000],
                '6': [0, 1000],
                '7': [0, 1000],
                '8': [0, 1000],
                '9': [0, 1000],
                '0': [0, 1000],
            }

        for i, line in enumerate(lines[int(console_instance.first_n): int(console_instance.first_n) + n]):
            if console_instance.play_mode == common.PLAYMODE_PK10:
                balls = line[2:12]
            else:
                balls = line[2:7]
            ball = balls[bet_index - 1]
            dic[str(ball)][0] += 1
            if i < dic[str(ball)][1]:
                dic[str(ball)][1] = i
        logging.info(dic)
        # 找到热码
        a = [[v[0], v[1], k] for k, v in dic.items()]
        a.sort(cmp=lambda x, y: cmp(y[0], x[0]) or cmp(x[1], y[1]))
        logging.info(u"热码排序=%s" % a)
        bet_balls_hot = []
        # 先把毫無爭議的球拿下來
        for hot_index in range(m):
            bet_balls_hot.append(a[hot_index][2])

        bet_balls = bet_balls_hot
        logging.info("bet_balls=%s" % bet_balls)

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
