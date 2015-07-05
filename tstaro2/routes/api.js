var express = require('express');
var router = express.Router();
var amaz = require('./modules/amaz');
var book = require('./modules/book');
var user = require('./modules/user');
var checkout = require('./modules/checkout');
var excel = require('./modules/excel');
var doc = require('./modules/doc');
var stat = require('./modules/stat');

router.get('/amaz/:isbn', amaz.amaz);
router.get('/amaz_search', amaz.amaz_search);
router.get('/ndl/:isbn', amaz.ndl);

router.get('/getbooks/:domain', book.getbooks);
router.post('/regbook/:domain', book.regbook);
router.post('/updbook/:domain', book.updbook);
router.post('/delbook/:domain', book.delbook);
router.get('/getbookregno/:domain', book.getbookregno);

router.get('/books/:domain', book.getbooks);
router.post('/books/:domain', book.regbook);
router.put('/books/:domain', book.updbook);
router.delete('/books/:domain', book.delbook);

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