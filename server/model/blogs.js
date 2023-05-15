const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema({
  image: String,
  title: String,
  metaDescription: String,
  content: String,
});

const blogsModel = mongoose.model("blog", blogsSchema);
module.exports = blogsModel;
