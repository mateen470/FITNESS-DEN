const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  mainImage: String,
  sideImageOne: String,
  sideImageTwo: String,
  title: String,
  metaDescription: String,
  price: Number,
  info: String,

});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
