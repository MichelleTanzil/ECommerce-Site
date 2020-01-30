module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = (item, id, editionId, consoleName) => {
    console.log("entered add function")
    let storedItem = this.items[editionId];
    if (!storedItem) {
      storedItem = this.items[editionId] = { item: item, qty: 0, edition: editionId, price: 0, console: "" };
    }
    storedItem.qty++;
    storedItem.price = item.editions.id(editionId).price;
    storedItem.console = consoleName;
    this.totalQty++;
    this.totalPrice += storedItem.price;
  };

  this.generateArray = () => {
    let arr = [];
    for (let item in this.items) {
      console.log(item)
      arr.push(this.items[item]);
    }
    return arr;
  };
};
