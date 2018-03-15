# #coding:utf-8
import ctypes
import logging
import re

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *

from common import common
from common.common import req_session
from myutil.tool.MyTool import getCurrentTimestamp


class MyLoginThread(QtCore.QThread):
    def __init__(self, overlay, console):
        QtCore.QThread.__init__(self)
        self.overlay = overlay
        self.console_instance = console
        lines = str(self.console_instance.linesEntry.toPlainText())
        lines = lines.split('\n')
        lines = filter(lambda x: x, lines)  # 过滤空值的行...
        logging.info(u"【登录线程】切换线路=%s" % self.console_instance.lines_flag)

        self.loginUrl = str(lines[self.console_instance.lines_flag])
        self.host = self.loginUrl.replace("http://", "").split('/')[0]
        self.rootUrl = "http://" + self.host
        self.path = self.host + ''
        self.origin_url = ""
        self.headers = {}

        logging.info(u"【登录线程】lineText=%s" % lines)
        logging.info(u"【登录线程】loginUrl=%s" % self.loginUrl)
        logging.info(u"【登录线程】host=%s" % self.host)
        logging.info(u"【登录线程】rootUrl=%s" % self.rootUrl)
        logging.info(u"【登录线程】path=%s" % self.path)

    def getCidAndWebname(self):
        """
        获取cid和网站名字
        :return:
        """
        r1 = requests.Request('GET', self.loginUrl)
        prep1 = req_session.prepare_request(r1)
        rr1 = req_session.send(prep1, stream=False, timeout=10, allow_redirects=False)
        data = rr1.content
        rr1.close()
        with open('config/login.html', 'w') as f:
            f.write(data)
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
        logging.info(u"【登录线程】网站cid=%s" % cid)
        logging.info(u"【登录线程】网站cname=%s" % cname)
        return cid, cname

    # 从antivc获取验证码错误返回error
    def getCheckcode(self):
        dll = ctypes.windll.LoadLibrary('./config/AntiVC.dll')
        a = dll.LoadCdsFromFile('./config/laobapro.cds', '123qwe')
        yzm = '99999'
        file = './config/checkcode.png'
        if a != -1:
            ttt = dll.GetVcodeFromFile(a, file, yzm)
            return yzm
        else:
            return 'error'

    def login(self):
        """
        【登录线程】登录body=['/scowa14889f_40384/', 'http://host/scowa14889f/login/48b501bc42_rdsess/k', '']
        【登录线程】登录header={'Content-Length': '70', 'Set-Cookie': 'sysinfo=0; expires=Thu, 08-Feb-18 04:47:52 GMT;path=/scowa14889f_40384/, PHPSESSID=48b501bc42_1229_40384; path=/scowa14889f_40384/, PHPSESSID=48b501bc42_1229_40384; path=/scowa14889f/, AC=91eccfc5480de38333f67cd47e652f24|1518068272; path=/', 'Connection': 'keep-alive', 'Date': 'Thu, 08 Feb 2018 05:37:52 GMT', 'X-Frame-Options': 'SAMEORIGIN', 'Content-Type': 'text/plain; charset=utf-8'}
        【登录线程】cookies_jar=<<class 'requests.cookies.RequestsCookieJar'>[<Cookie AC=91eccfc5480de38333f67cd47e652f24|1518068272 for />, <Cookie PHPSESSID=48b501bc42_1229_40384 for /scowa14889f/>, <Cookie PHPSESSID=48b501bc42_1229_40384 for /scowa14889f_40384/>, <Cookie ysinfo=0 for Thu, 08-Feb-18 04:47:52 GMT>]>
        【登录线程】再次校验URL=http://pc10.sss22.us/scowa14889f/login/48b501bc42_rdsess/k
        origin_url=http://pc10.sss22.us/scowa14889f_40384/
        pk_pre_bet_get_data_url=http://pc10.sss22.us/scowa14889f_40384/pk/order/list?&_=1518068272384__autorefresh
        pk_post_bet_url=http://pc10.sss22.us/scowa14889f_40384/pk/order/leftInfo/?post_submit&&_=1518068272384__ajax

        :return:
        """

        my_cid, my_cname = self.getCidAndWebname()

        get_code_url1 = self.rootUrl + "/getCodeInfo/.auth?u=0.7473080656164435&systemversion=4_6&.auth"

        r1 = requests.Request('GET', get_code_url1)
        prep1 = req_session.prepare_request(r1)
        rr1 = req_session.send(prep1, stream=False, timeout=10, allow_redirects=False)
        a = rr1.content
        rr1.close()

        b = a.split('_')[0]
        __VerifyValue = a.split('_')[1]
        get_code_url2 = self.rootUrl + "/getVcode/.auth?t=%s&systemversion=4_6&.auth" % b

        r2 = requests.Request('GET', get_code_url2)
        prep2 = req_session.prepare_request(r2)
        rr2 = req_session.send(prep2, stream=False, timeout=10, allow_redirects=False)

        # r = requests.get(get_code_url2, timeout=10)
        with open('./config/checkcode.png', 'wb') as f:
            f.write(rr2.content)
            rr2.close()

        code = self.getCheckcode()
        logging.info(u"【登录线程】验证码=%s" % code)
        headers = {
            'Host': self.host,
            'Proxy-Connection': 'keep-alive',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
            'ajax': 'true',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Origin': 'http://' + self.host,
            'Referer': self.loginUrl,
        }

        payload = {
            'VerifyCode': code,
            '__VerifyValue': __VerifyValue,
            '__name': str(self.console_instance.userEntry.text()),
            'password': str(self.console_instance.passEntry.text()),
            'isSec': 0,
            'cid': my_cid,
            'cname': my_cname,
            'systemversion': '4_6'
        }

        r3 = requests.Request('POST', self.rootUrl + "/loginVerify/.auth", data=payload, headers=headers)
        prep3 = req_session.prepare_request(r3)
        rr3 = req_session.send(prep3, stream=False, timeout=5, allow_redirects=False)

        real_content = rr3.content.split('êêê')[0]
        rr3.close()

        if 'Request unsuccessful' in real_content:
            logging.error(u"【登录线程】请求登录body=Request unsuccessful")
            return {}

        real_content = real_content.replace('\xef\xbb\xbf', '')  # 去掉BOM开头的\xef\xbb\xbf
        a = real_content.split('\n')
        logging.info(u"【登录线程】登录body=%s" % a)
        logging.info(u"【登录线程】登录header=%s" % rr3.headers)
        if not a[1]:
            logging.error(u"【登录线程】验证码失败-1！")
            return {}

        recheck_url = a[1].replace('host', self.host)
        cookies_jar = requests.cookies.RequestsCookieJar()

        # 说明登录失败
        if 'Set-Cookie' not in rr3.headers:
            logging.error(u"【登录线程】验证码失败-2！")
            return {}

        a = rr3.headers['Set-Cookie']
        b = a.split('/,')
        ddd = "mobiLogin=0; sysinfo=ssc%7C1%7Cb%7Cuc%7Cbeishu100; navNum=0; "
        for i in b:
            if i[-6:] != 'path=/':
                i = i + '/'
            i = i[1:]
            if 'sys' in i:
                continue

            c = i.split(';')
            d = c[0].split('=')
            e = c[1].split('=')
            if '_' in e[1]:
                self.origin_url = "http://" + self.host + e[1]
            cookies_jar.set(d[0], d[1], path=e[1])
            if d[0] in ['PHPSESSID', 'AC']:
                d[1] = d[1].replace(' ', '')
                ddd += "%s=%s;" % (d[0], d[1])

        logging.info(u"【登录线程】cookies_jar=%s" % cookies_jar)

        headers2 = {
            'Host': self.host,
            'Proxy-Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': '%s.auth' % self.origin_url,
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        }
        self.headers = headers2
        logging.info(u"【登录线程】再次校验URL=%s" % recheck_url)

        r4 = requests.Request('GET', recheck_url, cookies=cookies_jar, headers=headers2)
        prep4 = req_session.prepare_request(r4)
        rr4 = req_session.send(prep4, stream=False, timeout=10, allow_redirects=False)
        rr4.close()

        return cookies_jar

    def run(self):
        try:
            if self.console_instance.fake_mode_login:
                cookies_jar = {'AC': 1}
            else:
                cookies_jar = self.login()

            if 'AC' in cookies_jar:
                name = self.console_instance.nameEntry.text()
                name += u"【已登录】"
                QMetaObject.invokeMethod(self.console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                         Q_ARG(str, name))

                now = getCurrentTimestamp()
                """
                北京赛车：
                http://pc10.sss44.us/scowa14889f_39473/pk/order/list/?&_=1520138330517__autorefresh
                http://pc10.sss44.us/scowa14889f_39473/pk/order/leftInfo/?post_submit&&_=1520138670443__ajax
                重庆时时彩：
                http://pc10.sss44.us/scowa14889f_39473/ssc/order/list/?&_=1520138330517__autorefresh
                http://pc10.sss44.us/scowa14889f_39473/ssc/order/leftInfo/?post_submit&&_=1520138670443__ajax
               """
                if self.console_instance.play_mode == common.PLAYMODE_PK10:
                    self.pk_pre_bet_get_data_url = self.origin_url.split("index.htm")[
                                                       0] + 'pk/order/list?&_=%s__autorefresh' % now
                    self.pk_post_bet_url = self.origin_url.split("index.htm")[
                                               0] + 'pk/order/leftInfo/?post_submit&&_=%s__ajax' % now
                else:
                    self.pk_pre_bet_get_data_url = self.origin_url.split("index.htm")[
                                                       0] + 'ssc/order/list?&_=%s__autorefresh' % now
                    self.pk_post_bet_url = self.origin_url.split("index.htm")[
                                               0] + 'ssc/order/leftInfo/?post_submit&&_=%s__ajax' % now
                logging.info(">>>origin_url=%s" % self.origin_url)
                logging.info(">>>pk_pre_bet_get_data_url=%s" % self.pk_pre_bet_get_data_url)
                logging.info(">>>pk_post_bet_url=%s" % self.pk_post_bet_url)

                # 把牛逼的参数传回去
                data_dic = {
                    "cookies_jar": cookies_jar,
                    "origin_url": self.origin_url,
                    "pk_pre_bet_get_data_url": self.pk_pre_bet_get_data_url,
                    "pk_post_bet_url": self.pk_post_bet_url,
                    "headers": self.headers
                }

                # 一旦登录成功，这开始获取两个数据：预下注数据 + 历史数据
                QMetaObject.invokeMethod(self.console_instance, "onLoginSuccess", Qt.QueuedConnection,
                                         Q_ARG(dict, data_dic))

                QMetaObject.invokeMethod(self.console_instance, "onGetPreBetDataHideBtn", Qt.QueuedConnection)
                QMetaObject.invokeMethod(self.console_instance, "onGetHistoryResultDataHideBtn", Qt.QueuedConnection)

            else:
                msg = u"获取数据异常..."
                QMetaObject.invokeMethod(self.console_instance, "onLoginFailed", Qt.QueuedConnection, Q_ARG(str, msg))
                name = self.console_instance.nameEntry.text()
                name += u"【未登录】"
                QMetaObject.invokeMethod(self.console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                         Q_ARG(str, name))
        except Exception, ex:
            logging.error(ex, exc_info=1)
            msg = u"登录失败，可能是动态获取验证码出问题，请重试！"
            QMetaObject.invokeMethod(self.console_instance, "onLoginFailed", Qt.QueuedConnection, Q_ARG(str, msg))
            name = self.console_instance.nameEntry.text()
            name += u"【未登录】"
            logging.info(u"【登录线程】%s" % name)
            QMetaObject.invokeMethod(self.console_instance.parent, "mySetWindowTitle", Qt.QueuedConnection,
                                     Q_ARG(str, name))
        finally:
            QMetaObject.invokeMethod(self.overlay, "myclose", Qt.QueuedConnection)
