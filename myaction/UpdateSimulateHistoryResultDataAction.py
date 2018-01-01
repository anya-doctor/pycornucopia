# coding:utf-8
import json
import logging

from PyQt4.QtCore import *


class MyUpdateSimulateHistoryResultDataAction(object):
    @staticmethod
    @pyqtSlot(list)
    def run(console_instance, data_list):
        try:
            logging.info(u"【控制台】更新历史结果数据")
            assert isinstance(data_list, list)

            # 先排好序
            data_list.sort(key=lambda x: x[0], reverse=True)
            filter(lambda x: x[2] != '', data_list)
            logging.info(data_list)

            # 存到控制台
            console_instance.simulate_data = data_list

            # 存放文件
            with open('config/simulate.json', 'wb') as f:
                f.write(json.dumps(console_instance.history_data))

            console_instance.up_limit_combobox.clear()
            console_instance.down_limit_combobox.clear()
            for i in console_instance.simulate_data:
                console_instance.up_limit_combobox.addItem(i[0])
                console_instance.down_limit_combobox.addItem(i[0])
        except Exception, ex:
            logging.error(ex, exc_info=1)
