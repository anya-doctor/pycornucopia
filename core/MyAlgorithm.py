# coding=utf-8
import logging


def verical_get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中】垂直模式：位置=%s，舍弃=%s" % (bet_index, console_instance.first_n))
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

        # 找出不重复的球
        no_repeats_balls = []
        all_cnt = int(console_instance.ball2_1_Entry.text())
        logging.info(u"拿前%s期数据做统计" % all_cnt)

        for line in lines[console_instance.first_n:console_instance.first_n + all_cnt]:
            tmp_balls = line[2:12]
            logging.info(line)
            logging.info(tmp_balls)
            if tmp_balls[bet_index - 1] not in no_repeats_balls:
                no_repeats_balls.append(tmp_balls[bet_index - 1])
        logging.info("no_repeats_balls=%s" % no_repeats_balls)

        # 映射关系
        dic1 = {
            1: str(console_instance.ball3_1_Entry.text()).split('-'),
            2: str(console_instance.ball3_2_Entry.text()).split('-'),
            3: str(console_instance.ball3_3_Entry.text()).split('-'),
            4: str(console_instance.ball3_4_Entry.text()).split('-'),
            5: str(console_instance.ball3_5_Entry.text()).split('-'),
            6: str(console_instance.ball3_6_Entry.text()).split('-'),
            7: str(console_instance.ball3_7_Entry.text()).split('-'),
            8: str(console_instance.ball3_8_Entry.text()).split('-'),
            9: str(console_instance.ball3_9_Entry.text()).split('-'),
            10: str(console_instance.ball3_10_Entry.text()).split('-'),
        }
        a = no_repeats_balls[0]
        b = no_repeats_balls[1]
        not_bet_balls = dic1[a] + dic1[b]
        not_bet_balls = list(set(not_bet_balls))  # 去重
        c = 2
        while len(not_bet_balls) < 5:
            logging.info("不足5颗，补齐。")
            d = no_repeats_balls[c]
            not_bet_balls += dic1[d]
            not_bet_balls = list(set(not_bet_balls))  # 去重
            c += 1

        # 10码
        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        bet_balls = not_bet_balls
        # bet_balls = ([v for v in ten_balls if v not in not_bet_balls],)

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
        raise ex
