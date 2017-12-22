# coding=utf-8
import sqlite3

from myutil import MySettings


# 创建数据库文件
class MyDBUtil(object):
    @classmethod
    def create_db(cls):
        """
        创建一个db
        :return:
        """
        mydb = sqlite3.connect(MySettings.db_file_path)
        sql = "create table config(lines text NULL,username text NULL,password text NULL,bet_amount text NULL, earn_money_at text NULL,lost_money_at text NULL,register_code text NULL, first_n text NULL,miaomiao text NULL, create_date date NULL,\
                ball1_1 text NULL,ball1_2 text NULL,ball1_3 text NULL,ball1_4 text NULL,ball1_5 text NULL,\
                ball1_6 text NULL,ball1_7 text NULL,ball1_8 text NULL,ball1_9 text NULL,ball1_10 text NULL,\
                ball2_1 text NULL,ball2_2 text NULL,ball2_3 text NULL,ball2_4 text NULL,ball2_5 text NULL,\
                ball2_6 text NULL,ball2_7 text NULL,ball2_8 text NULL,ball2_9 text NULL,ball2_10 text NULL,\
                ball3_1 text NULL,ball3_2 text NULL,ball3_3 text NULL,ball3_4 text NULL,ball3_5 text NULL,\
                ball3_6 text NULL,ball3_7 text NULL,ball3_8 text NULL,ball3_9 text NULL,ball3_10 text NULL,\
                ball4_1 text NULL,ball4_2 text NULL,ball4_3 text NULL,ball4_4 text NULL,ball4_5 text NULL,\
                ball4_6 text NULL,ball4_7 text NULL,ball4_8 text NULL,ball4_9 text NULL,ball4_10 text NULL,\
                ball5_1 text NULL,ball5_2 text NULL,ball5_3 text NULL,ball5_4 text NULL,ball5_5 text NULL,\
                ball5_6 text NULL,ball5_7 text NULL,ball5_8 text NULL,ball5_9 text NULL,ball5_10 text NULL,\
                ball6_1 text NULL,ball6_2 text NULL,ball6_3 text NULL,ball6_4 text NULL,ball6_5 text NULL,\
                ball6_6 text NULL,ball6_7 text NULL,ball6_8 text NULL,ball6_9 text NULL,ball6_10 text NULL,\
                ball7_1 text NULL,ball7_2 text NULL,ball7_3 text NULL,ball7_4 text NULL,ball7_5 text NULL,\
                ball7_6 text NULL,ball7_7 text NULL,ball7_8 text NULL,ball7_9 text NULL,ball7_10 text NULL,\
                ball8_1 text NULL,ball8_2 text NULL,ball8_3 text NULL,ball8_4 text NULL,ball8_5 text NULL,\
                ball8_6 text NULL,ball8_7 text NULL,ball8_8 text NULL,ball8_9 text NULL,ball8_10 text NULL,\
                ball9_1 text NULL,ball9_2 text NULL,ball9_3 text NULL,ball9_4 text NULL,ball9_5 text NULL,\
                ball9_6 text NULL,ball9_7 text NULL,ball9_8 text NULL,ball9_9 text NULL,ball9_10 text NULL,\
                ball10_1 text NULL,ball10_2 text NULL,ball10_3 text NULL,ball10_4 text NULL,ball10_5 text NULL,\
                ball10_6 text NULL,ball10_7 text NULL,ball10_8 text NULL,ball10_9 text NULL,ball10_10 text NULL\
                ,isQQG,isLoseAdd);"
        mydb.execute(sql)
        mydb.commit()

        sql = "insert into config(lines,username,password,bet_amount,earn_money_at,lost_money_at,register_code,first_n,miaomiao,create_date,\
                ball1_1,ball1_2,ball1_3,ball1_4,ball1_5,ball1_6,ball1_7,ball1_8,ball1_9,ball1_10,\
                ball2_1,ball2_2,ball2_3,ball2_4,ball2_5,ball2_6,ball2_7,ball2_8,ball2_9,ball2_10,\
                ball3_1,ball3_2,ball3_3,ball3_4,ball3_5,ball3_6,ball3_7,ball3_8,ball3_9,ball3_10,\
                ball4_1,ball4_2,ball4_3,ball4_4,ball4_5,ball4_6,ball4_7,ball4_8,ball4_9,ball4_10,\
                ball5_1,ball5_2,ball5_3,ball5_4,ball5_5,ball5_6,ball5_7,ball5_8,ball5_9,ball5_10,\
                ball6_1,ball6_2,ball6_3,ball6_4,ball6_5,ball6_6,ball6_7,ball6_8,ball6_9,ball6_10,\
                ball7_1,ball7_2,ball7_3,ball7_4,ball7_5,ball7_6,ball7_7,ball7_8,ball7_9,ball7_10,\
                ball8_1,ball8_2,ball8_3,ball8_4,ball8_5,ball8_6,ball8_7,ball8_8,ball8_9,ball8_10,\
                ball9_1,ball9_2,ball9_3,ball9_4,ball9_5,ball9_6,ball9_7,ball9_8,ball9_9,ball9_10,\
                ball10_1,ball10_2,ball10_3,ball10_4,ball10_5,ball10_6,ball10_7,ball10_8,ball10_9,ball10_10\
                ,isQQG,isLoseAdd)"
        sql += " values('','','','','','','','','hehehe',date(),\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','',\
                '','','','','','','','','','','1','1');"
        mydb.execute(sql)
        mydb.commit()
        mydb.close()
