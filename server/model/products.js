const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  mainImage: String,
  sideImageOne: String,
  sideImageTwo: String,
  title: String,
  metaDescription: String,
  price: Number,
  content: String,
});

const productsModel = mongoose.model("product", productsSchema);
module.exports = productsModel;
