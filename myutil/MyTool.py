# coding=utf-8
def getCurrentTimestamp(bit_type=13):
        """
        :param bit_type: bit_type=10. 10位时间戳，bit_type=13，13位时间戳
        返回时间戳，python是10位.3位，这里为了和终端保持一致统一13位
        :return: -1 表示错误
        """
        import time
        if bit_type == 13:
            return int(round(time.time() * 1000))
        elif bit_type == 10:
            return int(round(time.time()))
        return -1