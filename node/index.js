const { apiHandler } = require("./api");
const { generateToken, detectionToken } = require("./token");

// api访问处理

exports.api = (expressApp) => {
  // api访问的token检测
  expressApp.use("/api", detectionToken);

  // 自动生成token
  expressApp.use(generateToken);

  // Express服务器的api相关访问
  expressApp.use("/api", apiHandler);
};
