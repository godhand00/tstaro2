var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');
var mongodb = require('mongodb');
var getDb = function (domain) {
    var name = (function (domain) {
        if (domain) {
            return 'tstaro_' + domain
        } else {
            return null
        }
    })(domain)
    if (!name) {
        return null
    } else {
        var host = 'localhost';
        var port = 27017
        var server = new mongodb.Server(
            host,
            port, {})
        console.log('getDB: host=' + host)
        console.log('getDB: port=' + port)
        console.log('getDB: name=' + name)
        console.log(new Date())
        return new mongodb.Db(name, server, { safe: false })
    }
}

var isExistsOr = function (tags, array) {
    for (var i in array)
        for (var j in tags)
            if (array[i] == tags[j])
                return true
    return false
}

var parseTags = function (tags) {
    if (!tags)
        return []
    else if (typeof tags == 'object')
        return tags
    else
        return String(tags).split(/[\s　,，]+/)
}

// 配列をユニークにする
var uniqueArray = function (array) {
    var storage = {}
    var ua = []
    for (var i = 0; i < array.length; i++) {
        value = array[i]
        if (!(value in storage)) {
            storage[value] = true
            ua.push(value)
        }
    }
    return ua
}

/*
 * Create Index
 */
router.config_indexes = function (req, res) {
    var db = getDb(req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            // TODO: users の account にも unique index 必要
            db.ensureIndex('books', { regno: 1 }, { unique: true, background: true, dropDups: true, w: 1 }, function (err, doc) {
                db.close()
                res.send({ err: err, doc: doc })
            })
        })
    })
}

router.config_showindexes = function (req, res) {
    var db = getDb(req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection(req.params.colname, function (err, collection) {
                collection.indexInformation(function (err, doc) {
                    db.close()
                    res.send({ err: err, doc: doc })
                })
            })
        })
    })
}


/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
    res.redirect('/dev/index.html');
});

module.exports = router;