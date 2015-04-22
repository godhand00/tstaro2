var express = require('express');
var router = express.Router();
var amaz = require('./amaz');
var book = require('./book');
var user = require('./user');
var checkout = require('./checkout');
var excel = require('./excel');
var doc = require('./doc');
var stat = require('./stat');

router.get('/amaz/:isbn', amaz.amaz);
router.get('/amaz_search', amaz.amaz_search);
router.get('/ndl/:isbn', amaz.ndl);

router.get('/getbooks/:domain', book.getbooks);
router.post('/regbook/:domain', book.regbook);
router.post('/updbook/:domain', book.updbook);
router.post('/delbook/:domain', book.delbook);
router.get('/getbookregno/:domain', book.getbookregno);

router.get('/getusers/:domain', user.getusers);
router.post('/reguser/:domain', user.reguser);
router.post('/upduser/:domain', user.upduser);
router.post('/deluser/:domain', user.deluser);
router.post('/login/:domain', user.login);

router.get('/getcheckouts/:domain', checkout.getcheckouts);
router.post('/regcheckout/:domain', checkout.regcheckout);
router.post('/updcheckout/:domain', checkout.updcheckout);
router.post('/delcheckout/:domain', checkout.delcheckout);

router.get('/listbooksxls/:domain', excel.listbooksxls)
router.get('/listusersxls/:domain', excel.listusersxls)
router.get('/listcheckoutsxls/:domain', excel.listcheckoutsxls)

router.post('/readbooksxls/:domain', excel.readbooksxls)
router.post('/readusersxls/:domain', excel.readusersxls)

router.get('/getsashikomi/:domain', doc.getsashikomi)
router.get('/gettanahyoji/:domain', doc.gettanahyoji)
router.get('/getfont', doc.getfont)

router.get('/tagsstat/:domain', stat.tagsstat)
router.get('/ndcsstat/:domain', stat.ndcsstat)


module.exports = router;