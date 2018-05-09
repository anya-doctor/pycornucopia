# coding=utf-8
import logging

# 重庆取冷码！！！


# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = False

# 控制需不需要追踪下单的流水！
record_list_mode = True

# 控制单个中就算中，还是组合中！！！
win_ping_dic = {
    1 * 5: {
        'win_cnt': 1,
        'ping_cnt': -1,
    },
    2 * 5: {
        'win_cnt': 2,
        'ping_cnt': 1,
    },
    3 * 5: {
        'win_cnt': 2,
        'ping_cnt': -1,
    },
    4 * 5: {
        'win_cnt': 3,
        'ping_cnt': 2,
    },
    5 * 5: {
        'win_cnt': 3,
        'ping_cnt': -1,
    },
}


def get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中-算出球】垂直模式=%s：位置=%s" % (vertical_mode, bet_index))

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
            '0': 0
        }

        # 开始统计
        for line in lines[console_instance.first_n: console_instance.first_n + range_num]:
            balls = line[2:7]
            balls = list(set(balls))
            for i in balls:
                dic[str(i)] += 1

        logging.info(dic)

        # 找到热、冷码
        a = sorted([[v, k] for k, v in dic.items()], reverse=True)
        cold = [int(k) for v, k in a[-affect_num:]]
        hot = [int(k) for v, k in a[0:affect_num]]
        logging.info("cold=%s" % cold)
        logging.info("hot=%s" % hot)

        # 如果是初始化状况
        if len(console_instance.all_ball_needToBetList) < bet_index:
            logging.info(u"初始化状况，位置=%s" % bet_index)
            your_choice = hot
        # 如果是常规进来
        else:
            logging.info(console_instance.all_ball_needToBetList[bet_index-1])
            if console_instance.all_ball_needToBetList[bet_index-1][6][-1][-1] == True:
                # 如果中了则清理数据
                #[20180323099L, 20180323100L, 0, [[1, 9], [1, 6], [1, 3], [2, 9], [2, 6], [2, 3], [3, 9], [3, 6], [3, 3], [4, 9], [4, 6], [4, 3], [5, 9], [5, 6], [5, 3]], 1, 0, [[[1, 9], [1, 6], [1, 3], [2, 9], [2, 6], [2, 3], [3, 9], [3, 6], [3, 3], [4, 9], [4, 6], [4, 3], [5, 9], [5, 6], [5, 3], True]], u'\u4e2d']


                logging.info(u"位置=%s, 常规进来，发现上一期是中的，直接热码，顺便清空历史list。。。" % bet_index)
                console_instance.all_ball_needToBetList[bet_index-1][6] = []
                your_choice = hot
            else:
                fail_cnt = len(console_instance.all_ball_needToBetList[bet_index-1][6])
                logging.info(u"之前失败的次数=%s" % fail_cnt)
                if fail_cnt % 2 == 1:
                    logging.info(u"那么选择cold")
                    your_choice = cold
                else:
                    logging.info(u"那么选择hot")
                    your_choice = hot

            # 中了或者一开始，
        bet_balls = []
        for i in range(1, 6):
            for j in your_choice:
                bet_balls.append([i, j])

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(
                u"【下注中-算出球】win_cnt=%s, ping_cnt=%s" % (
                win_ping_dic[len(bet_balls)]['win_cnt'], win_ping_dic[len(bet_balls)]['ping_cnt']))
        if isinstance(bet_balls, tuple):
            for i in range(len(bet_balls)):
                logging.info(u"【下注中-算出球】下注=%s" % bet_balls[i])
        elif isinstance(bet_balls, list):
            logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
