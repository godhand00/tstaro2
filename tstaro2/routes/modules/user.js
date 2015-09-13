var express = require('express');
var router = express.Router();
var myutil = require('./myutil');
var env = require('./env');

/*
 * get users
 */
router.getusers = function (req, res) {
    var query = {}
    var $and = []
    if (req.query.account) {
        $and.push({ account: req.query.account })
    }
    if ($and.length > 0)
        query.$and = $and
    myutil.get('users', query, req, res)
}

router.login = function (req, res) {
    var db = myutil.getDb(req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection('users', function (err, collection) {
                collection.find({ account: req.body.account, password: req.body.password, void_p: false }).toArray(function (err, results) {
                    db.close()
                    console.log('login: req.body.account=' + req.body.account)
                    if (results.length > 0) {
                        delete results[0].password
                        res.send({ auth: true, user: results[0] })
                    } else {
                        res.send({ auth: false })
                    }
                })
            })
        })
    })
}

/*
 * register user
 */
router.reguser = function (req, res) {
    myutil.reg('users', req, res)
}

/*
 * update user
 */
router.upduser = function (req, res) {
    myutil.upd('users', req, res)
}

/*
 * delete user
 */
router.deluser = function (req, res) {
    myutil.del('users', req, res)
}

module.exports = router;