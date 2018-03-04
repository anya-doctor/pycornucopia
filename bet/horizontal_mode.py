# coding=utf-8
import logging

from core import MyAlgorithm


def run(console_instance):
    """
    水平模式...
    all_ball_needToBetList = [
        [timestart, timesnow, betflag, [[point, ball],[point, ball],...]], point, inner_index, record_list, win_flag]
        # item[6] = record_list = [[1,1],[1,2],TRUE]  反正最后一个元素表示中不中。。。
        ...
    ]
    :param console_instance:
    :param bet_mode:
    :return:
    """
    # 如果下注列表為空則初始化
    if not console_instance.all_ball_needToBetList:
        step_1_init_run(console_instance)
    elif console_instance.isQQG:  # 期期滚模式
        step_2_qiqigun_run(console_instance)
    else:  # 常規模式
        step_3_normal_run(console_instance)


def step_1_init_run(console_instance):
    """
    步骤1，初始化的下注...
    :param console_instance:
    :return:
    """
    logging.info(u"【水平下注中】下注列表為空，初始化...")
    for i in range(1, 11):
        # 那就是过滤掉了...
        switch_dic = get_switch_dic(console_instance)
        if switch_dic[i] == 0:
            continue

        a, b = MyAlgorithm.get_bet_list(console_instance, i)
        if a:
            # 如果a是list，说明就下注这个list即可
            if isinstance(a, list):
                c = a
                console_instance.all_ball_needToBetList.append(
                        [console_instance.timesnow, console_instance.timesnow, 0, c, i, 0, [], ""])


def step_2_qiqigun_run(console_instance):
    """
    步骤2，如果是期期滚，则逻辑步入
    :param console_instance:
    :return:
    """
    logging.info(u"【下注中】下注列表不為空，進入期期滾模式...")
    for i in range(1, 11):
        # 那就是过滤掉了...
        switch_dic = get_switch_dic(console_instance)
        if switch_dic[i] == 0:
            continue

        a, b = MyAlgorithm.get_bet_list(console_instance, i)
        if a:
            # 如果a是list，说明就下注这个list即可
            if isinstance(a, list):
                console_instance.all_ball_needToBetList.append(
                        [console_instance.timesnow, console_instance.timesnow, 0, a, i, 0, [], ""])


def step_3_normal_run(console_instance):
    """
    步骤3，如果是常规下注，则逻辑步入
    :param console_instance:
    :return:
    """
    logging.info(u"【下注中】下注列表不為空，進入常規模式...")
    # 更新期数...
    for item in console_instance.all_ball_needToBetList:
        item[1] = console_instance.timesnow

    for item in console_instance.all_ball_needToBetList:
        if console_instance.n_change == 0:  # 说明n期换配置不起作用
            pass
        else:
            # 如果n期换配置起作用，但是还没到轮换点，则跳过
            if int(item[2]) == 0:  # 说明中了
                pass
            elif int(item[2]) % console_instance.n_change != 0:
                continue
        # 替換新的下注列表
        index = item[4]
        a, b = MyAlgorithm.get_bet_list(console_instance, index)
        if not a:
            item[3] = []
        else:
            # 如果a是list，说明就下注这个list即可
            if isinstance(a, list):
                item[3] = a


def get_switch_dic(console_instance):
    """
    返回10条线路的开关dic
    :param console_instance:
    :return:
    """
    dic = {
        1: int(console_instance.ball0_1_Entry.text()),
        2: int(console_instance.ball0_2_Entry.text()),
        3: int(console_instance.ball0_3_Entry.text()),
        4: int(console_instance.ball0_4_Entry.text()),
        5: int(console_instance.ball0_5_Entry.text()),
        6: int(console_instance.ball0_6_Entry.text()),
        7: int(console_instance.ball0_7_Entry.text()),
        8: int(console_instance.ball0_8_Entry.text()),
        9: int(console_instance.ball0_9_Entry.text()),
        10: int(console_instance.ball0_10_Entry.text()),
    }
    return dic
