module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = (item, edition, editionId, consoleName) => {
    console.log("entered add function")
    let uniqueId = editionId.toString() + consoleName;
    let storedItem = this.items[uniqueId];
    if (!storedItem) {
      storedItem = this.items[uniqueId] = {
        item: item,
        qty: 0,
        edition: edition,
        price: 0,
        console: ""
      };
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
