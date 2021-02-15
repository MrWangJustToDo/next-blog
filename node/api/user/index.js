// 用户信息的操作
const { path } = require("../../path");
const { autoLoginAction, loginAction, logoutAction, registerAction, getUserExByUserIdAction, getUserByUserIdAction } = require("./user");

exports.userHandler = {
  [path.login]: loginAction,
  [path.autoLogin]: autoLoginAction,
  [path.logout]: logoutAction,
  [path.register]: registerAction,
  [path.user]: getUserByUserIdAction,
  [path.userEx]: getUserExByUserIdAction,
};
