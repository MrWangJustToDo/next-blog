// 首页相关
const { path } = require("../../path");
const { getTypeData } = require("./type");

exports.typeHandler = {
  [path.type]: getTypeData,
};
