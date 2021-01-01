// 用户相关的请求操作
const { fail, success, actionHandler } = require("../../util");
const { getUserByUser, insertUser, getUsersEx, getUserById } = require("../../database");

// 用户登录请求
exports.login = actionHandler(
  async ({ req, res }) => {
    if (req.session.captcha === req.body.checkcode) {
      let user = await getUserByUser({
        username: req.body.username,
        password: req.body.password,
        db: global.db,
      });
      if (user) {
        res.cookie("id", user.id, {
          maxAge: 8640000,
          signed: true,
        });
        success(res, 200, ["登录成功", user]);
      } else {
        fail(res, 200, ["登录失败", "用户信息验证失败"]);
      }
    } else {
      fail(res, 200, ["登录失败", "验证码错误"]);
    }
  },
  ({ res, e }) => fail(res, 500, ["登录服务出错", e.toString()], "login方法出现错误")
);

// 自动登录请求
exports.autoLogin = async (req, res) => {
  if (req.user) {
    success(res, 200, { state: "自动登录成功", data: req.user });
  } else {
    fail(res, 200, { state: "自动登录失败" });
  }
};

// 登出请求
exports.logout = actionHandler(
  ({ res }) => {
    res.clearCookie("id");
    success(res, 200, ["登出成功"]);
  },
  ({ res, e }) => {
    fail(res, 500, ["登出错误", e.toString()], "logout方法出现错误");
  }
);

// 注册请求
exports.register = actionHandler(
  async ({ req, res }) => {
    if (!req.body) {
      throw new Error("注册参数不存在");
    }
    const re = await insertUser({ db: global.db, ...req.body });
    success(res, 200, [re]);
  },
  ({ res, e }) => fail(res, 401, ["注册失败", e.toString()], "register方法出现错误")
);

// 获取用户点赞相关数据
exports.getUserExById = actionHandler(
  async ({ req, res }) => {
    if (req.query.userId === undefined) {
      throw new Error("用户信息不存在");
    } else {
      const userId = req.query.userId;
      const data = await getUsersEx({ userId, db: global.db });
      success(res, 200, ["获取成功", data]);
    }
  },
  ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getUserExById方法出现错误")
);

// 根据id获取用户详细数据
exports.getUserByUserId = actionHandler(
  async ({ req, res }) => {
    if (req.query.userId === undefined) {
      throw new Error("用户信息不存在");
    } else {
      const userId = req.query.userId;
      const data = await getUserById({ db: global.db, userId });
      success(res, 200, ["获取成功", data]);
    }
  },
  ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getUserByUserId方法出现错误")
);
