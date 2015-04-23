#!/usr/bin/env python

import sys
import tempfile
import json
sys.path.append('./python_modules/site-packages/')
from pyExcelerator import *

def write_item(ws0, x, y, val, asta):
    if asta:
        ws0.write(x, y, '*' + str(val) + '*')
    else:
        ws0.write(x, y, val)

def write_xls(ws0, keys, data):
    for j, key in enumerate(keys):
        ws0.write(0, j, key)
    for i, item in enumerate(data):
        for j, key in enumerate(keys):
            k =  key if key[0] != '*' else key[1:]
            if item.has_key(k):
                if isinstance(item[k], list):
                    write_item(ws0, i + 1, j, ','.join(item[k]), key[0] == '*')
                elif item[k] != None:
                    write_item(ws0, i + 1, j, item[k], key[0] == '*')

def write_books(ws0, data):
    keys = [
        'regno',
        '*regno',
        'ASIN',
        'Title',
        'Author',
        'Publisher',
        'page',
        'price',
        'pubdate',
        'LargeImageURL',
        'DetailPageURL',
        'description',
        'comment',
        'NDC',
        'tags',
        'supplier',
        'purchdate',
        'regdate',
        'upddate',
        'void_p',
        '_id'
    ]
    write_xls(ws0, keys, data)

def write_users(ws0, data):
    keys = [
        'account',
        '*account',
        'name',
        'grade',
        'class',
        'comment',
        'role',
        'regdate',
        'upddate',
        'void_p',
        '_id'
    ]
    write_xls(ws0, keys, data)

def write_checkouts(ws0, data):
    keys = [
        'user_id',
        'account',
        'name',
        'grade',
        'class',

        'book_id',
        'regno',
        'Title',
        'Author',

        'from_date',
        'due_date',
        'checkin_date',

        'comment',

        'regdate',
        'upddate',
        'void_p',
        '_id'
    ]
    write_xls(ws0, keys, data) 

wb = Workbook()
ws0 = wb.add_sheet('0')

f = open(sys.argv[2])
jsontext = ''
for line in f:
    jsontext = jsontext + line
f.close()

data = json.loads(jsontext)

if (len(sys.argv) != 3):
    print ''
    quit()

if (sys.argv[1] == 'books'):
    write_books(ws0, data)
elif (sys.argv[1] == 'users'):
    write_users(ws0, data)
elif (sys.argv[1] == 'checkouts'):
    write_checkouts(ws0, data)

f = tempfile.NamedTemporaryFile(delete=False)
wb.save(f.name)
print f.name
