module.exports = class Cart {
  constructor(items) {
    this.items = items ?? {};
  }

  addItem(id, quantity) {
    const current = this.items[id] ?? 0;
    this.items[id] = Number(quantity) + current;
  }
}
