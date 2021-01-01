// 首页相关
const { path } = require("../../path");
const { getTagData } = require("./tag");

exports.tagHandler = {
  [path.tag]: getTagData,
};
