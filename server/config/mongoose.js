const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
mongoose.connect("mongodb://localhost/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
require("../models/gameproduct")
// require("../models/shoppingCard")
