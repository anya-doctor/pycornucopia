# coding:utf-8
import json
import logging

from PyQt4.QtCore import *

from myutil.tool.MyTool import beautiful_log


class MyUpdateSimulateLabelAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【控制台】更新模拟选中期数...")
            up_limit = unicode(console_instance.up_limit_combobox.currentText())
            down_limit = unicode(console_instance.down_limit_combobox.currentText())
            logging.info(u"【控制台】up_limit=%s..." % up_limit)
            logging.info(u"【控制台】down_limit=%s..." % down_limit)

            if up_limit and down_limit and MyUpdateSimulateLabelAction.is_number(up_limit):
                up_limit = int(up_limit)
                down_limit = int(down_limit)

                lb_txt = u"选中期数：%s-%s，共%s期" % (down_limit, up_limit, up_limit - down_limit + 1)
                logging.info(lb_txt)
                console_instance.simulate_qishu_lb.setText(lb_txt)
                logging.info(u"【控制台】更新模拟选中的历史数据，之前len=%s" % len(console_instance.simulate_data))
                console_instance.history_data = filter(lambda x: int(x[0]) < down_limit, console_instance.simulate_data)
                logging.info(u"【控制台】更新模拟选中的历史数据，之后len=%s" % len(console_instance.history_data))
                with open('config/simulate_history.json', 'wb') as f:
                    f.write(json.dumps(console_instance.history_data))
        except Exception, ex:
            logging.error(ex)

    @staticmethod
    def is_number(s):
        try:
            float(s)
            return True
        except ValueError:
            pass

        try:
            import unicodedata
            unicodedata.numeric(s)
            return True
        except (TypeError, ValueError):
            pass

        return False
