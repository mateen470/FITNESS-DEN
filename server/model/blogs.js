const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  IDofCurrentUser: String,
  nameOfUser: String,
  comment: String,
});

const blogsSchema = mongoose.Schema({
  image: String,
  title: String,
  metaDescription: String,
  content: String,
  comments: [commentSchema],
});

const blogsModel = mongoose.model("blog", blogsSchema);
module.exports = blogsModel;
