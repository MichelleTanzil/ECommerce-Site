var itemsController = require("../controllers/gameproducts.js");
const path = require("path");

module.exports = function(app) {
  // Get all items
  app.get("/hidden-admin-api/items", itemsController.getAll);
  // Get one item
  app.get("/hidden-admin-api/items/:id", itemsController.getOne);
  //Create new item
  app.post("/hidden-admin-api/items", itemsController.create);
  //Delete item
  app.post("/hidden-admin-api/items/:id", itemsController.delete);
  //Update item
  app.put("/hidden-admin-api/items/:id", itemsController.update);
  //Get Cart
  app.get("/api/current-cart", itemsController.getCart);
  //Add to cart
  app.post("/api/add-to-cart/:itemId", itemsController.addToCart);
  //Default route
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"));
  });
};
