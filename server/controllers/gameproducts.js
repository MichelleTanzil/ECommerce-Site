const GameProduct = require("mongoose").model("GameProduct");
const Cart = require("../models/cart");

module.exports = {
  //Admin Controls
  getAll: function(req, res) {
    GameProduct.find()
      .then(items => {
        res.json({ items: items });
      })
      .catch(err => res.json(err));
  },

  getOne: function(req, res) {
    console.log("item id: " + req.params.id);
    GameProduct.findOne({ _id: req.params.id })
      .then(item => {
        console.log("item: ", item);
        res.json(item);
      })
      .catch(err => res.json(err));
  },
  create: function(req, res) {
    const item = new GameProduct(req.body);
    item
      .save()
      .then(item => res.json(item))
      .catch(err => {
        console.log("We have an error!", err);
        for (var key in err.errors) {
          req.flash("new_item", err.errors[key].message);
        }
        res.json(err);
      });
  },
  update: function(req, res) {
    console.log("update item id: " + req.params.id);
    req.body.updated_at = Date.now();
    GameProduct.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      context: "query"
    })
      .then(item => res.json(item))
      .catch(err => {
        console.log("We have an error!", err);
        for (var key in err.errors) {
          req.flash("update_item", err.errors[key].message);
        }
        res.json(err);
      });
  },
  delete: function(req, res) {
    console.log("item id: " + req.params.id);
    GameProduct.deleteOne({ _id: req.params.id })
      .then(() => res.json({ message: "Success" }))
      .catch(err => res.json(err));
  },

  //*******************************************************************
  //Cart

  getCart: function(req, res) {
    if (!req.session.cart) {
      console.log("cart is empty");
      res.json({ items: null });
    } else {
      let cart = new Cart(req.session.cart);
      console.log(cart);
      res.json({
        items: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty
      });
    }
  },

  addToCart: function(req, res) {
    let itemId = req.params.itemId;
    console.log("req.body: ", req.body)
    let cart = new Cart(
      req.session.hasOwnProperty("cart") ? req.session["cart"] : {}
    );

    GameProduct.findById(itemId)
      .then(item => {
        let edition = item.editions.id(req.body.editionId)
        cart.add(item, edition, edition._id, req.body.console);
        req.session["cart"] = cart;
        console.log("CART", cart);
        res.json(req.session["cart"]);
      })
      .catch(err => res.json(err));
  }
};
