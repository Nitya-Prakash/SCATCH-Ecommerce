const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: {
    type: String,
    default: "#929292",
  },
  pannelcolor: {
    type: String,
    default: "#525252",
  },
  textcolor: {
    type: String,
    default: "#DDDDDE",
  },
  image: {
    type: Buffer,
  },
});

module.exports = mongoose.model("product", productSchema);
