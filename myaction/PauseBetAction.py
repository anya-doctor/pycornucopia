# coding:utf-8
import logging

from PyQt4.QtCore import *

from myutil.tool.MyTool import beautiful_log


class MyPauseBetAction(object):
    @staticmethod
    @beautiful_log
    @pyqtSlot(dict)
    def run(console_instance):
        try:
            logging.info(u"【切换下注\暂停\实时模拟模式ACTION】切换下注\暂停\实时模拟模式")
            mode = int(console_instance.pauseBet_combobox.currentIndex())
            mode_str = ""
            if mode == 0:
                mode_str = u"正常下注"
            elif mode == 1:
                mode_str = u"暂停下注"
            elif mode == 2:
                mode_str = u"模拟下注"

            logging.info(u"【切换下注\暂停\实时模拟模式ACTION】mode=%s..." % mode_str)
            if mode == 0:
                if console_instance.is_bet_success:
                    logging.info(u"【切换下注\暂停\实时模拟模式ACTION】因为is_bet_success=True，已下注过..")
                else:
                    logging.info(u"【切换下注\暂停\实时模拟模式ACTION】因为is_bet_success=False，所以重新下注...")
                    console_instance.onRetBetHidenBtn(console_instance.all_ball_needToBetList,
                                                      console_instance.preBetDataDic['data']['integrate'])
            elif mode == 1:
                pass
            elif mode == 2:
                pass
        except Exception, ex:
            logging.error(ex)
