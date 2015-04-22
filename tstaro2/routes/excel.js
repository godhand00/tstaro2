var express = require('express');
var router = express.Router();
var myutil = require('./myutil');
var env = require('./env');

/*
 * get xls file
 */
var listxls = function (colname, sorter, req, res) {
    var cp = require('child_process')
    var fs = require('fs')
    var util = require('util')
    console.log('listxls: colname=' + colname)
    var db = myutil.getDb(req.params.domain)
    db.open(function (err, db) {
        db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
            db.collection(colname, function (err, collection) {
                collection.find().sort(sorter).toArray(function (err, results) {
                    db.close()
                    var temp = require('temp')
                    temp.open('temp', function (err, tfinfo) {
                        fs.write(tfinfo.fd, JSON.stringify(results))
                        fs.close(tfinfo.fd, function (err) {
                            console.log(tfinfo.path)
                            cp.exec('python ./python_modules/makexls.py ' + colname + ' ' + tfinfo.path, { timeout: 10000 }, function (error, stdout, stderr) {
                                if (!error) {
                                    var fname = stdout.trim()
                                    var stat = fs.statSync(fname)
                                    res.writeHead(200, {
                                        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                        'Content-Disposition': 'attachment; filename=' + colname + '.xls',
                                        'Content-Length': stat.size
                                    })
                                    var rs = fs.createReadStream(fname)
                                    util.pump(rs, res)
                                    fs.unlink(fname)
                                } else {
                                    console.log('error: ' + error)
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

var readxls = function (colname, req, res) {
    var cp = require('child_process')
    var fs = require('fs')
    var util = require('util')
    console.log('readxls: colname=' + colname + ', file=' + req.files.file.path)
    cp.exec('./python_modules/xlstojson.py ' + colname + ' ' + req.files.file.path, { timeout: 10000 }, function (err, stdout, stderr) {
        fs.unlink(req.files.file.path)
        var db = myutil.getDb(req.params.domain)
        db.open(function (err, db) {
            db.authenticate(env.MONGODB_LOGIN, env.MONGODB_PASSWORD, function (err) {
                db.collection(colname, function (err, collection) {
                    var list = JSON.parse(stdout)
                    for (var idx in list) {
                        list[idx].regdate = new Date()
                        list[idx].upddate = list[idx].regdate
                        collection.insert(list[idx], { safe: true }, function (err, doc) {
                        })
                    }
                    db.close()
                    res.send({
                        success: true
                    })
                })
            })
        })
    })
}

router.listbooksxls = function (req, res) {
    listxls('books', { regno: 1 }, req, res)
}

router.listusersxls = function (req, res) {
    listxls('users', { account: 1 }, req, res)
}

router.listcheckoutsxls = function (req, res) {
    listxls('checkouts', {}, req, res)
}

router.readbooksxls = function (req, res) {
    readxls('books', req, res)
}

router.readusersxls = function (req, res) {
    readxls('users', req, res)
}

module.exports = router;