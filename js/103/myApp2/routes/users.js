var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/foo', (req, res, next) => {
  res.end('user foo');
});

module.exports = router;
