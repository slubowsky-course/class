var express = require('express');
const items = require('../items.js');
const Cart = require ('../cart.js');

var router = express.Router();


router.route('/')
  .get((req, res, next) => {
    console.log(req.session.cart);

    res.render('layout', {
      title: 'Items for sale',
      items,
      partials: {
        content: 'index'
      }
    });
  })
  .post((req, res, next) => {
    console.log(req.body);

    // req.session.cart = req.body;
    // const cart = new Cart();
    //const cart = req.session.cart ?? new Cart();
    const cart = new Cart(req.session.cart?.items);
    cart.addItem(req.body.id, req.body.quantity);
    req.session.cart = cart;

    res.redirect('/');
  });

router.get('/cart', (req, res, next) => {
  const entries = req.session.cart?.items ? Object.entries(req.session.cart?.items) : [];

  const cartItems = entries?.map(([id, quantity]) => {
    //console.log(`${quantity} of ${id}`);

    const item = items.find(i => i.id === +id);

    return {
      item,
      quantity: quantity,
      subtotal: (Number(item.price) * quantity).toFixed(2)
    }
  });

  console.log(cartItems);

  res.render('layout', {
    title: 'Your cart',
    items: cartItems,
    total: (cartItems.reduce((a,c) => a + Number(c.subtotal), 0)).toFixed(2),
    hasItems: cartItems.length,
    partials: {
      content: 'cart'
    }
  });
});

module.exports = router;
