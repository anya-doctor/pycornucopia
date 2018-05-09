#coding=utf-8
"""
GET http://pc10.1ll11.com/getCodeInfo/.auth?u=0.9270315216745018&systemversion=4_6&.auth HTTP/1.1
Host: pc10.1ll11.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36
Accept: */*
Referer: http://pc10.1ll11.com/scowa148054f/user/login.html.auth
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
"""

my_header = {
    'Referer': 'http://pc10.1ll11.com/scowa148054f/user/login.html.auth',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Host': 'pc10.1ll11.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
}

url = "http://pc10.1ll11.com/getCodeInfo/.auth?u=0.9270315216745018&systemversion=4_6&.auth"
import requests
r = requests.get(url, headers=my_header)
print r.content
with open('aaa.html', 'w') as f:
    print type(r)
    f.write(r.content.encode("utf-8"))
#
# url = "http://pc10.x.l11ll.ninja/scowa148054f/user/login.html.auth"
# from selenium import webdriver
#
# import requests
# driver = webdriver.PhantomJS(executable_path='config/phantomjs.exe')
# driver.get(url)
# data = driver.page_source
# print data
# r = driver.page_source
# with open('login.html', 'w') as f:
#     print type(r)
#     f.write(r.encode("utf-8"))
# import re
# with open('login.html', 'r') as f:
#     lines = f.readlines()
#     """
#     <input type="hidden" name="cid" value="1050012" />
#     <input type="hidden" name="cname" value="盛泰" />
#     """
#     cid = cname = ""
#     for line in lines:
#         if 'name="cid"' in line:
#             print line
#             print re.findall(r'[\d]+', line)
#             cid = int(re.findall(r'[\d]+', line)[0])
#
#         if 'name="cname"' in line:
#             print line
#             print re.findall(r'value=".*"', line)
#             a = re.findall(r'value=".*"', line)[0]
#             b = a.split('="')[-1]
#             c = b.replace('"', '')
#             cname = c.decode('utf-8')
# print cid, cname