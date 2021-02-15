// 首页相关
const { path } = require("../../path");
const { getTagAction } = require("./tag");

exports.tagHandler = {
  [path.tag]: getTagAction,
};
