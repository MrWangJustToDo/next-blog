const { access } = require("../path");
const { fail, actionHandler, log } = require("../util");

// 生成token
const generateToken = actionHandler(
  ({ req, res, next }) => {
    if (!req.session) {
      throw new Error("session not generate!");
    }
    if (!req.session.apiToken) {
      req.session.apiToken = {};
    }
    if (!req.cookies.token || !req.session.apiToken.token || req.cookies.token !== req.session.apiToken.token) {
      const currentToken = process.env.NEXT_PUBLIC_APITOKEN + Math.random().toString(16).slice(2);
      req.session.apiToken.token = currentToken;
      res.cookie("token", currentToken, { expires: new Date(Date.now() + 60 * 60000), encode: String });
    }
    next();
  },
  ({ res, e }) => fail(res, 500, ["服务器错误", e.toString()], `generateToken方法出现异常`)
);

// api访问权限检测
const detectionToken = actionHandler(
  ({ req, res, next }) => {
    if (!req.session) {
      throw new Error("session not generate!");
    }
    const path = req.path;
    const apiToken = req.headers.apitoken;
    if (access[path]) {
      // 开发环境无需验证
      if (global.dev) {
        next();
        return;
      }
      let { disable = false, token = true, method = "get" } = access[path];
      // 当前路径无效
      if (disable) {
        fail(res, 404, ["资源不存在", "未找到指定资源"], "token检测失败");
        return;
      }
      if (method != req.method) {
        fail(res, 404, ["访问被拒绝", "访问方法不支持"], "token检测失败");
        return;
      }
      if (!token) {
        next();
        return;
      }
      // 需要token
      if (token && apiToken === req.session.apiToken["token"]) {
        next();
        return;
      }
      fail(res, 401, ["拒绝访问", "当前没有权限"], "token检测失败");
    } else {
      // 未配置api访问检测
      log(`this api request not set yet: ${path}`);
      next();
    }
  },
  ({ res, e }) => fail(res, 500, ["服务器错误", e.toString()], "detectionToken方法出现异常")
);

exports.generateToken = generateToken;
exports.detectionToken = detectionToken;
