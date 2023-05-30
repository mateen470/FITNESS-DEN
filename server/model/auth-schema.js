const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
  cart: [cartItemSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
