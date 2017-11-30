# coding=utf-8
import logging


def getCurrentTimestamp(bit_type=13):
    """
    :param bit_type: bit_type=10. 10位时间戳，bit_type=13，13位时间戳
    返回时间戳，python是10位.3位，这里为了和终端保持一致统一13位
    :return: -1 表示错误
    """
    import time
    if bit_type == 13:
        return int(round(time.time() * 1000))
    elif bit_type == 10:
        return int(round(time.time()))
    return -1


def beautiful_log(func):
    """
    专门用来打印日志的装饰器
    :param func:
    :return:
    """
    def new_func(*args, **kwargs):
        logging.info("############## START %s ##############" % func.__name__)
        ret = func(*args, **kwargs)
        logging.info("############## END %s ##############" % func.__name__)
        return ret
    return new_func

# 获取当前时间
def getTimeHour():
    import time
    times = time.localtime(time.time())
    hour = times[3]
