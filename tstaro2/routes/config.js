var router = express.Router();
var http = require('http');
var querystring = require('querystring');
var mongodb = require('mongodb');
var myutil = require('./myutil.js');

/*
 * Create Index
 */
router.get('/indexes/:domain', function (req, res) {
    var db = myutil.getDb(req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            // TODO: users の account にも unique index 必要
            db.ensureIndex('books', { regno: 1 }, { unique: true, background: true, dropDups: true, w: 1 }, function (err, doc) {
                db.close()
                res.send({ err: err, doc: doc })
            })
        })
    })
});

router.get('/showindexes/:domain/:colname', function (req, res) {
    var db = myutil.getDb(req.params.domain)
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
});

module.exports = router;