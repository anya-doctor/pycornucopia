# #coding:utf-8
import requests

req_session = requests.Session()

for i in range(1, 1000):
    url1 = "http://pc10.sss22.us/getCodeInfo/.auth?u=0.742246038252069&systemversion=4_6&.auth"
    r1 = requests.Request('GET', url1)
    prep1 = req_session.prepare_request(r1)
    rr1 = req_session.send(prep1, stream=False, timeout=10)
    a = rr1.content
    b = a.split('_')[0]
    __VerifyValue = a.split('_')[1]

    url2 = "http://pc10.sss22.us/getVcode/.auth?t=%s&systemversion=4_6&.auth" % b
    r2 = requests.Request('GET', url2)
    prep2 = req_session.prepare_request(r2)
    rr2 = req_session.send(prep2, stream=False, timeout=10)
    with open('imgs2/%s.png' % i, 'wb') as f:
        print "index=%s" % i
        f.write(rr2.content)
