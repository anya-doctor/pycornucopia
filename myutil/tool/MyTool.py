# coding=utf-8
import logging


def getToday():
    import datetime
    today = datetime.datetime.today()
    return today.strftime("%Y-%m-%d")


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


# 获取当前时间-str
def getCurrentTimeStr():
    import time
    times = time.localtime(time.time())
    return "%s-%s - %s:%s" % (times[1], times[2], times[3], times[4])


def xml_helper(my_date):
    import xml.dom.minidom
    import requests
    from common.common import req_session

    t_date = my_date.replace("-", "")
    url = "http://kaijiang.500.com/static/info/kaijiang/xml/bjpkshi/%s.xml?_A=YFSAQORP1515509516031" % t_date
    r = requests.Request('GET', url)

    prep = req_session.prepare_request(r)
    rr = req_session.send(prep, stream=False, timeout=10, allow_redirects=False)
    with open('config/history.xml', 'w') as f:
        a = rr.content
        rr.close()
        dstr = a.decode('gb2312').encode('utf-8')
        dstr = dstr.replace('gb2312', 'utf-8')
        f.write(dstr)

    dom = xml.dom.minidom.parse('config/history.xml')
    root = dom.documentElement
    rows = root.getElementsByTagName("row")
    res = []
    for row in rows:
        opentime = row.getAttribute("opentime")
        if my_date not in opentime:
            continue
        qishu = row.getAttribute("expect")
        opencode = row.getAttribute("opencode")
        # 组装成["660822", "01-09 - 22:57", 7, 2, 10, 1, 9, 6, 5, 3, 4, 8, 9
        t = [str(qishu), opentime]
        t1 = opencode.split(",")
        for t2 in t1:
            t.append(int(t2))
        res.append(t)
    return res
