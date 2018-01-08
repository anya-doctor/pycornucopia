# coding=utf-8
import time
from datetime import datetime
from datetime import timedelta


def gen_dates(b_date, days):
    day = timedelta(days=1)
    for i in range(days):
        yield b_date + day * i


def str2datetime(time_str, format="%Y-%m-%d"):
    """
    time_str = "2017-10-11 12:01:00"
    :param time_str:
    :return:
    """
    t = time.strptime(time_str, format)
    dt = datetime(*t[:6])
    return dt


def get_date_list(start=None, end=None):
    """
    获取日期列表
    :param start: 开始日期
    :param end: 结束日期
    :return:
    """
    if start is None:
        start = datetime.strptime("2000-01-01", "%Y-%m-%d")
    if end is None:
        end = datetime.now()
    if isinstance(start, str):
        start = str2datetime(start)
    if isinstance(end, str):
        end = str2datetime(end)

    data = []
    if (end - start).days == 0:
        return [start]
    else:
        for d in gen_dates(start, (end - start).days):
            data.append(d)
        return data
