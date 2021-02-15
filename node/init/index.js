// 初始化配置
const { initConnect, generateSession, decodeURI, serverLog, autoGetUser } = require("./init");

exports.init = (expressApp) => {
  // 绑定数据库连接
  expressApp.use(initConnect);

  // 解码URL
  expressApp.use(decodeURI);

  // 初始化session
  expressApp.use(generateSession);

  // 打印日志
  expressApp.use(serverLog);

  // 自动加载登录用户信息
  expressApp.use(autoGetUser);
};
