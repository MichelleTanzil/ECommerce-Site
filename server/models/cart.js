module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = (item, id, editionId) => {
    console.log("entered add function")
    let storedItem = this.items[editionId];
    if (!storedItem) {
      storedItem = this.items[editionId] = { item: item, qty: 0, edition: editionId, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = item.editions.id(editionId).price;
    this.totalQty++;
    this.totalPrice += storedItem.price;
  };

  this.generateArray = () => {
    let arr = [];
    for (let id of this.items) {
      console.log(id)
      arr.push(this.items[id]);
    }
    return arr;
  };
};
