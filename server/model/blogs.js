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
  mainData: String,
  likes: [
    {
      IDofCurrentUser: String,
    },
  ],
  dislikes: [
    {
      IDofCurrentUser: String,
    },
  ],
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  numberOfDislikes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
});

const blogsModel = mongoose.model("blog", blogsSchema);
module.exports = blogsModel;
