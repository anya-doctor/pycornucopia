# #coding:utf-8
import json
import logging
import xml.dom.minidom

import requests
from PyQt4 import QtCore
from PyQt4.QtCore import *


from common.common import req_session
from myutil.tool import MyDate
from myutil.tool import MyTool


class MyGetSimulateHistoryResultDataThread(QtCore.QThread):
    def __init__(self, mainWindow, console, from_date, to_date):
        QtCore.QThread.__init__(self)
        self.mainWindow = mainWindow
        self.console = console
        self.from_date = str(from_date)
        self.to_date = str(to_date)

    def run(self):
        try:
            # http://kaijiang.500.com/static/info/kaijiang/xml/bjpkshi/20180108.xml?_A=YFSAQORP1515509516031
            # 北京： http://bwlc.net/bulletin/trax.html
            # http://pc10.sss44.us/scowa14889f_39473/pk/result/index?&_=1514773138202__ajax HTTP/1.1
            logging.info(u"【获取模拟用的历史数据线程】线程run()中...")
            res = []
            date_list = MyDate.get_date_list(self.from_date, self.to_date)
            success_flag = True
            for _date in date_list:
                date = _date.strftime("%Y-%m-%d")
                day_data = self.xml_helper(date)
                if day_data:
                    res.extend(day_data)
                else:
                    success_flag = False
            if success_flag:
                QMetaObject.invokeMethod(self.console, "onUpdateSimulateHistoryResultDataHideBtn", Qt.QueuedConnection,
                                         Q_ARG(list, res))
            else:
                msgtitle = u"失败了"
                msg = u"获取模拟用的历史数据失败，请重试..."
                QMetaObject.invokeMethod(self.console, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                         Q_ARG(str, msg))

        except Exception, ex:
            logging.error(ex, exc_info=1)
            msgtitle = u"失败了"
            msg = u"获取模拟用的历史数据失败，请重试..."
            QMetaObject.invokeMethod(self.console, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                     Q_ARG(str, msg))

    def xml_helper(self, my_date):
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

    def self_helper(self, date):
        """
        自家网站的数据
        :return:
        """
        now = MyTool.getCurrentTimestamp()
        url = self.console.loginSuccessData['origin_url'] + "pk/result/index?&_=%s__ajax" % now

        payload = {
            'date': date
        }
        r1 = requests.Request('POST', url, data=payload, headers=self.console.loginSuccessData['headers'],
                              cookies=self.console.loginSuccessData['cookies_jar'])
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