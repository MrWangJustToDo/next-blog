// 首页相关
const { path } = require("../../path");
const { getTypeAction, checkTypeAction, addTypeAction } = require("./type");

exports.typeHandler = {
  [path.type]: getTypeAction,
  [path.addType]: addTypeAction,
  [path.checkType]: checkTypeAction,
};
