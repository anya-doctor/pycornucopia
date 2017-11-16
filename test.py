#coding=utf-8
import ctypes
import requests

host = "pc10.sss66.us"
path = host + ''

#从antivc获取验证码错误返回error
def getCheckcode():
    dll=ctypes.windll.LoadLibrary('./config/AntiVC.dll')
    a=dll.LoadCdsFromFile('./config/tr.cds','123qwe')
    yzm='99999'
    file = './config/checkcode.png'
    if a != -1:
        ttt=dll.GetVcodeFromFile(a,file,yzm)
        return yzm
    else:
        return 'error'

def login():
    get_code_url1 = "http://pc10.sss66.us/getCodeInfo/.auth?u=0.7473080656164435&systemversion=4_6&.auth"
    r = requests.get(get_code_url1)
    a = r.content
    print a
    b = a.split('_')[0]
    __VerifyValue = a.split('_')[1]
    get_code_url = "http://pc10.sss66.us/getVcode/.auth?t=%s&systemversion=4_6&.auth" % b

    r = requests.get(get_code_url)
    with open('./config/checkcode.png', 'wb') as f:
        f.write(r.content)

    code = getCheckcode()
    print code
    host_url = 'pc10.sss66.us'
    headers = {
            'Host': host_url,
            'Proxy-Connection': 'keep-alive',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
            'ajax': 'true',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Origin': 'http://' + host_url,
            'Referer': 'http://pc10.sss66.us/scowa1414556f/.auth?214808',
    }

    payload={
        'VerifyCode': code,
        '__VerifyValue': __VerifyValue,
        '__name': 'GG238989',
        'password': 'Aa147258',
        'isSec': 0,
        'cid':1229,
        'cname':'星际',
        'systemversion': '4_6'
    }
    r = requests.post("http://pc10.sss66.us/loginVerify/.auth", data=payload,  headers=headers, timeout=5)
    real_content = r.content.split('êêê')[0]
    real_content = real_content.replace('\xef\xbb\xbf','')  # 去掉BOM开头的\xef\xbb\xbf
    print real_content

    a = real_content.split('\n')
    print a
    print r.headers

    # 好的，拿到了path
    global path
    path = a[0]

    recheck_url = a[1].replace('host', host)
    cookies_jar = requests.cookies.RequestsCookieJar()
    a = r.headers['Set-Cookie']
    b = a.split('/,')
    ddd = "mobiLogin=0; sysinfo=ssc%7C1%7Cb%7Cuc%7Cbeishu100; navNum=0; "
    for i in b:
        if i[-6:] != 'path=/':
            i = i+ '/'

        print "###>>>", i
        i = i[1:]
        if 'sys' in i:
            continue

        c = i.split(';')
        d = c[0].split('=')
        e = c[1].split('=')
        if '_' in e[1]:
            origin_url = host + e[1]
        cookies_jar.set(d[0],d[1],path=e[1])
        print "&&&&&&&&&&", d
        if d[0] in ['PHPSESSID', 'AC']:
            d[1] = d[1].replace(' ', '')
            ddd += "%s=%s;" % (d[0], d[1])
    print cookies_jar
    headers2 = {
        'Host': 'pc10.sss66.us',
        'Proxy-Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'http://pc10.sss66.us/scowa1414556f/.auth',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    }
    r = requests.get(recheck_url,  cookies=cookies_jar, headers=headers2)

    return cookies_jar

def get_pre_data(cookies_jar):
    headers3 = {
        'Host': 'pc10.sss66.us',
        'Proxy-Connection': 'keep-alive',
        'Accept':'*/*',
        'Origin': 'http://pc10.sss66.us',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
        'ajax': 'true',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://pc10.sss66.us/scowa1414556f_50383/index.htm?20902_20903_4.6.trunk_20150316',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    }
    r = requests.post("http://pc10.sss66.us/scowa1414556f_50383/pk/order/list?&_=1510588037893__ajax",  cookies=cookies_jar, headers=headers3)
    real_content = r.content.split('êêê')[0]
    real_content = real_content.replace('\xef\xbb\xbf','')  # 去掉BOM开头的\xef\xbb\xbf
    print real_content


cookies_jar = login()
pre_bet_data = get_pre_data(cookies_jar)
print



#
#
# host = "pc10.sss66.us"
# origin_url = ''
#
# """
# Set-Cookie: sysinfo=0; expires=Sun, 12-Nov-17 14:24:47 GMT;path=/scowa1414556f_50383/
# Set-Cookie: PHPSESSID=35c1c37594_1229_50383; path=/scowa1414556f_50383/
# Set-Cookie: PHPSESSID=35c1c37594_1229_50383; path=/scowa1414556f/
# Set-Cookie: AC=2408c659ec13819ed9cf0ec9189828c0|1510499690; path=/
#
# =================>>>>>>> PHPSESSID ad8fdccf6f_1229_50383 pc10.sss44.us /scowa1414556f_50383/
# =================>>>>>>> PHPSESSID ad8fdccf6f_1229_50383 pc10.sss44.us /scowa1414556f/
# =================>>>>>>> AC abf7dc54273745e56404729cbc727aea|1510501181 pc10.sss44.us /
#
#
# """
# cookies_jar = requests.cookies.RequestsCookieJar()
# a = r.headers['Set-Cookie']
# b = a.split('/,')
# ddd = "mobiLogin=0; sysinfo=ssc%7C1%7Cb%7Cuc%7Cbeishu100; navNum=0; "
# for i in b:
#     if i[-6:] != 'path=/':
#         i = i+ '/'
#
#     print "###>>>", i
#     i = i[1:]
#     if 'sys' in i:
#         continue
#
#     c = i.split(';')
#     d = c[0].split('=')
#     e = c[1].split('=')
#     if '_' in e[1]:
#         origin_url = host + e[1]
#     cookies_jar.set(d[0],d[1],path=e[1])
#     print "&&&&&&&&&&", d
#     if d[0] in ['PHPSESSID', 'AC']:
#         d[1] = d[1].replace(' ', '')
#         ddd += "%s=%s;" % (d[0], d[1])
#
# cookies_jar.set('sysinfo','0',path='/scowa1414556f_50383/')
# cookies_jar.set('expires','=Mon, 13-Nov-17 13:24:50 GMT',path='/scowa1414556f_50383/')
# cookies_jar.set('expires','=Mon, 13-Nov-17 13:24:50 GMT',path='/scowa1414556f_50383/')
# cookies_jar.set('navNum','0',path='/scowa1414556f_50383/')
# cookies_jar.set('mobiLogin','0',path='/scowa1414556f_50383/')
# print "dddd=========", ddd
#
# print "==========================cookie_jar==========================="
# print r.headers
# print cookies_jar
#
# def getCurrentTimestamp(bit_type=13):
#         """
#         :param bit_type: bit_type=10. 10位时间戳，bit_type=13，13位时间戳
#         返回时间戳，python是10位.3位，这里为了和终端保持一致统一13位
#         :return: -1 表示错误
#         """
#         import time
#         if bit_type == 13:
#             return int(round(time.time() * 1000))
#         elif bit_type == 10:
#             return int(round(time.time()))
#         return -1
#
# print "=================GET PRE BET DATA====================="
# now = getCurrentTimestamp()
# pk_pre_bet_get_data_url = 'http://'+origin_url + 'pk/order/list?&_=%s__autorefresh' % now
# pk_post_bet_url =  'http://'+origin_url  + 'pk/order/leftInfo/?post_submit&&_=%s__ajax' % now
# print "pk_pre_bet_get_data_url=%s" % pk_pre_bet_get_data_url
# print "pk_post_bet_url=%s" % pk_post_bet_url
# payload={
#     'action': 'ajax',
#     'play': 'ballNO15',
#     'ball': '',
#     'cat': 15
# }
# headers = {
#             'Host': host,
#             'Proxy-Connection': 'keep-alive',
#             'Accept': '*/*',
#             'X-Requested-With': 'XMLHttpRequest',
#             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
#             'ajax': 'true',
#             'Referer': 'http://pc10.sss66.us/scowa1414556f_50383/index.htm?20902_20903_4.6.trunk_20150316',
#             'Accept-Encoding': 'gzip, deflate',
#             'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
#             'Origin': 'http://' + host_url,
#             "X-Frame-Options": "SAMEORIGIN",
#             "Cookie": ddd,
#         }
# print "header=", headers
# cookies_jar.set('ValidatorAlert','')
# cookies_jar.set('mobiLogin','0')
# cookies_jar.set('navNum','0')
# import urllib
# aaa = urllib.quote('ssc|1|b|uc|beishu100')
# cookies_jar.set('sysinfo',aaa)
#cookies_jar.clear('expires')
# r = requests.post(pk_pre_bet_get_data_url, data=payload, cookies=cookies_jar, headers=headers, timeout=5)
#
#
# real_content = r.content.split('êêê')[0]
# real_content = real_content.replace('\xef\xbb\xbf','')  # 去掉BOM开头的\xef\xbb\xbf
# print real_content
#
#
# """
# GET http://pc10.sss66.us/scowa1414556f_50383/ssc/order/list/?&_=1510498601034__ajax HTTP/1.1
# Host: pc10.sss66.us
# Proxy-Connection: keep-alive
# Accept: */*
# X-Requested-With: XMLHttpRequest
# User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36
# ajax: true
# Referer: http://pc10.sss66.us/scowa1414556f_50383/index.htm?20902_20903_4.6.trunk_20150316
# Accept-Encoding: gzip, deflate
# Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
# Cookie: PHPSESSID=690695f24b_1229_50383; mobiLogin=0; sysinfo=ssc%7C1%7Cb%7Cuc%7Cbeishu100; ValidatorAlert=; navNum=0; AC=d260fdb3588376d0ca3f7f3a17dcb966|1510498612
#                   35c1c37594_1229
#
# """