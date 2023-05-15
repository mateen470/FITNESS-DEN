const express = require("express");
const blogRouter = express.Router();
const BlogsControllerFunction = require("../controller/blogscontroller");

blogRouter.post("/add-blog", BlogsControllerFunction.Create);
blogRouter.get("/all-blogs", BlogsControllerFunction.ShowAllBlogs);
blogRouter.get("/single-blog/:id", BlogsControllerFunction.ViewSingleBlog);
blogRouter.put("/update-blog/:id", BlogsControllerFunction.UpdateBlog);
blogRouter.delete("/delete-blog/:id", BlogsControllerFunction.DeleteBlog);

module.exports = blogRouter;
