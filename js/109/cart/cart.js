const items = require('./items.js');

module.exports = class Cart {
  constructor(items) {
    this.items = items ?? {};
  }

  addItem(item, quantity) {
    const current = this.items[item] ?? 0;
    this.items[item] = current + Number(quantity);
  }

  getItems() {
    const cartItems = [];

    const entries = Object.entries(this.items);
    entries.forEach(([key, value]) => {
      const item = items.find(i => i.id === Number(key));
      cartItems.push({
        item: item,
        quantity: value,
        subtotal: (item.price * value).toFixed(2)
      });
    });

    return cartItems;

  }
};
