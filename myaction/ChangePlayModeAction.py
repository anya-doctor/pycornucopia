# coding:utf-8
import logging

from PyQt4.QtCore import *

from common import common
from myutil.tool.MyTool import beautiful_log


class MyChangePlayModeAction(object):
    """
    主要是玩法可选多种：
    1、北京赛车
    2、重庆时时彩
    """

    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【更换玩法ACTION】切换北京赛车\重庆时时彩\幸运飞艇")
            mode = int(console_instance.playmode_combobox.currentIndex())
            mode_str = ""
            if mode == common.PLAYMODE_PK10:
                mode_str = u"北京赛车"
            elif mode == common.PLAYMODE_CQSSC:
                mode_str = u"重庆时时彩"
            elif mode == common.PLAYMODE_XYFT:
                mode_str = u"幸运飞艇"
            logging.info(u"【更换玩法ACTION】切换北京赛车\重庆时时彩\幸运飞艇mode=%s..." % mode_str)

            if mode == 0:
                # 如果切换到正常下注，那么先把timesnow归零。
                console_instance.timesnow = 0
                console_instance.history_data = []
                console_instance.open_balls = []
                console_instance.preBetDataDic = {}
                console_instance.simulate_money = 0

                # 在登录的前提下...开启相应的定时器
                if console_instance.loginSuccessData:
                    if console_instance.getPreBetDatgaTimer:
                        logging.info(u"【更换正常模拟模式ACTION】开启获取预下注数据定时器...")
                        console_instance.getPreBetDatgaTimer.start(1000)
                    if console_instance.getHistoryResultDataTimer:
                        logging.info(u"【更换正常模拟模式ACTION】开启获取历史数据定时器...")
                        console_instance.getHistoryResultDataTimer.start(1000)
            elif mode == 1:
                if console_instance.getPreBetDatgaTimer:
                    logging.info(u"【更换正常模拟模式ACTION】停掉获取预下注数据定时器...")
                    console_instance.getPreBetDatgaTimer.stop()
                # 不准真实下注
                console_instance.goBtn.setEnabled(False)
        except Exception, ex:
            logging.error(ex)
