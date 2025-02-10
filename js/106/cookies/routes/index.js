var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    partials: {
      content: 'index'
    },
    title: 'Express'
  });
});

module.exports = router;
