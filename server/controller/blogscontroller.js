const Blog = require("../model/blogs");

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
};

module.exports = BlogsControllerFunction;
