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

# 获取历史结果数据
GETDATA_URL_PK10 = "http://kaijiang.500.com/static/info/kaijiang/xml/bjpkshi/%s.xml?_A=YFSAQORP1515509516031"  # 获取数据的网址
GETDATA_URL_SSC = "http://kaijiang.500.com/static/public/ssc/xml/qihaoxml/%s.xml?_A=YFSAQORP1515509516031"
GETDATA_XML_PATH = "config/history.xml"  # 模拟获取历史数据的存放点

# 网站名字
WEB = 1
WEB_DIC = {
    1 :{
        'name': "盛泰",
        'cid': 1050012,
        'owner': 'LM',
    },
    2 :{
        'name': "星际",
        'cid': 1229,
        'owner': 'HZS',
    }
}
