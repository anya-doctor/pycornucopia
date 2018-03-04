# coding=utf-8
import logging

from core import MyAlgorithm


def run(console_instance):
    """
    目前只会垂直模式的下注，水平模式没灵感啊...
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
    # 如果不為空
    else:
        # 如果是期期滾
        if console_instance.isQQG:
            step_2_qiqigun_run(console_instance)
        # 如果是常規模式
        else:
            step_3_normal_run(console_instance)
            # 动态处理增加或删除下注list，跟进第一列的0 1
            dynamic_remove_or_add_betlist(console_instance)


def step_1_init_run(console_instance):
    """
    步骤1，初始化的下注...
    :param console_instance:
    :return:
    """
    logging.info(u"【下注中】下注列表為空，初始化...")
    for i in range(1, 11):
        # 那就是过滤掉了...
        switch_dic = get_switch_dic(console_instance)
        if switch_dic[i] == 0:
            continue

        a, b = MyAlgorithm.get_bet_list(console_instance, i)
        if a:
            # 如果a是tuple，说明a想要一个位置下注多条
            if isinstance(a, tuple):
                # 组装  [timestart, timesnow, betflag, [[point, ball],[point, ball],...]], point, inner_index, record_list, win_flag]
                # item[6] = record_list = [[1,1],[1,2],TRUE]  反正最后一个元素表示中不中。。。
                for j in range(len(a)):
                    # 如果多个孩子，有一个孩子是[] 或者['']，则放弃它
                    if not a[j]:
                        continue
                    if len(a[j]) == 1 and not a[j][0]:
                        continue

                    c = [[i, v] for v in a[j]]
                    console_instance.all_ball_needToBetList.append(
                            [console_instance.timesnow, console_instance.timesnow, 0, c, i, j, [], ''])
            # 如果a是list，说明就下注这个list即可
            elif isinstance(a, list):
                c = [[i, v] for v in a]
                console_instance.all_ball_needToBetList.append(
                        [console_instance.timesnow, console_instance.timesnow, 0, c, i, 0, [], ''])


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
            # 如果a是tuple，说明a想要一个位置下注多条
            if isinstance(a, tuple):
                # 组装  [timestart, timesnow, betflag, [[point, ball],[point, ball],...]], point, inner_index, record_list, win_flag]
                for j in range(len(a)):
                    # 如果多个孩子，有一个孩子是[]，则放弃它
                    if not a[j]:
                        continue
                    if len(a[j]) == 1 and not a[j][0]:
                        continue
                    c = [[i, v] for v in a[j]]
                    console_instance.all_ball_needToBetList.append(
                            [console_instance.timesnow, console_instance.timesnow, 0, c, i, j, [], ''])
            # 如果a是list，说明就下注这个list即可
            elif isinstance(a, list):
                c = [[i, v] for v in a]
                console_instance.all_ball_needToBetList.append(
                        [console_instance.timesnow, console_instance.timesnow, 0, c, i, 0, [], ''])


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
            # 如果a是tuple，说明a想要一个位置下注多条
            if isinstance(a, tuple):
                # 组装  [timestart, timesnow, betflag, [[point, ball],[point, ball],...]], point, inner_index, record_list, win_flag]
                mother_son_list = []
                for x_index, x in enumerate(console_instance.all_ball_needToBetList):
                    if x[0] == item[0] and x[1] == item[1] and x[4] == item[4]:
                        mother_son_list.append(x_index)
                logging.info(u"【下注中】找到母子序列号：%s" % mother_son_list)

                assert len(a) == len(mother_son_list)

                for j in range(len(a)):
                    # 因为这里也能决定别的兄弟的n期换更新，所以加一个限制条件
                    # 不满足条件的就continue
                    if console_instance.n_change > 0 and int(
                            console_instance.all_ball_needToBetList[mother_son_list[j]][
                                2]) % console_instance.n_change != 0:  # 说明n期换配置不起作用
                        continue
                    c = [[index, v] for v in a[j]]
                    console_instance.all_ball_needToBetList[mother_son_list[j]][3] = c
            # 如果a是list，说明就下注这个list即可
            elif isinstance(a, list):
                c = [[index, v] for v in a]
                item[3] = c


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


def dynamic_remove_or_add_betlist(console_instance):
    """
    动态处理增加或删除下注list，跟进第一列的0 1
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
    for key, value in dic.iteritems():
        # 如果已经放弃了这一条，那么就从下注list中去除
        if value == 0:
            t = filter(lambda x: int(x[4]) == key, console_instance.all_ball_needToBetList)
            if len(t) > 0:
                console_instance.all_ball_needToBetList = filter(lambda x: int(x[4]) != key,
                                                                 console_instance.all_ball_needToBetList)
        # 如果之前没有这一条，那么就加到下注list中
        elif value == 1:
            t = filter(lambda x: int(x[4]) == key, console_instance.all_ball_needToBetList)
            if len(t) == 0:
                a, b = MyAlgorithm.get_bet_list(console_instance, key)
                if a:
                    # 如果a是tuple，说明a想要一个位置下注多条
                    if isinstance(a, tuple):
                        # 组装  [timestart, timesnow, betflag, [[point, ball],[point, ball],...]], point, inner_index, record_list, win_flag]
                        # item[6] = record_list = [[1,1],[1,2],TRUE]  反正最后一个元素表示中不中。。。
                        for j in range(len(a)):
                            # 如果多个孩子，有一个孩子是[] 或者['']，则放弃它
                            if not a[j]:
                                continue
                            if len(a[j]) == 1 and not a[j][0]:
                                continue

                            c = [[key, v] for v in a[j]]
                            console_instance.all_ball_needToBetList.append(
                                    [console_instance.timesnow, console_instance.timesnow, 0, c, key, j, [], ''])
                    # 如果a是list，说明就下注这个list即可
                    elif isinstance(a, list):
                        c = [[key, v] for v in a]
                        console_instance.all_ball_needToBetList.append(
                                [console_instance.timesnow, console_instance.timesnow, 0, c, key, 0, [], ''])

    # 重新排个序吧少年
    console_instance.all_ball_needToBetList.sort(key=lambda x: (x[0], x[1], x[4]))
