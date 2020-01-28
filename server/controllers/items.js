const Item = require("mongoose").model("Item");

module.exports = {
  getAll: function(req, res) {
    Item.find()
      .then(items => {
        console.log(items);
        res.json({ items: items });
      })
      .catch(err => res.json(err));
  },

  getOne: function(req, res) {
    console.log("item id: " + req.params.id);
    Item.findOne({ _id: req.params.id })
      .then(item => {
        console.log("item: ", item);
        res.json(item);
      })
      .catch(err => res.json(err));
  },
  create: function(req, res) {
    const item = new Item(req.body);
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
    Item.findByIdAndUpdate({ _id: req.params.id }, req.body, {
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
    Item.deleteOne({ _id: req.params.id })
      .then(() => res.json({ message: "Success" }))
      .catch(err => res.json(err));
  },

  updateCart: function (req, res) {
    console.log("current cart: ", req.session.cart)
    for (items in req.session.cart) {
      if (req.body.item.name == req.session.cart.item.name) {
        req.session.item.quantity = req.body.quantity
      }

    }
  }
};
