var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/').get(function (req, res, next) {
  res.render('layout', {
    title: 'Express',
    // name: req.cookies.name ?? ' Please enter your name',
    partials: {content: 'index'} });
}).post((req, res, next) => {
  res.cookie('name', req.body.name);
  res.redirect('/');
  res.end();
});

module.exports = router;
