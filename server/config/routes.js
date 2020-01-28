var itemsController = require("../controllers/items.js");

module.exports = function(app) {
  // Get all items
  app.get("/items", itemsController.getAll);
  // Get one item
  app.get("/items/:id", itemsController.getOne);
  //Create new item
  app.post("/items", itemsController.create);
  //Delete item
  app.post("/items/:id", itemsController.delete);
  //Update item
  app.put("/items/:id", itemsController.update);
  //Default route
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"));
  });
};
