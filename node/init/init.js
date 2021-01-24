const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { fail, actionHandler, log } = require("../util");
const { getUserById } = require("../database");

// 绑定数据源
exports.initConnect = actionHandler(
  async ({ next }) => {
    if (!global.db) {
      global.db = await sqlite.open({
        filename: process.env.DATABASE,
        driver: sqlite3.Database,
      });
    }
    next();
  },
  ({ res, e }) => fail(res, 500, ["数据库绑定出错", e.toString()])
);

// 生成默认session对象
exports.generateSession = actionHandler(
  async ({ req, next }) => {
    // 使用登录用户的state进行默认session初始化
    if (!req.session.views) {
      req.session.views = {};
    }
    next();
  },
  ({ res, e }) => fail(res, 500, ["服务器错误", e.toString()])
);

// 解码URI
exports.decodeURI = actionHandler(({ req, next }) => {
  req.url = decodeURIComponent(req.url);
  next();
});

// log输出
exports.log = (req, res, next) => {
  if (!req.url.startsWith("/_next") && !req.url.startsWith("/__next")) {
    log(`method: ${req.method} request url: ${req.url}`);
  }
  next();
};

// 如果登录成功，自动为req对象绑定user属性
exports.autoGetUser = actionHandler(
  async ({ req, next }) => {
    // 从签名cookie中找出该用户的信息并挂在req对象上以供后续的中间件访问
    if (req.signedCookies.id) {
      // 从session中找登录信息
      if (req.session && req.session.userCache) {
        req.user = req.session.userCache;
      }
      if (!req.user) {
        req.user = await getUserById({
          userId: req.signedCookies.id,
          db: global.db,
        });
        if (req.session) {
          req.session.userCache = req.user;
        }
      }
    }
    next();
  },
  ({ res, e }) => fail(res, 500, ["数据库查询错误", e.toString()])
);
