const Blog = require("../model/blogs");
const User = require("../model/auth-schema");

const BlogsControllerFunction = {
  Create: async (req, res) => {
    try {
      const { image, title, metaDescription, content } = req.body;
      if (!title || !metaDescription || !content || !image) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE FILL IN ALL FIELDS!!" });
      }
      const blogData = new Blog({
        image,
        title,
        metaDescription,
        content,
      });

      await blogData.save();

      return await res.status(200).json({
        success: true,
        message: "BLOG ADDED SUCCESSFULLY!!",
        data: blogData,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T ADD BLOG!!`,
      });
    }
  },
  ShowAllBlogs: async (req, res) => {
    try {
      const allBlogs = await Blog.find();

      return await res.status(200).json({
        success: true,
        message: "BLOG FETCHED SUCCESSFULLY!!",
        data: allBlogs,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T FETCH ALL BLOGS!!`,
      });
    }
  },
  ViewSingleBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const singleBlog = await Blog.findById({ _id: id });
      return await res.status(200).json({
        success: true,
        message: "BLOG FETCHED SUCCESSFULLY!!",
        data: singleBlog,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "AN ERROR OCCURED!!",
      });
    }
  },
  UpdateBlog: async (req, res) => {
    try {
      const updatedBlog = await Blog.findOne({
        _id: req.params.id,
      });

      updatedBlog.title = req.body.title;
      updatedBlog.metaDescription = req.body.metaDescription;
      updatedBlog.content = req.body.content;
      updatedBlog.image = req.body.image;

      await updatedBlog.save();

      return await res.status(200).json({
        success: true,
        message: "BLOG UPDATED SUCCESSFULLY!!",
        data: updatedBlog,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "CAN'T UPDATE BLOG!!",
      });
    }
  },
  DeleteBlog: async (req, res) => {
    try {
      await Blog.findOneAndDelete({ _id: req.params.id });
      return await res.status(200).json({
        success: true,
        message: "BLOG DELETED SUCCESSFULLY !!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "CAN'T DELETE BLOG!!",
      });
    }
  },
  Comment: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, comment } = req.body;

      const getUserName = await User.findOne({ _id: userId });
      const userName = getUserName.name;

      if (!comment) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE WRITE A COMMENT FIRST!!" });
      }

      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "BLOG NOT FOUND!!",
        });
      }
      const existingComment = blog.comments.find(
        (blogComment) => blogComment.IDofCurrentUser === userId
      );
      if (existingComment) {
        return res.status(400).json({
          success: false,
          message: "YOU HAVE ALREADY COMMENTED ON THIS BLOG!!",
        });
      }
      const newComment = {
        IDofCurrentUser: userId,
        nameOfUser: userName,
        comment,
      };
      blog.comments.push(newComment);
      await blog.save();

      return res.status(200).json({
        success: true,
        message: "COMMENT ADDED SUCCESSFULLY!!",
        data: newComment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "CAN'T ADD COMMENT!!",
      });
    }
  },
};

module.exports = BlogsControllerFunction;
