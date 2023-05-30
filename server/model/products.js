const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  mainImage: String,
  sideImageOne: String,
  sideImageTwo: String,
  title: String,
  metaDescription: String,
  price: Number,
  content: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
