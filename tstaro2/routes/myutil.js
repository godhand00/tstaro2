var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');
var mongodb = require('mongodb');

router.getDb = function (domain) {
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

router.isExistsOr = function (tags, array) {
    for (var i in array)
        for (var j in tags)
            if (array[i] == tags[j])
                return true
    return false
}

router.parseTags = function (tags) {
    if (!tags)
        return []
    else if (typeof tags == 'object')
        return tags
    else
        return String(tags).split(/[\s　,，]+/)
}

router.hashLength = function (array) {
    var len = 0
    for (var key in array)
        len++
    return len
}

// 配列をユニークにする
router.uniqueArray = function (array) {
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

router.get = function (colname, query, req, res) {
    var sorter = {}
    if (req.query.sort) {
        var items = JSON.parse(req.query.sort)
        for (var i in items) {
            var item = items[i]
            sorter[item.property] = item.direction == "ASC" ? 1 : -1
        }
    }
    console.log('get: colname=' + colname)
    var limit = req.query.limit ? parseInt(req.query.limit) : 25
    var start = req.query.start ? parseInt(req.query.start) : 0
    console.log('limit=' + limit + ', start=' + start)
    var db = getDb(req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection(colname, function (err, collection) {
                collection.find(query).count(function (err, count) {
                    collection.find(query, { skip: start, limit: limit }).sort(sorter).toArray(function (err, results) {
                        db.close()
                        res.send({ results: results, totalCount: count })
                    })
                })
            })
        })
    })
}

router.reg = function (colname, req, res) {
    console.log('reg: colname=' + colname)
    var db = getDb(req.params.domain);
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection(colname, function (err, collection) {
                collection.insert(req.body, { safe: true }, function (err, doc) {
                    db.close()
                    if (!err)
                        res.send(doc)
                    else
                        res.send(500, err)
                })
            })
        })
    })
}

router.upd = function (colname, req, res) {
    console.log('upd: colname=' + colname)
    var db = getDb(req.params.domain);
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection(colname, function (err, collection) {
                req.body._id = mongodb.BSONPure.ObjectID.createFromHexString(req.body._id)
                collection.save(req.body, { safe: true }, function (err, doc) {
                    db.close()
                    if (!err)
                        res.send(req.body)
                    else
                        res.send(500, err)
                })
            })
        })
    })
}

router.del = function (colname, req, res) {
    console.log('del: colname=' + colname)
    var db = getDb(req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection(colname, function (err, collection) {
                var o_id = mongodb.BSONPure.ObjectID.createFromHexString(req.body._id)
                collection.remove({ _id: o_id }, function (err, doc) {
                    db.close()
                    res.send(doc)
                })
            })
        })
    })
}

module.exports = router;