// 首页相关
const { path } = require("../../path");
const { getHomeAction } = require("./home");

exports.homeHandler = {
  [path.home]: getHomeAction,
};
