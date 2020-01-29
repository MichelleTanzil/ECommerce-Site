const mongoose = require("mongoose");
const GameProductSchema = new mongoose.Schema(
  {
    title: {
      type: String
      // required: [true, "A name is required for this game"]
    },
    image: {
      type: String,
      default: ""
    },
    description: {
      type: String
      // required: [true, "A description is required for this game"]
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
    screenshots: [{ images: String }]
    // rating: {
    //   type: String
    // }
  },
  { timestamps: true }
);

// create an object that contains methods for mongoose to interface with MongoDB
mongoose.model("GameProduct", GameProductSchema);
