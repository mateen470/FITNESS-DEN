const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  IDofCurrentUser: String,
  nameOfUser: String,
  comment: String,
});
const productSchema = mongoose.Schema({
  mainImage: String,
  sideImageOne: String,
  sideImageTwo: String,
  title: String,
  metaDescription: String,
  price: Number,
  info: String,
  comments: [commentSchema],
  ratings: {
    type: [Number],
    default: [],
  },
  reviewStars: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
