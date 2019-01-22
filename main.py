# coding:utf-8
import logging
import sys

from PyQt4 import QtGui

from myutil.MainWindow import MainWindow
from myutil.tool.MyLogUtil import MyLogUtil

'''
【请教】pyqt4写的程序为何在正常退出后崩溃？
解决办法：main函数另起一行，原因不详。
'''


def main():
    MyLogUtil.init_logging()

    try:
        app = QtGui.QApplication(sys.argv)
        MainWindow()
        sys.exit(app.exec_())
    except Exception, ex:
        print ex
        logging.error(ex, exc_info=1)


if __name__ == '__main__':
    main()
