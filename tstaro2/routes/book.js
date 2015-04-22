var express = require('express');
var router = express.Router();
var myutil = require('./myutil');

router.getbookregno = function (req, res) {
    var db = getDb(req.params.domain)
    console.log('getbookregno: domain=' + req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection('books', function (err, collection) {
                collection.mapReduce(function () {
                    emit(1, this.regno)
                }, function (key, values) {
                    return Math.max.apply(null, values)
                }, {
                    out: { inline: 1 }
                },
                function (err, results, stats) {
                    db.close()
                    res.send({ regno: results[0].value + 1 })
                })
            })
        })
    })
}

router.getbooks = function (req, res) {
    var query = {};
    var wcond = []
    if (req.query.word) {
        var pattern = new RegExp('.*' + req.query.word + '.*', 'i')
        wcond.push({ 'Author': pattern })
        wcond.push({ 'Title': pattern })
        wcond.push({ 'Publisher': pattern })
    }
    var tcond = {}
    if (req.query.tags) {
        var tags = JSON.parse(req.query.tags)
        if (tags.length > 0)
            tcond["tags"] = { "$in": tags }
    }
    var ncond = {}
    if (req.query.ndcs) {
        var ndcs = JSON.parse(req.query.ndcs)
        console.log('ndcs: ' + ndcs)
        if (ndcs.length > 0) {
            ncond["$or"] = []
            for (var i in ndcs) {
                ncond["$or"].push({ NDC: { '$regex': '^' + ndcs[i] } })
            }
            //ncond["NDC"] = { "$in": ndcs }
            //ncond["NDC"] = { "$in": { "$regex": ndcs + '.*', $options: 'i' } }
        }
    }
    var $and = []
    if (wcond.length > 0)
        $and.push({ $or: wcond })
    if (req.query.regno)
        $and.push({ regno: parseInt(req.query.regno) })
    if (myutil.hashLength(tcond))
        $and.push(tcond)
    if (myutil.hashLength(ncond))
        $and.push(ncond)
    if ($and.length > 0)
        query.$and = $and
    get('books', query, req, res)
}

/*
 * Register book on db
 */
router.regbook = function (req, res) {
    req.body.tags = uniqueArray(parseTags(req.body.tags))
    reg('books', req, res)
}

/*
 * Update book on db
 */
router.updbook = function (req, res) {
    req.body.tags = uniqueArray(parseTags(req.body.tags))
    upd('books', req, res)
}

/*
 * Delete book from db
 */
router.delbook = function (req, res) {
    del('books', req, res)
}

module.exports = router;