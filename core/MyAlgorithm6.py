# coding=utf-8
import logging


def verical_get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        logging.info(u"【下注中-算出球】垂直模式：位置=%s" % bet_index)
        # 舍弃N期
        lines = console_instance.history_data
        line = lines[int(console_instance.first_n)]
        balls = line[2:12]

        # 两个对立面
        a = str(console_instance.ball2_1_Entry.text()).split('-')
        b = str(console_instance.ball2_2_Entry.text()).split('-')
        logging.info("a=%s" % a)
        logging.info("b=%s" % b)
        ten_balls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

        c = filter(lambda x: x[4] == bet_index, console_instance.all_ball_needToBetList)
        if len(c) == 0:
            if str(balls[bet_index - 1]) in a:
                bet_balls = a
            else:
                bet_balls = b
        else:
            lala_index = -1
            for index, item in enumerate(console_instance.all_ball_needToBetList):
                if item[4] == bet_index:
                    lala_index = index
            assert len(c) == 1  # 保证是常规模式
            logging.info("c=%s" % c)
            record_list = c[0][6]
            logging.info("record_list=%s" % record_list)
            logging.info("len(record_list)=%s" % len(record_list))

            # 这是最新一期的下注情况...
            d = record_list[-1]
            e = [v[1] for v in d[0:-1]]
            logging.info("d=%s,e=%s" % (d, e))

            # 如果历史记录只有1个元素，说明是abb模式的a
            if len(record_list) % 3 == 1:
                # 如果中了，则进入重启abb
                if d[-1] == True:
                    if str(balls[bet_index - 1]) in a:
                        bet_balls = a
                    else:
                        bet_balls = b
                    # 清空record_list
                    console_instance.all_ball_needToBetList[lala_index][6] = []
                # 如果不中，则进入abb中的第一个b
                else:
                    if e == a:
                        bet_balls = b
                    else:
                        bet_balls = a
            # 能走到这一步，说明abb模式的第一个b
            elif len(record_list) % 3 == 2:
                # 无论 输赢，都是继续b
                if e == a:
                    bet_balls = a
                else:
                    bet_balls = b
            # 能走到第三步，说明是abb模式的第二个b
            elif len(record_list) % 3 == 0:
                # 这里无论输赢，都重启abb模式
                if str(balls[bet_index - 1]) in a:
                    bet_balls = a
                else:
                    bet_balls = b

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        if isinstance(bet_balls, tuple):
            for i in range(len(bet_balls)):
                logging.info(u"【下注中-算出球】下注=%s" % bet_balls[i])
        elif isinstance(bet_balls, list):
            logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
