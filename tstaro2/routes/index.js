var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.redirect('/dev/index.html');
    //res.redirect('/javascripts/index.html');
});

module.exports = router;