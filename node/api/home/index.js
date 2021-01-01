// 首页相关
const { path } = require("../../path");
const { getHomeData } = require("./home");

exports.homeHandler = {
  [path.home]: getHomeData,
};
