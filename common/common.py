# coding=utf-8
import requests

req_session = requests.Session()

# 对应网站的冠军-第十名的位置编码...
pk_ball_dic = {
    1: "000",
    2: "001",
    3: "002",
    4: "003",
    5: "004",
    6: "005",
    7: "006",
    8: "007",
    9: "008",
    10: "009",
}

ssc_ball_dic = {
    1: "000",
    2: "001",
    3: "002",
    4: "003",
    5: "004",
}

# 下注模式
BET_MODE_VERTICAL = 1  # 垂直下注
BET_MODE_HORIZONTAL = 2  # 水平下注

# 玩法
PLAYMODE_PK10 = 0
PLAYMODE_CQSSC = 1
PLAYMODE_XYFT = 2

# 获取历史结果数据
GETDATA_URL_PK10 = "http://kaijiang.500.com/static/info/kaijiang/xml/bjpkshi/%s.xml?_A=YFSAQORP1515509516031"  # 获取数据的网址
GETDATA_URL_SSC = "http://kaijiang.500.com/static/public/ssc/xml/qihaoxml/%s.xml?_A=YFSAQORP1515509516031"
GETDATA_XML_PATH = "config/history.xml"  # 模拟获取历史数据的存放点

# 重庆时时彩的默认赢输平，我们默认，普通情况下，是不需要平的，来一个就算赢。
win_ping_ssc_dic = {
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

}

# 北京赛车的默认赢输平，我们默认，普通情况下，是不需要平的，来一个就算赢。
win_ping_pk_dic = {
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
        'win_cnt': 1,
        'ping_cnt': -1,
    }
}

# 幸运飞艇的默认赢输平，我们默认，普通情况下，是不需要平的，来一个就算赢。
win_ping_xyft_dic = {
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
        'win_cnt': 1,
        'ping_cnt': -1,
    }
}

# 数据来源
KAIJIANG_DATA_SOURCE_500 = 0  # 500彩票网
KAIJIANG_DATA_SOURCE_SELF = 1  # 自家网站
