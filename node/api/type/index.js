// 首页相关
const { path } = require("../../path");
const { getTypeAction } = require("./type");

exports.typeHandler = {
  [path.type]: getTypeAction,
};
