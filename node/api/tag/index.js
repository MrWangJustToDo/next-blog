// 首页相关
const { path } = require("../../path");
const { getTagAction, checkTagAction, addTagAction } = require("./tag");

exports.tagHandler = {
  [path.tag]: getTagAction,
  [path.addTag]: addTagAction,
  [path.checkTag]: checkTagAction,
};
