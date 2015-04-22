var express = require('express');
var router = express.Router();
var amaz = require('./amaz');
var book = require('./book');

router.get('/amaz/:isbn', amaz.amaz);
router.get('/amaz_search', amaz.amaz_search);
router.get('/ndl/:isbn', amaz.ndl);

router.get('/getbooks/:domain', book.getbooks);
router.post('/regbook/:domain', book.regbook);
router.post('/updbook/:domain', book.updbook);
router.post('/delbook/:domain', book.delbook);
router.get('/getbookregno/:domain', book.getbookregno);

router.get('/getusers/:domain', routes.getusers);
router.post('/reguser/:domain', routes.reguser);
router.post('/upduser/:domain', routes.upduser);
router.post('/deluser/:domain', routes.deluser);
router.post('/login/:domain', routes.login);

router.get('/getcheckouts/:domain', routes.getcheckouts);
router.post('/regcheckout/:domain', routes.regcheckout);
router.post('/updcheckout/:domain', routes.updcheckout);
router.post('/delcheckout/:domain', routes.delcheckout);

router.get('/listbooksxls/:domain', routes.listbooksxls)
router.get('/listusersxls/:domain', routes.listusersxls)
router.get('/listcheckoutsxls/:domain', routes.listcheckoutsxls)

router.post('/readbooksxls/:domain', routes.readbooksxls)
router.post('/readusersxls/:domain', routes.readusersxls)

router.get('/getsashikomi/:domain', routes.getsashikomi)
router.get('/gettanahyoji/:domain', routes.gettanahyoji)
router.get('/getfont', routes.getfont)

router.get('/tagsstat/:domain', routes.tagsstat)
router.get('/ndcsstat/:domain', routes.ndcsstat)


module.exports = router;