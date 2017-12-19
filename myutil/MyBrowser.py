# #coding:utf-8
import json
import logging

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *
from PyQt4.QtWebKit import *


class MyBrowser(QWebView):
    def __init__(self):
        QWebView.__init__(self)
        
        # 增加cookie
        self.cookies = {}
        self.cookies_jar = requests.cookies.RequestsCookieJar()
        
        # url
        self.host_url = ""
        self.origin_url = ""
        self.pk_pre_bet_get_data_url = ""
        self.pk_post_bet_url = "http://pc10.sss66.us/scowa1414556f_50383/pk/order/leftInfo/?post_submit&&_=1510466638396__ajax"
        # headers
        self.headers = {}
        
        # 初始化一些必要的参数
        #t=010|0|1.9829|2; 000|1|9.9112|2; 011|1|1.9829|3;&v=37
        # 冠军大 - 2
        # 亚军小 - 3   011|1|1.9829|3
        # 冠军 1 - 2   000|1|9.9112|2
        self.Playtype_pk10 = {
            "000": "冠军",
            "001": "亚军",
            "002": "第三名",
            "003": "第四名",
            "004": "第五名",
            "005": "第六名",
            "006": "第七名",
            "007": "第八名",
            "008": "第九名",
            "009": "第十名",
            "010": "冠军",
            "011": "亚军",
            "012": "第三名",
            "013": "第四名",
            "014": "第五名",
            "015": "第六名",
            "016": "第七名",
            "017": "第八名",
            "018": "第九名",
            "019": "第十名",
            "020": "冠军",
            "021": "亚军",
            "022": "第三名",
            "023": "第四名",
            "024": "第五名",
            "025": "第六名",
            "026": "第七名",
            "027": "第八名",
            "028": "第九名",
            "029": "第十名",
            "030": "冠军",
            "031": "亚军",
            "032": "第三名",
            "033": "第四名",
            "034": "第五名",
            "035": "冠亚{#|5927|5c0f#}",
            "036": "{#|51a0|4e9a|5355|53cc#}",
            "037": "冠亚和"
        }
        self.category_pk10 = {
            "000": "00",
            "001": "01",
            "002": "02",
            "003": "03",
            "004": "04",
            "005": "05",
            "006": "06",
            "007": "07",
            "008": "08",
            "009": "09",
            "010": "10",
            "011": "10",
            "012": "10",
            "013": "10",
            "014": "10",
            "015": "10",
            "016": "10",
            "017": "10",
            "018": "10",
            "019": "10",
            "020": "11",
            "021": "11",
            "022": "11",
            "023": "11",
            "024": "11",
            "025": "11",
            "026": "11",
            "027": "11",
            "028": "11",
            "029": "11",
            "030": "12",
            "031": "12",
            "032": "12",
            "033": "12",
            "034": "12",
            "035": "13",
            "036": "14",
            "037": "15"
        }
    def setConsole(self,con):
        self.webpage = QWebPage()
        self.console = con
        self.setPage(self.webpage)
        if self.console.lines:
            self.line_url = self.console.lines[self.console.lines_flag]
        else:
            self.line_url = 'http://www.baidu.com'

        # if not MySettings.browser_js_alert:
            # self.webpage.javaScriptAlert = self._javascript_alert  # 重载 alert函数

        self.load(QtCore.QUrl(self.line_url))
        QtCore.QObject.connect(self, QtCore.SIGNAL('loadFinished(bool)'), self.do_loadFinished)
        #QtCore.QObject.connect(self, QtCore.SIGNAL('load(bool)'), self.do_loadFinished)
        QtCore.QObject.connect(self, QtCore.SIGNAL('urlChanged(bool)'), self.urlChanged)

    # 重写js alert，让它自动确定
    def _javascript_alert(self, webframe, message):
        return

    def urlChanged(self):
        logging.info(u'urlChanged..')
        self.param_init()
        frame = self.page().currentFrame()
        if not self.origin_url or 'login.htm' in self.origin_url:
            self.login_user()

    def do_loadFinished(self):
        frame = self.page().currentFrame()

        logging.info(u'Page load..%s. ' % frame.title())
        logging.info(u"用户名：%s, 密码：%s." % (self.console.username, self.console.password))
        logging.info(u"origin_url=%s." % (self.origin_url))
        
        if not self.origin_url or 'login.htm' in self.origin_url:
            self.login_user()
        
        self.param_init()
        
        if 'index.htm' in self.origin_url:
            logging.info("start login_agree1...")
            QMetaObject.invokeMethod(self, "login_agree1", Qt.QueuedConnection)


    # 响应登录-用户名
    @pyqtSlot()
    def login_user(self):
        # 勾选密码checkbox
        doc = self.page().currentFrame().documentElement()
        sec_item = doc.findFirst('input[id=sec]')
        sec_item.evaluateJavaScript("if(this.checked){this.click();}")

        # 输入用户名
        user_elem = doc.findFirst('input[name=__name]')
        user_elem.evaluateJavaScript("this.value='"+self.console.username+"';")

        QTimer.singleShot(500, self.login_password)

    @pyqtSlot()
    def login_password(self):
        logging.info("def login_password")
        # 输入密码
        doc = self.page().currentFrame().documentElement()
        pass_elem = doc.findFirst('input[name=password]')
        pass_elem.evaluateJavaScript("this.focus();")
        pass_elem.evaluateJavaScript("this.type='password';")
        pass_elem.evaluateJavaScript("this.value='"+self.console.password+"';")

    @pyqtSlot(str)
    def refresh(self, line_url):
        logging.info("def refresh")
        self.line_url = line_url
        self.load(QtCore.QUrl(self.line_url))

    # 响应登录-确定
    @pyqtSlot()
    def login_agree(self):
        logging.info("def login_agree")
        doc = self.page().currentFrame().documentElement()
        agree1_elem = doc.findFirst('span[class="yellow-btn btn_m elem_btn"]')
        agree1_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

        agree2_elem = doc.findFirst("a[id=agree]")
        agree2_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

    @pyqtSlot()
    def login_agree1(self):
        logging.info("def login_agree1")
        
        doc = self.page().currentFrame().documentElement()
        agree1_elems = doc.findAll('span[class="yellow-btn btn_m elem_btn"]')
        for elem in agree1_elems:
            elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")
        QTimer.singleShot(500, self.login_agree2)

    @pyqtSlot()
    def login_agree2(self):
        logging.info("def login_agree2")
        doc = self.page().currentFrame().documentElement()
        agree2_elem = doc.findFirst("a[id=agree]")
        agree2_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")
        QTimer.singleShot(500, self.login_tab1)

    # 响应登录-Tab
    @pyqtSlot()
    def login_tab1(self):
        logging.info("def login_tab1")
        doc = self.page().currentFrame().documentElement()
        agree1_elem = doc.findFirst('a[id=pk10_sys]')
        agree1_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

        QTimer.singleShot(1500, self.login_tab2)
        
    @pyqtSlot()
    def login_tab2(self):
        doc = self.page().currentFrame().documentElement()
        agree1_elem = doc.findFirst('a[subnav=ballNO15]')
        agree1_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")
        QTimer.singleShot(1500, self.login_tab3)

    @pyqtSlot()
    def login_tab3(self):
        doc = self.page().currentFrame().documentElement()
        agree2_elem = doc.findFirst("a[nav=general]")
        agree2_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

    @pyqtSlot()
    def login_tab4(self):
        doc = self.page().currentFrame().documentElement()
        agree1_elem = doc.findFirst('a[subnav=ballNO60]')
        agree1_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

        QThread.sleep(2)

    @pyqtSlot()
    def login_tab5(self):
        doc = self.page().currentFrame().documentElement()
        agree1_elem = doc.findFirst('a[subnav=ballNO15]')
        agree1_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

    @pyqtSlot()
    def submit(self):
        doc = self.page().currentFrame().documentElement()
        elem = doc.findFirst('a[id=submit_top]')
        if not elem:
            elem = doc.findFirst('a[id=submit]')
        elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

        QTimer.singleShot(3000, self.determine)
    
    @pyqtSlot()
    def determine(self):
        doc = self.page().currentFrame().documentElement()
        elems = doc.findAll('span[name=determine]')
        for elem in elems:
            elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

        agree1_elem = doc.findFirst('span[class="yellow-btn btn_m elem_btn"]')
        agree1_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")

        agree2_elem = doc.findFirst("a[id=agree]")
        agree2_elem.evaluateJavaScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent( 'click', true, true );this.dispatchEvent(evObj);")
        
    
    def param_init(self):
        print "================Cookie================"
        listCookies = self.page().networkAccessManager().cookieJar().allCookies()
        for cookie in  listCookies:
            # PHPSESSID=f8059a223a_1229_50383; domain=pc10.sss66.us; path=/scowa1414556f_50383/      
            t = cookie.toRawForm().split(";")
            t = [str(v) for v in t]
            
            key = t[0].split('=')[0]
            value = t[0].split('=')[1]
            domain = t[1].split('=')[1]
            path = t[2].split('=')[1]
            
            self.cookies[key] = value
            print "=================>>>>>>>",key,value,domain,path
            self.cookies_jar.set(key, value, domain=domain, path=path)
        
        print "================GET URL================"
        self.origin_url = str(self.url().toString())
        now = self.getCurrentTimestamp()
        self.pk_pre_bet_get_data_url = self.origin_url.split("index.htm")[0] + 'pk/order/list?&_=%s__autorefresh' % now
        self.pk_post_bet_url = self.origin_url.split("index.htm")[0] + 'pk/order/leftInfo/?post_submit&&_=%s__ajax' % now
        self.host_url = self.origin_url.replace('http://','').split('/')[0]
        print "host_url=%s" % self.host_url
        print "origin_url=%s" % self.origin_url
        print "pk_pre_bet_get_data_url = %s" % self.pk_pre_bet_get_data_url
        print "pk_post_bet_url = %s" % self.pk_post_bet_url
        
        print "================Header=================="
        self.headers = {
            'Host': self.host_url,
            'Proxy-Connection': 'keep-alive',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
            'ajax': 'true',
            'Referer': self.origin_url,
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Origin': 'http://' + self.host_url,
        }
        print self.headers
        
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
    
    def get_pre_bet_data(self):
        if not self.origin_url:
            return -1
        t = ['ballNO15', 'ballNO60']
        res = []
        for i in t:
            payload={
                'myaction': 'ajax',
                'play': i,
                'ball': '',
                'cat': 15
            }
            
            r = requests.post(self.pk_pre_bet_get_data_url, params=payload, cookies=self.cookies_jar, headers=self.headers, timeout=5)
            real_content = r.content.split('êêê')[0]
            real_content = real_content.replace('\xef\xbb\xbf','')  # 去掉BOM开头的\xef\xbb\xbf
            
            print real_content
            
            
            t_json = json.loads(real_content)
            if t_json and t_json['data']['success']:
                version_number = t_json['data']['version_number']
                print 'version_number=%s' % version_number
            else:
                version_number = -1 
                logging.error("版本号拿不到咯！！！！")
                t_json = {}
            res.append(t_json)
        return res
    
    def get_bet_str(self, bet_balls_list, bet_money_list):
        from mythread import MyBetThread
        self.get_pre_bet_thread = MyBetThread.MyBetDataThread(self)
        pre_bet_data = self.get_pre_bet_thread.start()
        if not pre_bet_data:
            logging.error("拿不到下注前数据？")
            return ""
            
        t15 = pre_bet_data[0]
        t60 = pre_bet_data[1]
        version_number = t15['data']['version_number']
        # t=010|0|1.9829|2;000|1|9.9112|2;011|1|1.9829|3;&v=37
        dic1 = {
            1:"000",
            2:"001",
            3:"002",
            4:"003",
            5:"004",
            6:"005",
            7:"006",
            8:"007",
            9:"008",
            10:"009",
        }
        bet_str = "t="
        try:
            for bet_row in bet_balls_list:
                print bet_row
                index = bet_row[0]
                betlist = bet_row[1]
                betflag = bet_row[2]
                a = dic1[index]
                for ball in betlist:
                    bet_money = bet_money_list[betflag]
                    if index < 6:
                        peilv = t15['data']['integrate'][a+str(index)]
                    else:
                        peilv = t60['data']['integrate'][a+str(index)]
                    bet_str += '%s|%s|%s|%s;'  % (a, int(ball), peilv, bet_money)
        except Exception, ex:
            logging.error(ex, exc_info=1)
            logging.info(t15['data']['integrate'])
            logging.info(t60['data']['integrate'])
            
        bet_str += "&v=%s" % version_number  
        
        logging.info("bet_str=%s" % bet_str)
        return bet_str

    def bet(self, bet_balls_list, bet_money_list):
        if not bet_balls_list:
            logging.error("bet_balls_list = [], do nothing...")
            return {}

        now = self.getCurrentTimestamp()
        self.pk_pre_bet_get_data_url = self.origin_url.split("index.htm")[0] + 'pk/order/list?&_=%s__autorefresh' % now
        self.pk_post_bet_url = self.origin_url.split("index.htm")[0] + 'pk/order/leftInfo/?post_submit&&_=%s__ajax' % now
        
        bet_str = self.get_bet_str(bet_balls_list, bet_money_list)
        if not bet_str:
            logging.error("have not bet_str....")
            logging.error("get the pre bet data again...")
            return

        a = bet_str.split('&')
        
        payload={
            't': a[0].split('=')[1],
            'v': int(a[1].split('=')[1])
        }
        
        logging.info("payload=%s" % payload)
        
        r = requests.post(self.pk_post_bet_url, params=payload, cookies=self.cookies_jar, headers=self.headers, timeout=5)
        real_content = r.content.split('êêê')[0]
        real_content = real_content.replace('\xef\xbb\xbf','')  # 去掉BOM开头的\xef\xbb\xbf
        
        print real_content

        t_json = json.loads(real_content)
        print t_json
        return t_json
        