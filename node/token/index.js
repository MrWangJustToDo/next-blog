const { access } = require("../path");
const { fail, log, actionTransform, actionCatch } = require("../util");

// 生成token
const generateToken = actionTransform(
  actionCatch(
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
    ({ res, e }) => fail(res, 500, ["服务器错误", e.toString()], "generateToken")
  )
);

// api访问权限检测
const detectionToken = actionTransform(
  actionCatch(
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
          throw new Error("路径不存在");
        }
        if (method != req.method) {
          throw new Error(`方法不支持: ${req.method}`);
        }
        if (token && apiToken !== req.session.apiToken["token"]) {
          throw new Error("token检测失败");
        }
        next();
      } else {
        // 未配置api访问检测
        log(`this api request not set yet: ${path}`);
        if (global.dev) {
          next();
        } else {
          throw new Error("访问路径不存在");
        }
      }
    },
    ({ res, e }) => fail(res, 500, ["服务器错误", e.toString()], "detectionToken")
  )
);

exports.generateToken = generateToken;
exports.detectionToken = detectionToken;
