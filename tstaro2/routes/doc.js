var express = require('express');
var router = express.Router();
var myutil = require('./myutil');

var getdocfile = function (req, res, filename) {
    var fs = require('fs')
    var util = require('util')
    var fname = './data/' + req.params.domain + '/' + filename
    var stat = fs.statSync(fname)
    res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=' + filename,
        'Content-Length': stat.size
    })
    var rs = fs.createReadStream(fname)
    util.pump(rs, res)
}

router.getsashikomi = function (req, res) {
    getdocfile(req, res, 'sashikomi.docx')
}

router.gettanahyoji = function (req, res) {
    getdocfile(req, res, 'tanahyoji.doc')
}

router.getfont = function (req, res) {
    var fs = require('fs')
    var util = require('util')
    var fname = './data/CODE39.ttf.zip'
    var stat = fs.statSync(fname)
    res.writeHead(200, {
        'Content-Type': 'application/x-zip-compressed',
        'Content-Disposition': 'attachment; filename=' + 'CODE39.ttf.zip',
        'Content-Length': stat.size
    })
    var rs = fs.createReadStream(fname)
    util.pump(rs, res)
}

module.exports = router;