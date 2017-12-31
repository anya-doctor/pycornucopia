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

# 下注模式
BET_MODE_VERTICAL = 1  # 垂直下注
BET_MODE_HORIZONTAL = 2  # 水平下注
