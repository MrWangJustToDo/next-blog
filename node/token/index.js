const { access } = require("../path");
const { fail, log, actionTransform, actionCatch } = require("../util");
const { RequestError } = require("../util/error");

// 生成token
const generateToken = actionTransform(
  actionCatch(
    ({ req, res, next }) => {
      if (!req.session) {
        throw new RequestError("session not generate!", 500);
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
    ({ res, e, code = 500 }) => fail(res, code, ["服务器错误", e.toString()], "generateToken")
  )
);

// api访问权限检测
const detectionToken = actionTransform(
  actionCatch(
    ({ req, next }) => {
      if (!req.session) {
        throw new RequestError("session not generate!", 500);
      }
      const path = req.path;
      const apiToken = req.headers.apitoken;
      if (access[path]) {
        const { disable = false, token = true, method = "get", config = {} } = access[path];
        // 挂载config
        req.config = config;
        // 开发环境无需验证
        if (global.dev) {
          next();
          return;
        }
        // 当前路径无效
        if (disable) {
          throw new RequestError("路径不存在", 404);
        }
        if (method !== req.method) {
          throw new RequestError(`方法不支持: ${req.method}`, 400);
        }
        if (token && apiToken !== req.session.apiToken["token"]) {
          throw new RequestError("token检测失败", 401);
        }
        next();
      } else {
        // 未配置api访问检测
        log(`this api request not set yet: ${path}`);
        if (global.dev) {
          req.config = {};
          next();
        } else {
          throw new RequestError("访问路径不存在", 404);
        }
      }
    },
    ({ res, e, code = 500 }) => fail(res, code, ["服务器错误", e.toString()], "detectionToken")
  )
);

exports.generateToken = generateToken;
exports.detectionToken = detectionToken;
