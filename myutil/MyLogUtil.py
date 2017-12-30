# coding=utf-8
import os
import logging
import logging.handlers
from logging.handlers import TimedRotatingFileHandler

from myutil import MySettings


class MyLogUtil(object):
    @classmethod
    def init_logging(cls):
        """
            初始化logging环境
            hdlr = TimedRotatingFileHandler(filename, "D", 1, 10)
            表示：设置每天自动切换到一个文件下保存，一共保存10天的数据...
            hdlr = TimedRotatingFileHandler(filename, "D", 1, 0)
            表示：设置每天自动切换到一个文件下保存，保存无限天数...
            “S”: Seconds
            “M”: Minutes
            “H”: Hours
            “D”: Days
             1 : 表示单位...
             10: 表示保存的单位....
        """

        fmt = '%(asctime)s %(filename)s-%(lineno)d [%(levelname)s] %(message)s'

        root = logging.getLogger()
        level = logging.INFO

        # 如果文件夹 and 文件不存在则创建之。。。
        if not os.path.exists(MySettings.log_dir_path):
            os.mkdir(MySettings.log_dir_path)

        if not os.path.exists(MySettings.log_file_path):
            with open(MySettings.log_file_path, 'w+') as f:
                pass

        formatter = logging.Formatter(fmt)
        hdlr = TimedRotatingFileHandler(MySettings.log_file_path, "D", 1, 100)
        hdlr.setFormatter(formatter)
        root.addHandler(hdlr)
        root.setLevel(level)

        # 同时输出到屏幕，便于实施观察
        handle2 = logging.StreamHandler()
        handle2.setFormatter(formatter)
        root.addHandler(handle2)
