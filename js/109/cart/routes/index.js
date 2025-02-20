var express = require('express');
var router = express.Router();
const items = require('../items.js');
const Cart = require('../cart.js');

console.log(items);

router.use((req, res, next) => {
  const items = req.session.cart?.items;
  const cart = new Cart(items);
  req.cart = cart;
  next();
});

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    console.log('get', req.session.cart);

    res.render('layout', {
      title: 'Take home a pet today!',
      items,
      partials: {
        content: 'index'
      }
    });
  })
  .post((req, res, next) => {
    //console.log(req.body.id, req.body.quantity);

    //const items = req.session.cart?.items;
    //const cart = new Cart(items);
    req.cart.addItem(req.body.id, req.body.quantity);
    req.session.cart = req.cart;
    res.redirect('/');
  });

router.get('/cart', (req, res, next) => {
  //const items = req.session.cart?.items;
  //const cart = new Cart(items);
  const cartItems = req.cart.getItems();

  res.render('layout', {
    title: 'cart',
    items: cartItems,
    total: cartItems.reduce((a, c) => a + Number(c.subtotal), 0).toFixed(2),
    hasItems: cartItems.length,
    partials: {
      content: 'cart'
    }
  });
});

module.exports = router;
