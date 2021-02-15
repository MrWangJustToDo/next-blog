// 用户相关的请求操作
const { fail, success, actionTransform, actionCatch } = require("../../util");
const { getUserByUser, insertUser, getUsersExByUserId, getUserByUserId } = require("../../database");

// 用户登录请求
const loginAction = actionTransform(
  actionCatch(
    async ({ req, res }) => {
      const body = req.body || {};
      if (req.session.captcha === body.checkcode) {
        let user = await getUserByUser({
          username: body.username,
          password: body.password,
          db: global.db,
        });
        if (user) {
          res.cookie("id", user.userId, {
            maxAge: 8640000,
            signed: true,
          });
          success(res, 200, ["登录成功", user]);
        } else {
          throw new Error("用户信息验证失败");
        }
      } else {
        throw new Error("验证码验证失败");
      }
    },
    ({ res, e }) => fail(res, 401, ["登录失败", e.toString()], "loginAction")
  )
);

// 自动登录请求
const autoLoginAction = (req, res) => {
  if (req.user) {
    success(res, 200, { state: "自动登录成功", data: req.user });
  } else {
    fail(res, 200, { state: "自动登录失败" });
  }
};

// 登出请求
const logoutAction = actionTransform(
  actionCatch(
    ({ res }) => {
      res.clearCookie("id");
      success(res, 200, ["登出成功"]);
    },
    ({ res, e }) => fail(res, 500, ["登出错误", e.toString()], "logoutAction")
  )
);

// 注册请求
const registerAction = actionTransform(
  actionCatch(
    async ({ req, res }) => {
      if (!req.body) {
        throw new Error("注册参数不存在");
      }
      const re = await insertUser({ db: global.db, ...req.body });
      success(res, 200, [re]);
    },
    ({ res, e }) => fail(res, 401, ["注册失败", e.toString()], "registerAction")
  )
);

// 获取用户点赞相关数据
const getUserExByUserIdAction = actionTransform(
  actionCatch(
    async ({ req, res }) => {
      if (req.query.userId === undefined) {
        throw new Error("用户信息不存在");
      } else {
        const userId = req.query.userId;
        const data = await getUsersExByUserId({ userId, db: global.db });
        success(res, 200, ["获取成功", data]);
      }
    },
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getUserExByUserIdAction")
  )
);

// 根据id获取用户详细数据
const getUserByUserIdAction = actionTransform(
  actionCatch(
    async ({ req, res }) => {
      if (req.query.userId === undefined) {
        throw new Error("用户信息不存在");
      } else {
        const userId = req.query.userId;
        const data = await getUserByUserId({ db: global.db, userId });
        success(res, 200, ["获取成功", data]);
      }
    },
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getUserByUserIdAction")
  )
);

exports.loginAction = loginAction;
exports.autoLoginAction = autoLoginAction;
exports.logoutAction = logoutAction;
exports.registerAction = registerAction;
exports.getUserByUserIdAction = getUserByUserIdAction;
exports.getUserExByUserIdAction = getUserExByUserIdAction;
