var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.bar = 'BAR';
  res.render('index', { title: 'PCS!', foo: 'FOO' });
});

module.exports = router;
