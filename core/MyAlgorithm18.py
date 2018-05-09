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
            1: [str(console_instance.ball1_2_Entry.text()).split('-'),
                str(console_instance.ball1_3_Entry.text()).split('-'),
                str(console_instance.ball1_4_Entry.text()).split('-')],
            2: [str(console_instance.ball2_2_Entry.text()).split('-'),
                str(console_instance.ball2_3_Entry.text()).split('-'),
                str(console_instance.ball2_4_Entry.text()).split('-')],
            3: [str(console_instance.ball3_2_Entry.text()).split('-'),
                str(console_instance.ball3_3_Entry.text()).split('-'),
                str(console_instance.ball3_4_Entry.text()).split('-')],
            4: [str(console_instance.ball4_2_Entry.text()).split('-'),
                str(console_instance.ball4_3_Entry.text()).split('-'),
                str(console_instance.ball4_4_Entry.text()).split('-')],
            5: [str(console_instance.ball5_2_Entry.text()).split('-'),
                str(console_instance.ball5_3_Entry.text()).split('-'),
                str(console_instance.ball5_4_Entry.text()).split('-')],
            6: [str(console_instance.ball6_2_Entry.text()).split('-'),
                str(console_instance.ball6_3_Entry.text()).split('-'),
                str(console_instance.ball6_4_Entry.text()).split('-')],
            7: [str(console_instance.ball7_2_Entry.text()).split('-'),
                str(console_instance.ball7_3_Entry.text()).split('-'),
                str(console_instance.ball7_4_Entry.text()).split('-')],
            8: [str(console_instance.ball8_2_Entry.text()).split('-'),
                str(console_instance.ball8_3_Entry.text()).split('-'),
                str(console_instance.ball8_4_Entry.text()).split('-')],
            9: [str(console_instance.ball9_2_Entry.text()).split('-'),
                str(console_instance.ball9_3_Entry.text()).split('-'),
                str(console_instance.ball9_4_Entry.text()).split('-')],
            10: [str(console_instance.ball10_2_Entry.text()).split('-'),
                 str(console_instance.ball10_3_Entry.text()).split('-'),
                 str(console_instance.ball10_4_Entry.text()).split('-')],
        }
        # 先统计冷热
        cnt_dic = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '0': 0}
        range_num = int(console_instance.ball1_1_Entry.text())
        logging.info("range_num=%s" % (range_num))
        for line in lines[console_instance.first_n: console_instance.first_n + range_num]:
            balls = line[2:7]
            balls = list(set(balls))
            for i in balls:
                cnt_dic[str(i)] += 1
        logging.info(cnt_dic)

        # 找到热、冷码
        hot_lst = []
        cold_lst = []
        high2low = sorted([[v, k] for k, v in cnt_dic.items()], reverse=True)
        low2high = sorted([[v, k] for k, v in cnt_dic.items()])
        for hot_index in dic[bet_index][0]:
            if int(hot_index) == 0:
                continue
            t = high2low[int(hot_index) - 1][0]
            _cnt = 0
            for item in high2low:
                if item[0] == t:
                    _cnt += 1
            # 如果只有一个第n热，而不是多个球并列，那么就入选
            if _cnt == 1:
                hot_lst.append(high2low[int(hot_index) - 1][1])
            else:
                logging.error(u"选择第%s热的时候，发现有%s个球，那么就跳过吧..." % (hot_index,_cnt))
        for cold_index in dic[bet_index][1]:
            if int(cold_index) == 0:
                continue
            t = low2high[int(cold_index) - 1][0]
            _cnt = 0
            for item in low2high:
                if item[0] == t:
                    _cnt += 1
            # 如果只有一个第n冷，而不是多个球并列，那么就入选
            if _cnt == 1:
                cold_lst.append(low2high[int(cold_index) - 1][1])
            else:
                logging.error(u"选择第%s冷的时候，发现有%s个球，那么就跳过吧..." % (cold_index, _cnt))

        logging.info("cold=%s" % cold_lst)
        logging.info("hot=%s" % hot_lst)
        hot_and_cold_lst = hot_lst + cold_lst

        bet_balls = []
        for pos in dic[bet_index][2]:
            for ball in hot_and_cold_lst:
                bet_balls.append([int(pos), int(ball)])

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
