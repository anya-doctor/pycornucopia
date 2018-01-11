# coding=utf-8
import math

from PyQt4.QtCore import *
from PyQt4.QtGui import *


class Overlay(QWidget):
    def __init__(self, parent=None):
        QWidget.__init__(self, parent)
        palette = QPalette(self.palette())
        palette.setColor(palette.Background, Qt.transparent)
        self.setPalette(palette)
        self.parent = parent

    def paintEvent(self, event):
        painter = QPainter()
        painter.begin(self)
        painter.setRenderHint(QPainter.Antialiasing)
        painter.fillRect(event.rect(), QBrush(QColor(255, 255, 255, 127)))
        painter.setPen(QPen(Qt.NoPen))

        for i in range(6):
            if (self.counter / 5) % 6 == i:
                painter.setBrush(QBrush(QColor(127 + (self.counter % 5) * 32, 127, 127)))
            else:
                painter.setBrush(QBrush(QColor(127, 127, 127)))
            painter.drawEllipse(
                self.width() / 2 + 30 * math.cos(2 * math.pi * i / 6.0) - 10,
                self.height() / 2 + 30 * math.sin(2 * math.pi * i / 6.0) - 10,
                20, 20)

        painter.end()

    def showEvent(self, event):
        # self.timer = self.startTimer(10000)
        self.counter = 0

    @pyqtSlot()
    def myclose(self):
        self.hide()

    def timerEvent(self, event):
        from test import login
        a = login()
        if a:
            self.killTimer(self.timer)
            self.hide()
        else:
            self.counter += 1
            self.update()
        if self.counter == 5:
            self.killTimer(self.timer)
            self.hide()
