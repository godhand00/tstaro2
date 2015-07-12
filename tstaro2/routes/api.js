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

router.get('/getbookregno/:domain', book.getbookregno);

router.get('/books/:domain', book.getbooks);
router.post('/books/:domain', book.regbook);
router.put('/books/:domain', book.updbook);
router.delete('/books/:domain', book.delbook);

router.get('/users/:domain', user.getusers);
router.post('/user/:domain', user.reguser);
router.put('/user/:domain', user.upduser);
router.delete('/user/:domain', user.deluser);

router.post('/login/:domain', user.login);

router.get('/checkouts/:domain', checkout.getcheckouts);
router.post('/checkouts/:domain', checkout.regcheckout);
router.put('/checkouts/:domain', checkout.updcheckout);
router.delete('/checkouts/:domain', checkout.delcheckout);

router.get('/booksxls/:domain', excel.listbooksxls);
router.get('/usersxls/:domain', excel.listusersxls);
router.get('/checkoutsxls/:domain', excel.listcheckoutsxls);

router.post('/booksxls/:domain', excel.readbooksxls);
router.post('/usersxls/:domain', excel.readusersxls);

router.get('/sashikomi/:domain', doc.getsashikomi);
router.get('/tanahyoji/:domain', doc.gettanahyoji);
router.get('/barcodefont', doc.getfont);

router.get('/tagsstat/:domain', stat.tagsstat);
router.get('/ndcsstat/:domain', stat.ndcsstat);


module.exports = router;