// 用户相关的请求操作
const { getUserByUser, insertUser, getUsersExByUserId, getUserByUserId } = require("../../database");
const { fail, success, autoActionHandler } = require("../../util");
const { RequestError } = require("../../util/error");

// 用户登录请求
const loginAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const body = req.body || {};
    if (req.session.captcha !== body.checkcode) {
      throw new RequestError("验证码验证失败", 401);
    }
    const user = await getUserByUser({
      username: body.username,
      password: body.password,
      db: global.db,
    });
    if (!user) {
      throw new RequestError("用户信息验证失败", 401);
    }
    res.cookie("id", user.userId, {
      maxAge: 8640000,
      signed: true,
    });
    success(res, 200, ["登录成功", user]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["登录失败", e.toString()], "loginAction"),
});

// 自动登录请求
const autoLoginAction = (req, res) => {
  if (req.user) {
    success(res, 200, { state: "自动登录成功", data: req.user });
  } else {
    fail(res, 200, { state: "自动登录失败" });
  }
};

// 登出请求
const logoutAction = (res) => {
  res.clearCookie("id");
  success(res, 200, ["登出成功"]);
};

// 注册请求
const registerAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    if (!req.body) {
      throw new RequestError("注册参数不存在", 400);
    }
    const re = await insertUser({ db: global.db, ...req.body });
    success(res, 200, ["注册成功", re]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["注册失败", e.toString()], "registerAction"),
});

// 获取用户点赞相关数据
const getUserExByUserIdAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    if (req.query.userId === undefined) {
      throw new RequestError("用户信息不存在", 400);
    } else {
      const userId = req.query.userId;
      const data = await getUsersExByUserId({ userId, db: global.db });
      success(res, 200, ["获取成功", data]);
    }
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["获取失败", e.toString()], "getUserExByUserIdAction"),
});

// 根据id获取用户详细数据
const getUserByUserIdAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    if (req.query.userId === undefined) {
      throw new RequestError("查询用户信息不存在", 400);
    }
    const userId = req.query.userId;
    const data = await getUserByUserId({ db: global.db, userId });
    success(res, 200, ["获取成功", data]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["获取失败", e.toString()], "getUserByUserIdAction"),
});

exports.loginAction = loginAction;
exports.autoLoginAction = autoLoginAction;
exports.logoutAction = logoutAction;
exports.registerAction = registerAction;
exports.getUserByUserIdAction = getUserByUserIdAction;
exports.getUserExByUserIdAction = getUserExByUserIdAction;
