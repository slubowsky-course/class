var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('index', { title: 'Express', name: req.cookies.name /*?? ' stranger'*/ });
  })
  .post((req, res, next) => {
    res.cookie('name', req.body.name);
    res.redirect('/');
  });

module.exports = router;
