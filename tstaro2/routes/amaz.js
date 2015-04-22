var express = require('express');
var router = express.Router();

router.amaz = function (req, res) {
    var util = require('util'),
        OperationHelper = require('apac').OperationHelper;  //注意! (の前のセミコロン省略不可
    
    (function () {
        OperationHelper.version = '2011-08-01'
        OperationHelper.defaultEndPoint = 'ecs.amazonaws.jp'
    })()
    
    var isbn = req.params.isbn
    console.log('amaz: isbn=' + isbn)
    
    new OperationHelper({
        awsId: env.awsId,
        awsSecret: env.awsSecret,
        assocId: env.assocId
    }).execute('ItemLookup', {
        'SearchIndex': 'Books',
        'IdType': 'ISBN',
        'ItemId': isbn,
        'ResponseGroup': 'Medium'
    }, function (error, results) {
        if (error) {
            res.send('Error: ' + error + '\n')
        } else {
            res.send(results)
        }
    })
};

router.amaz_search = function (req, res) {
    var util = require('util'),
        OperationHelper = require('apac').OperationHelper;
    
    (function () {
        OperationHelper.version = '2011-08-01'
        OperationHelper.defaultEndPoint = 'ecs.amazonaws.jp'
    })()
    
    var limit = 10// req.query.limit
    var start = req.query.start ? parseInt(req.query.start) : 0
    console.log('start: ' + start)
    var ItemPage = ~~(start / limit) + 1
    console.log('ItemPage: ' + ItemPage)
    var exeparam = {
        'SearchIndex': 'Books',
        'ItemPage': ItemPage
    }
    //exeparam[req.query.key] = encodeURIComponent(req.query.word)
    exeparam[req.query.key] = req.query.word
    
    new OperationHelper({
        awsId: env.awsId,
        awsSecret: env.awsSecret,
        assocId: env.assocId,
    }).execute('ItemSearch', exeparam, function (error, results) {
        if (error) {
            console.log('Error: ' + error)
            res.send('Error: ' + error + '\n')
        } else {
            res.send(results)
        }
    })
};

router.ndl = function (req, res) {
    var xml2js = require('xml2js')
    var parser = new xml2js.Parser()
    var isbn = req.params.isbn
    http.get('http://iss.ndl.go.jp/api/opensearch?isbn=' + isbn, function (resp) {
        var body = ""
        parser.on('end', function (result) {
            res.send(result)
        })
        resp.on('data', function (data) {
            body += data
        })
        resp.on('end', function () {
            parser.parseString(body)
        })
    })
};

module.exports = router;