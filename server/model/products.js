const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  image: Array,
  title: String,
  metaDescription: String,
  price: Number,
  content: String,
});

const productsModel = mongoose.model("product", productsSchema);
module.exports = productsModel;
