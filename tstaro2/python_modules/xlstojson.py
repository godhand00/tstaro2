#!/usr/bin/env python

import sys
import tempfile
import json
sys.path.append('./python_modules/site-packages/')
from pyExcelerator import *

def read_xls(xls, keys):
    if len(xls) == 0:
        return ''
    a = []
    b = {}
    values = xls[0][1]
    pr = 0
    for k in sorted(values):
        if k[0] == 0:
            continue
        if k[0] > pr:
            if b:
                a.append(b)
            b = {}
        if keys.get(values[(0, k[1])]):
            b[values[(0, k[1])]] = values[k]
        pr = k[0]
    if b:
        a.append(b)
    return json.dumps(a).encode('utf-8')

keymap = {
    'test': {
        'a': 'string',
        'b': 'number'
    },
    'books': {
        'regno': 'string',
        'ASIN': 'string',
        'Title': 'string',
        'Author': 'string',
        'Publisher': 'string',
        'page': 'number',
        'price': 'number',
        'pubdate': 'string',
        'LargeImageURL': 'string',
        'DetailPageURL': 'string',
        'description': 'string',
        'comment': 'string',
        'NDC': 'string',
        'tags': 'string',
        'supplier': 'string',
        'purchdate': 'string',
        'void_p': 'boolean'
    },
    'users': {
        'account': 'string',
        'name': 'string',
        'grade': 'string',
        'class': 'string',
        'comment': 'string',
        'role': 'string',
        'void_p': 'string'
    },
    'checkouts': {
        'account': 'string',
        'name': 'string',
        'grade': 'string',
        'class': 'string',
        'regno': 'string',
        'Title': 'string',
        'Author': 'string',
        'from_date': 'string',
        'due_date': 'string',
        'checkin_date': 'string',
        'comment': 'string',
        'void_p': 'boolean'
    }
}

if (len(sys.argv) != 3):
    print ''
    quit()
xls = parse_xls(sys.argv[2])
print read_xls(xls, keymap[sys.argv[1]])
