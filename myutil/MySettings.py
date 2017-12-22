# coding=utf-8
import os
import sys

browser_js_alert = True  # 是否允许浏览器弹框alert
allow_bet_time = 180  # 允许下注的开始时间，2:30，能规避掉赔率更改
go_interval_time = 10000  # 下注前等待间隔,10s = 10000ms


def resource_path(relative_path):
    """
    定义一个读取相对路径的函数
    :param relative_path:
    :return:
    """
    if hasattr(sys, "_MEIPASS"):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)


log_file_path = resource_path("log\gamble.log")  # 'E://projects//EasyGamble//log//gamble.log'
db_file_path = resource_path("config\cqssc.db")  # 'E://projects//EasyGamble//config//cqssc.db'
period_data_file_path = resource_path("config\out.txt")

# sqlite  不能带中文路径
log_file_path = unicode(log_file_path, 'gbk')
db_file_path = unicode(db_file_path, 'gbk')
period_data_file_path = unicode(period_data_file_path, 'gbk')

''' pyinstaller 打包专用
#   pip install pyinstaller==3.1

# -*- mode: python -*-

block_cipher = None


a = Analysis(['main.py'],
             pathex=['E:\\projects\\EasyGamble'],
             binaries=None,
             datas=None,
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [("\\log\\gamble.log","E:\\projects\\EasyGamble\\log\\gamble.log",'DATA'),
          ("\\config\\cqssc.db","E:\\projects\\EasyGamble\\config\\cqssc.db",'DATA'),
          ("\\config\\out.txt","E:\\projects\\EasyGamble\\config\\out.txt",'DATA')],
          name='main',
          debug=False,
          strip=False,
          upx=True,
          console=False )


'''
