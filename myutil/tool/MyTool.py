# coding=utf-8
import json
import logging

import requests

from common import common
from common.common import req_session


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


def kaijiang_xml_helper_500caipiao(my_date, play_mode=common.PLAYMODE_PK10):
    """
    500 彩票网获取开奖数据

    :param my_date:
    :param play_mode:
    :return:
    """
    import xml.dom.minidom
    import requests
    from common.common import req_session

    t_date = my_date.replace("-", "")
    if play_mode == common.PLAYMODE_PK10:
        url = common.GETDATA_URL_PK10 % t_date
    else:
        url = common.GETDATA_URL_SSC % t_date
    r = requests.Request('GET', url)

    prep = req_session.prepare_request(r)
    rr = req_session.send(prep, stream=False, timeout=10, allow_redirects=False)
    with open(common.GETDATA_XML_PATH, 'w') as f:
        a = rr.content
        rr.close()
        dstr = a.decode('gb2312').encode('utf-8')
        dstr = dstr.replace('gb2312', 'utf-8')
        f.write(dstr)

    dom = xml.dom.minidom.parse(common.GETDATA_XML_PATH)
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


def kaijiang_self_helper(console_instance, date, play_mode):
    """
    但是这个必须登录！！！

    自家网站的数据
    :return:
    """
    now = getCurrentTimestamp()

    if play_mode == common.PLAYMODE_PK10:
        url = console_instance.loginSuccessData['origin_url'] + "pk/result/index?&_=%s__ajax" % now
    elif play_mode == common.PLAYMODE_XYFT:
        url = console_instance.loginSuccessData['origin_url'] + "xyft/result/index?&_=%s__ajax" % now
    else:
        url = console_instance.loginSuccessData['origin_url'] + "ssc/result/index?&_=%s__ajax" % now
    logging.info(u"获取自家网站数据，url=%s" % url)
    payload = {
        'date': date
    }
    r1 = requests.Request('POST', url, data=payload, headers=console_instance.loginSuccessData['headers'],
                          cookies=console_instance.loginSuccessData['cookies_jar'])
    prep1 = req_session.prepare_request(r1)
    rr1 = req_session.send(prep1, stream=False, timeout=10, allow_redirects=False)
    real_content = rr1.content.split('êêê')[0]
    rr1.close()

    real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
    json_data = json.loads(real_content)
    if int(json_data['state']) != 1:
        logging.error(u"【获取模拟用的历史数据线程】出错！")
        logging.error(real_content)
        return []
    else:
        return json_data['data']['result']
