var express = require('express');
var router = express.Router();
var myutil = require('./myutil');

/*
 * get checkouts
 */
router.getcheckouts = function (req, res) {
    var query = {}
    var wcond = []
    if (req.query.word) {
        var pattern = new RegExp('.*' + req.query.word + '.*', 'i')
        wcond.push({ account: pattern })
        wcond.push({ name: pattern })
        wcond.push({ regno: pattern })
        wcond.push({ Title: pattern })
        wcond.push({ Author: pattern })
        wcond.push({ comment: pattern })
    }

    var $and = []
    if (wcond.length > 0)
        $and.push({ $or: wcond })
    if (req.query.regno)
        $and.push({ regno: req.query.regno })
    if (req.query.account)
        $and.push({ account: req.query.account })
    if (req.query.checkin === false)
        $and.push({ "checkin_date": null })
    else if (req.query.checkin === true)
        $and.push({ "checkin_date": { $ne: null } })
    if ($and.length > 0)
        query.$and = $and
    myutil.get('checkouts', query, req, res)
}

/*
 * register checkout
 */
router.regcheckout = function (req, res) {
    myutil.reg('checkouts', req, res)
}

/*
 * update checkout
 */
router.updcheckout = function (req, res) {
    myutil.upd('checkouts', req, res)
}

router.delcheckout = function (req, res) {
    myutil.del('checkouts', req, res)
}

module.exports = router;
