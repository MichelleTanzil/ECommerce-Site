const mongoose = require("mongoose");
const GameProductSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    image: {
      type: String,
      default: ""
    },
    description: {
      type: String
    },
    editions: [
      {
        title: String,
        releaseYear: String,
        price: Number
      }
    ],
    releaseDate: {
      type: String
    },
    system: [
      {
        console: String
      }
    ],
    // screenshots: [{ images: String }]
  },
  { timestamps: true }
);

// create an object that contains methods for mongoose to interface with MongoDB
mongoose.model("GameProduct", GameProductSchema);
