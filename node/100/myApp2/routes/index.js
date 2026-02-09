var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const favoritePerson = {name: 'Donald Trump'};
  res.locals.foo = 'BAR';
  res.render('layout',
    {
      //title: 'PCS',
      people: [
        {name: 'Donald Trump'},
        {name: 'JD Vance'},
        {name: 'Ayatolla Khomeni'}
      ],
      favoritePerson,
      hasNoFavorite: !favoritePerson,
      fruits: ['apple', 'orange', 'pear'],
      partials: {content: 'index.hjs'}
    });
});

module.exports = router;
