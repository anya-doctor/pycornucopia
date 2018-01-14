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
            logging.info(u"【切换下注\暂停模式ACTION】切换下注\暂停模式")
            mode = int(console_instance.pauseBet_combobox.currentIndex())
            logging.info(u"【切换下注\暂停模式ACTION】mode=%s..." % (u"暂停下注" if mode == 1 else u"正常下注"))
            if mode == 1:
                pass
            elif mode == 0:
                if console_instance.is_bet_success:
                    logging.info(u"【切换下注\暂停模式ACTION】因为is_bet_success=True，已下注过..")
                else:
                    logging.info(u"【切换下注\暂停模式ACTION】因为is_bet_success=False，所以重新下注...")
                    console_instance.onRetBetHidenBtn(console_instance.all_ball_needToBetList,
                                                      console_instance.preBetDataDic['data']['integrate'])
        except Exception, ex:
            logging.error(ex)
