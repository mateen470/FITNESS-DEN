import mongoose from "mongoose";

const user = new mongoose.Schema({
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
});

const newUser = new mongoose.model("User", user);
module.exports = newUser;
