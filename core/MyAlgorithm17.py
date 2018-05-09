# coding=utf-8
import logging

"""
2018年3月31日 星期六：
北京走位置。。。
在console_instance.ball1_1_Entry.text() 填： 4-5-6-7
这些都是位置。。。
"""

# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = False

# 控制需不需要追踪下单的流水！
record_list_mode = True


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
            1: [str(console_instance.ball1_1_Entry.text()).split('-'),str(console_instance.ball1_2_Entry.text()).split('-')],
            2: [str(console_instance.ball2_1_Entry.text()).split('-'),str(console_instance.ball2_2_Entry.text()).split('-')],
            3: [str(console_instance.ball3_1_Entry.text()).split('-'),str(console_instance.ball3_2_Entry.text()).split('-')],
            4: [str(console_instance.ball4_1_Entry.text()).split('-'),str(console_instance.ball4_2_Entry.text()).split('-')],
            5: [str(console_instance.ball5_1_Entry.text()).split('-'),str(console_instance.ball5_2_Entry.text()).split('-')],
            6: [str(console_instance.ball6_1_Entry.text()).split('-'),str(console_instance.ball6_2_Entry.text()).split('-')],
            7: [str(console_instance.ball7_1_Entry.text()).split('-'),str(console_instance.ball7_2_Entry.text()).split('-')],
            8: [str(console_instance.ball8_1_Entry.text()).split('-'),str(console_instance.ball8_2_Entry.text()).split('-')],
            9: [str(console_instance.ball9_1_Entry.text()).split('-'),str(console_instance.ball9_2_Entry.text()).split('-')],
            10: [str(console_instance.ball10_1_Entry.text()).split('-'),str(console_instance.ball10_2_Entry.text()).split('-')],
        }

        # 如果是初始化状况
        ball = balls[bet_index - 1]
        if len(console_instance.all_ball_needToBetList) < bet_index:
            logging.info(u"初始化状况，位置=%s" % bet_index)
            bet_balls = [[int(v), ball] for v in dic[bet_index][0]]
        # 如果是常规进来
        else:
            logging.info(console_instance.all_ball_needToBetList[bet_index-1])
            if console_instance.all_ball_needToBetList[bet_index-1][6][-1][-1] == True:
                # 如果中了则清理数据
                logging.info(u"位置=%s, 常规进来，发现上一期是中的，直接热码，顺便清空历史list。。。" % bet_index)
                console_instance.all_ball_needToBetList[bet_index-1][6] = []
                ball = balls[bet_index - 1]
                bet_balls = [[int(v), ball] for v in dic[bet_index][0]]
            else:
                fail_cnt = len(console_instance.all_ball_needToBetList[bet_index-1][6])
                logging.info(u"之前失败的次数=%s" % fail_cnt)
                if fail_cnt % 2 == 1:
                    logging.info(u"那么选择cold")
                    bet_balls = [[int(v), ball] for v in dic[bet_index][1]]
                else:
                    logging.info(u"那么选择hot")
                    bet_balls = [[int(v), ball] for v in dic[bet_index][0]]

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
