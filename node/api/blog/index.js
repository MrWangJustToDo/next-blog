// 博客信息
const { path } = require("../../path");
const { getBlogByBlogIdAction, publishBlogAction, deleteBlogByBlogIdAAction } = require("./blog");

exports.blogHandler = {
  [path.blog]: getBlogByBlogIdAction,
  [path.publishBlog]: publishBlogAction,
  [path.deleteBlog]: deleteBlogByBlogIdAAction,
};
