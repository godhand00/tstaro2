var express = require('express');
var router = express.Router();
var myutil = require('./myutil');
var env = require('./env');

// tagsの統計をとる
var getTagsStat = function (data, prop, statFunc, statConv) {
    var tagsStat = {}
    for (var i in data) {
        var tags = myutil.parseTags(data[i][prop])
        if (tags instanceof Array) {
            for (var j in tags) {
                var tag = tags[j]
                statFunc(tagsStat, tag)
            }
        } else {
            statFunc(tagsStat, tags)
        }
    }
    return statConv(tagsStat)
}

var anystat = function (req, res, key, statFunc, statConv) {
    var db = myutil.getDb(req.params.domain)
    console.log('tagsstat: domain=' + req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection('books', function (err, collection) {
                var sel = {}
                sel[key] = true
                collection.find({}, sel).toArray(function (err, results) {
                    var stat = getTagsStat(results, key, statFunc, statConv)
                    db.close()
                    res.send(stat)
                })
            })
        })
    })
}

router.tagsstat = function (req, res) {
    anystat(req, res, 'tags', function (stat, key) {
        if (key)
            if (!stat[key])
                stat[key] = 1
            else
                stat[key]++
    }, function (stat) {
        var convstat = []
        for (var key in stat) {
            convstat.push({
                name: key,
                count: stat[key]
            })
        }
        convstat.sort(function (a, b) {
            if (a.count > b.count) return -1
            else if (a.count < b.count) return 1
            else return 0
        })
        return convstat
    })
}

var ndcName = {
    'A': '日本の読み物（高学年）',
    'B': '日本の読み物（低学年）',
    'C': '外国の読み物（高学年）',
    'D': '外国の読み物（低学年）',
    'E': '絵本',
    'M': '漫画',
    '019': '読書',
    '030': '百科辞典',
    '080': 'ノンフィクション全集',
    '210': '日本の歴史',
    '280': '伝記全般',
    '289': '個人伝記',
    '290': '紀行',
    '360': '社会・福祉',
    '370': '教育',
    '380': '世界の国々',
    '384': '社会・家庭行事',
    '440': '天文・宇宙',
    '451': '天気',
    '470': '植物',
    '486': '昆虫・昆虫記',
    '487': '魚・両生類',
    '488': '鳥',
    '490': '人の体・医学',
    '539': '原子力・エネルギー',
    '540': '電気・コンピュータ',
    '620': '園芸',
    '650': '森林',
    '750': '工作・手芸',
    '790': 'ゲームブック',
    '908': '物語全集',
    '911': '日本の詩・俳句・短歌'
}

router.ndcsstat = function (req, res) {
    anystat(req, res, 'NDC', function (stat, key) {
        if (key) {
            var k = key
            if (key[0].match(/[A-Z]+/))
                k = key[0]
            if (!stat[k])
                stat[k] = 1
            else
                stat[k]++
        }
    }, function (stat) {
        var convstat = []
        for (var key in ndcName) {
            convstat.push({
                code: key,
                name: ndcName[key],
                count: stat[key] ? stat[key] : 0
            })
        }
        return convstat.sort(function (a, b) {
            var aa = a.code.match(/[A-Z]+/)
            var ba = b.code.match(/[A-Z]+/)
            if (aa && ba || !aa && !ba) {
                if (a.code > b.code) return 1
                if (a.code == b.code) return 0
                return -1
            } else {
                if (aa) return -1
                return 1
            }
        })
    })
}

module.exports = router;