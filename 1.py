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

# my_header = {
#     'Referer': 'http://pc10.1ll11.com/scowa148054f/user/login.html.auth',
#     'Accept-Encoding': 'gzip, deflate',
#     'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
#     'Accept': '*/*',
#     'Connection': 'keep-alive',
#     'Host': 'pc10.1ll11.com',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
# }
#
# url = "http://pc10.1ll11.com/getCodeInfo/.auth?u=0.9270315216745018&systemversion=4_6&.auth"
# import requests
# r = requests.get(url, headers=my_header)
# print r.content
# with open('aaa.html', 'w') as f:
#     print type(r)
#     f.write(r.content.encode("utf-8"))
import urllib2

from selenium import webdriver
from selenium.webdriver import DesiredCapabilities

############################阶段 1######################
desired_capabilities= DesiredCapabilities.PHANTOMJS.copy()
headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',#这种修改 UA 也有效
    'Connection': 'keep-alive',
    'Referer':'Referer: http://',
}

for key, value in headers.iteritems():
    desired_capabilities['phantomjs.page.customHeaders.{}'.format(key)] = value

desired_capabilities['phantomjs.page.customHeaders.User-Agent'] ='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'

loginUrl = "http://pc10.x.l11ll.ninja/scowa148054f/user/login.html.auth"
driver = webdriver.PhantomJS(executable_path='config/phantomjs.exe', desired_capabilities=desired_capabilities)
driver.get(loginUrl)
with open('config/login.html', 'w') as f:
    f.write(driver.page_source.encode("utf-8"))
print "download done..."

############################阶段 2######################
import re
with open('config/login.html', 'r') as f:
    lines = f.readlines()
    """
    <input type="hidden" name="cid" value="1050012" />
    <input type="hidden" name="cname" value="盛泰" />
    """
    cid = cname = ""
    for line in lines:
        if 'name="cid"' in line:
            print line
            print re.findall(r'[\d]+', line)
            cid = int(re.findall(r'[\d]+', line)[0])

        if 'name="cname"' in line:
            print line
            print re.findall(r'value=".*"', line)
            a = re.findall(r'value=".*"', line)[0]
            b = a.split('="')[-1]
            c = b.replace('"', '')
            cname = c.decode('utf-8')
print cid, cname
print "cid, cname done..."

############################阶段 3######################
get_code_url1 =  "http://pc10.x.l11ll.ninja/getCodeInfo/.auth?u=0.8778433954616613&systemversion=4_6&.auth"

my_header = {
    'Referer': "http://pc10.x.l11ll.ninja/scowa148054f/user/login.html.auth",
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Host': "pc10.x.l11ll.ninja",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
    'Cookie': 'visid_incap_1684176=3DR/og/LRrSgS40LmYZWLS4N81oAAAAAQUIPAAAAAACZc8pcb4+O3hf9oVMFP6gk; persist=ALLNKIMA; incap_ses_200_1684176=F3VLLqbzG00Z/LCgvYvGAiNf9FoAAAAAYLY2KOW83jlMzibH/tpHBg==; incap_ses_484_1684176=BjzLamETLyQrJjb144O3Bnlk9FoAAAAAyXscHNOAk97JohVjwN1/Qg=='
}
import requests
r = requests.get(get_code_url1, headers=my_header)
print r.content
haha = str(r.content).split('_')[0]
############################阶段 4######################
"""
GET http://pc10.x.l11ll.ninja/getVcode/.auth?t=c412379253204&systemversion=4_6&.auth HTTP/1.1
Accept: */*
Accept-Language: en-US,en;q=0.8
Cache-Control: max-age=0
Connection: keep-alive
Referer: Referer: http://
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
Cookie: visid_incap_1684176=8T4pt/XIQcKXbr/KozhSBbhr9FoAAAAAQUIPAAAAAADRYLVaRyqBg/90zF1np8fC; incap_ses_200_1684176=khisSKFInjGPVbigvYvGArhr9FoAAAAAX7toGDhHUk7M1gdRt0f23A==; persist=ALLNKIMA
Accept-Encoding: gzip, deflate
Host: pc10.x.l11ll.ninja
"""
my_header = {
    'Referer': "Referer: http://",
    "Cache-Control": "max-age=0",
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Host': "pc10.x.l11ll.ninja",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
    'Cookie': 'visid_incap_1684176=3DR/og/LRrSgS40LmYZWLS4N81oAAAAAQUIPAAAAAACZc8pcb4+O3hf9oVMFP6gk; persist=ALLNKIMA; incap_ses_200_1684176=F3VLLqbzG00Z/LCgvYvGAiNf9FoAAAAAYLY2KOW83jlMzibH/tpHBg==; incap_ses_484_1684176=BjzLamETLyQrJjb144O3Bnlk9FoAAAAAyXscHNOAk97JohVjwN1/Qg=='
}

url = "http://pc10.x.l11ll.ninja/getVcode/.auth?t=%s&systemversion=4_6&.auth" % haha
r = requests.get(url, headers=my_header)
from PIL import Image
from io import BytesIO

i = Image.open(BytesIO(r.content))
i.save("config/aaaa.png", "JPEG")
# with open("config/aaa.png", 'w') as f:
#     f.write(r.content)

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