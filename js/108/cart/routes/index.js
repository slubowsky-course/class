var express = require('express');
var router = express.Router();
const items = require('../items.js');

console.log(items);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Take home a pet today!',
    items,
    partials: {
      content: 'index'
    }
  });
});

module.exports = router;
