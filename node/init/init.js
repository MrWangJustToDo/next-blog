const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { getUserByUserId } = require("../database");
const { fail, log, actionTransform, actionCatch } = require("../utils");

// 绑定数据源
const initConnect = actionTransform(
  actionCatch(
    async ({ next }) => {
      if (!global.db) {
        global.db = await sqlite.open({
          filename: process.env.DATABASE,
          driver: sqlite3.Database,
        });
      }
      next();
    },
    ({ res, e }) => fail(res, 500, ["绑定数据库出错", e.toString()], "initConnect")
  )
);

// 生成默认session对象
const generateSession = actionTransform(
  actionCatch(
    ({ req, next }) => {
      // 使用登录用户的state进行默认session初始化
      if (!req.session.views) {
        req.session.views = {};
      }
      next();
    },
    ({ res, e }) => fail(res, 500, ["服务器错误", e.toString()], "generateSession")
  )
);

// 解码URI
const decodeURI = actionTransform(
  actionCatch(({ req, next }) => {
    req.url = decodeURIComponent(req.url);
    next();
  })
);

// log输出
const serverLog = (req, res, next) => {
  if (!req.url.startsWith("/_next") && !req.url.startsWith("/__next")) {
    log(`method: ${req.method} request url: ${req.url}`);
  }
  next();
};

// 如果登录成功，自动为req对象绑定user属性
const autoGetUser = actionTransform(
  actionCatch(
    async ({ req, next }) => {
      // 从签名cookie中找出该用户的信息并挂在req对象上以供后续的中间件访问
      if (req.signedCookies.id) {
        // 从session中找登录信息
        if (req.session.userCache) {
          req.user = req.session.userCache;
        }
        if (!req.user) {
          req.user = await getUserByUserId({
            userId: req.signedCookies.id,
            db: global.db,
          });
          req.session.userCache = req.user;
        }
      } else {
        req.session.userCache = null;
      }
      next();
    },
    ({ res, e }) => fail(res, 500, ["数据库查询错误", e.toString()], "autoGetUser")
  )
);

exports.initConnect = initConnect;
exports.generateSession = generateSession;
exports.decodeURI = decodeURI;
exports.serverLog = serverLog;
exports.autoGetUser = autoGetUser;
