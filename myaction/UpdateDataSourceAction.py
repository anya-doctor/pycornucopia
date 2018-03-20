# coding:utf-8
import logging

from PyQt4.QtCore import *

from common import common
from myutil.tool.MyTool import beautiful_log


class MyUpdateDataSourceAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【更换数据来源ACTION】切换本站、500彩票")
            mode = int(console_instance.data_source_combobox.currentIndex())
            mode_str = ""
            if mode == common.KAIJIANG_DATA_SOURCE_SELF:
                mode_str = u"本站数据"
            elif mode == common.KAIJIANG_DATA_SOURCE_500:
                mode_str = u"500彩票"
            logging.info(u"【更换数据来源ACTION】mode=%s..." % mode_str)
            if mode == common.KAIJIANG_DATA_SOURCE_SELF:
                # 如果切换到本站数据，必须保证已经是登录状态。
                if not console_instance.loginSuccessData:
                    # 先把CurrentIndex拨乱反正
                    console_instance.data_source_combobox.setCurrentIndex(common.KAIJIANG_DATA_SOURCE_500)
                    # 再通知必须先登录
                    msgtitle = u"失败了"
                    msg = u"请先登录，才能获取本站数据..."
                    QMetaObject.invokeMethod(console_instance, "alert", Qt.QueuedConnection, Q_ARG(str, msgtitle),
                                             Q_ARG(str, msg))
                else:
                    console_instance.kaijiang_data_source = mode
            elif mode == common.KAIJIANG_DATA_SOURCE_500:
                console_instance.kaijiang_data_source = mode
        except Exception, ex:
            logging.error(ex)
