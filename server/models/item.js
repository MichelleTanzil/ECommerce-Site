const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A name is required for this review"]
    },
    image: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      required: [true, "A description is required for this item"]

    }
  },
  { timestamps: true }
);

// create an object that contains methods for mongoose to interface with MongoDB
mongoose.model("Item", ItemSchema);