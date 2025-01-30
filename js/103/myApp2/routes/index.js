var express = require('express');
var router = express.Router();

const favoritePresident = { name: 'Ronald Reagan' }; //null

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'PCS', presidents: [
      { name: 'Donald Trump' },
      { name: 'Joe Biden' },
      { name: 'Barack Hussein Obama' }
    ],
    favoritePresident,
    colors: ['red', 'white', 'blue'],
    noFavoritePresident: favoritePresident ? false : true
  });
});

router.get('/foo', (req, res, next) => {
  res.end('index foo');
});

module.exports = router;
