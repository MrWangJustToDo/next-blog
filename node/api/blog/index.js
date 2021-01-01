// 博客信息
const { path } = require("../../path");
const { getBlog } = require("./getBlog");

exports.blogHandler = {
  [path.blog]: getBlog,
};
