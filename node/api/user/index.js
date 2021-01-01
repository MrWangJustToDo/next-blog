// 用户信息的操作
const { path } = require("../../path");
const { autoLogin, login, logout, register, getUserExById, getUserByUserId } = require("./user");

exports.userHandler = {
  [path.autoLogin]: autoLogin,
  [path.login]: login,
  [path.logout]: logout,
  [path.register]: register,
  [path.userEx]: getUserExById,
  [path.user]: getUserByUserId,
};
