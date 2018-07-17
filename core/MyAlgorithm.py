# coding=utf-8
import logging

"""
2018年07月17日 星期二

冠军开什么，就下什么对应的什么！
"""

# 控制赌法是垂直模式，还是水平模式！！！
vertical_mode = False

# 控制需不需要追踪下单的流水！
record_list_mode = False


def get_bet_list(console_instance, bet_index):
    try:
        from myutil.MyConsole import MyConsole
        assert isinstance(console_instance, MyConsole)
        if vertical_mode:
            logging.info(u"【下注中-算出球】垂直模式：位置=%s" % bet_index)
        else:
            logging.info(u"【下注中-算出球】水平模式：位置=%s" % bet_index)

        dic = {
            1: {
                1: str(console_instance.ball1_1_Entry.text()).split("-"),
                2: str(console_instance.ball1_2_Entry.text()).split("-"),
                3: str(console_instance.ball1_3_Entry.text()).split("-"),
                4: str(console_instance.ball1_4_Entry.text()).split("-"),
                5: str(console_instance.ball1_5_Entry.text()).split("-"),
                6: str(console_instance.ball1_6_Entry.text()).split("-"),
                7: str(console_instance.ball1_7_Entry.text()).split("-"),
                8: str(console_instance.ball1_8_Entry.text()).split("-"),
                9: str(console_instance.ball1_9_Entry.text()).split("-"),
                10: str(console_instance.ball1_10_Entry.text()).split("-"),
            },
            2: {
                1: str(console_instance.ball2_1_Entry.text()).split("-"),
                2: str(console_instance.ball2_2_Entry.text()).split("-"),
                3: str(console_instance.ball2_3_Entry.text()).split("-"),
                4: str(console_instance.ball2_4_Entry.text()).split("-"),
                5: str(console_instance.ball2_5_Entry.text()).split("-"),
                6: str(console_instance.ball2_6_Entry.text()).split("-"),
                7: str(console_instance.ball2_7_Entry.text()).split("-"),
                8: str(console_instance.ball2_8_Entry.text()).split("-"),
                9: str(console_instance.ball2_9_Entry.text()).split("-"),
                10: str(console_instance.ball2_10_Entry.text()).split("-"),
            },
            3: {
                1: str(console_instance.ball3_1_Entry.text()).split("-"),
                2: str(console_instance.ball3_2_Entry.text()).split("-"),
                3: str(console_instance.ball3_3_Entry.text()).split("-"),
                4: str(console_instance.ball3_4_Entry.text()).split("-"),
                5: str(console_instance.ball3_5_Entry.text()).split("-"),
                6: str(console_instance.ball3_6_Entry.text()).split("-"),
                7: str(console_instance.ball3_7_Entry.text()).split("-"),
                8: str(console_instance.ball3_8_Entry.text()).split("-"),
                9: str(console_instance.ball3_9_Entry.text()).split("-"),
                10: str(console_instance.ball3_10_Entry.text()).split("-"),
            },
            4: {
                1: str(console_instance.ball4_1_Entry.text()).split("-"),
                2: str(console_instance.ball4_2_Entry.text()).split("-"),
                3: str(console_instance.ball4_3_Entry.text()).split("-"),
                4: str(console_instance.ball4_4_Entry.text()).split("-"),
                5: str(console_instance.ball4_5_Entry.text()).split("-"),
                6: str(console_instance.ball4_6_Entry.text()).split("-"),
                7: str(console_instance.ball4_7_Entry.text()).split("-"),
                8: str(console_instance.ball4_8_Entry.text()).split("-"),
                9: str(console_instance.ball4_9_Entry.text()).split("-"),
                10: str(console_instance.ball4_10_Entry.text()).split("-"),
            },
            5: {
                1: str(console_instance.ball5_1_Entry.text()).split("-"),
                2: str(console_instance.ball5_2_Entry.text()).split("-"),
                3: str(console_instance.ball5_3_Entry.text()).split("-"),
                4: str(console_instance.ball5_4_Entry.text()).split("-"),
                5: str(console_instance.ball5_5_Entry.text()).split("-"),
                6: str(console_instance.ball5_6_Entry.text()).split("-"),
                7: str(console_instance.ball5_7_Entry.text()).split("-"),
                8: str(console_instance.ball5_8_Entry.text()).split("-"),
                9: str(console_instance.ball5_9_Entry.text()).split("-"),
                10: str(console_instance.ball5_10_Entry.text()).split("-"),
            },
            6: {
                1: str(console_instance.ball6_1_Entry.text()).split("-"),
                2: str(console_instance.ball6_2_Entry.text()).split("-"),
                3: str(console_instance.ball6_3_Entry.text()).split("-"),
                4: str(console_instance.ball6_4_Entry.text()).split("-"),
                5: str(console_instance.ball6_5_Entry.text()).split("-"),
                6: str(console_instance.ball6_6_Entry.text()).split("-"),
                7: str(console_instance.ball6_7_Entry.text()).split("-"),
                8: str(console_instance.ball6_8_Entry.text()).split("-"),
                9: str(console_instance.ball6_9_Entry.text()).split("-"),
                10: str(console_instance.ball6_10_Entry.text()).split("-"),
            },
            7: {
                1: str(console_instance.ball7_1_Entry.text()).split("-"),
                2: str(console_instance.ball7_2_Entry.text()).split("-"),
                3: str(console_instance.ball7_3_Entry.text()).split("-"),
                4: str(console_instance.ball7_4_Entry.text()).split("-"),
                5: str(console_instance.ball7_5_Entry.text()).split("-"),
                6: str(console_instance.ball7_6_Entry.text()).split("-"),
                7: str(console_instance.ball7_7_Entry.text()).split("-"),
                8: str(console_instance.ball7_8_Entry.text()).split("-"),
                9: str(console_instance.ball7_9_Entry.text()).split("-"),
                10: str(console_instance.ball7_10_Entry.text()).split("-"),
            },
            8: {
                1: str(console_instance.ball8_1_Entry.text()).split("-"),
                2: str(console_instance.ball8_2_Entry.text()).split("-"),
                3: str(console_instance.ball8_3_Entry.text()).split("-"),
                4: str(console_instance.ball8_4_Entry.text()).split("-"),
                5: str(console_instance.ball8_5_Entry.text()).split("-"),
                6: str(console_instance.ball8_6_Entry.text()).split("-"),
                7: str(console_instance.ball8_7_Entry.text()).split("-"),
                8: str(console_instance.ball8_8_Entry.text()).split("-"),
                9: str(console_instance.ball8_9_Entry.text()).split("-"),
                10: str(console_instance.ball8_10_Entry.text()).split("-"),
            },
            9: {
                1: str(console_instance.ball9_1_Entry.text()).split("-"),
                2: str(console_instance.ball9_2_Entry.text()).split("-"),
                3: str(console_instance.ball9_3_Entry.text()).split("-"),
                4: str(console_instance.ball9_4_Entry.text()).split("-"),
                5: str(console_instance.ball9_5_Entry.text()).split("-"),
                6: str(console_instance.ball9_6_Entry.text()).split("-"),
                7: str(console_instance.ball9_7_Entry.text()).split("-"),
                8: str(console_instance.ball9_8_Entry.text()).split("-"),
                9: str(console_instance.ball9_9_Entry.text()).split("-"),
                10: str(console_instance.ball9_10_Entry.text()).split("-"),
            },

            10: {
                1: str(console_instance.ball10_1_Entry.text()).split("-"),
                2: str(console_instance.ball10_2_Entry.text()).split("-"),
                3: str(console_instance.ball10_3_Entry.text()).split("-"),
                4: str(console_instance.ball10_4_Entry.text()).split("-"),
                5: str(console_instance.ball10_5_Entry.text()).split("-"),
                6: str(console_instance.ball10_6_Entry.text()).split("-"),
                7: str(console_instance.ball10_7_Entry.text()).split("-"),
                8: str(console_instance.ball10_8_Entry.text()).split("-"),
                9: str(console_instance.ball10_9_Entry.text()).split("-"),
                10: str(console_instance.ball10_10_Entry.text()).split("-"),
            },

        }
        # 舍弃N期
        lines = console_instance.history_data

        line_a = lines[console_instance.first_n][2:12]
        line_b = lines[console_instance.first_n + 1][2:12]

        b_index = line_b.index(bet_index)
        a_ball = line_b[b_index]
        _bet_balls = dic[bet_index][a_ball]

        a_index = line_a.index(bet_index)
        bet_balls = [[a_index+1, v] for v in _bet_balls]

        logging.info("bet_balls=%s" % bet_balls)

        not_bet_balls = []
        ret = bet_balls, not_bet_balls

        logging.info(u"【下注中-算出球】下注=%s" % bet_balls)
        return ret
    except Exception, ex:
        logging.error(ex, exc_info=1)
