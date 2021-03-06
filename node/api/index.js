const { imageHandler } = require("./image");
const { homeHandler } = require("./home");
const { tagHandler } = require("./tag");
const { typeHandler } = require("./type");
const { userHandler } = require("./user");
const { blogHandler } = require("./blog");
const { messageHandler } = require("./message");
const { testHandler } = require("./test");
const { fail } = require("../utils");

const allHandler = {
  ...imageHandler,
  ...homeHandler,
  ...tagHandler,
  ...typeHandler,
  ...userHandler,
  ...blogHandler,
  ...messageHandler,
  ...testHandler,
};

// 自动api访问响应处理
const apiHandler = async (req, res, next) => {
  let action = allHandler[req.path];
  if (action) {
    await action(req, res);
  } else {
    // 其他api访问转向next api router
    // next();
    fail(res, 404, ["api路径不存在", `请求: ${req.path}`]);
  }
};

exports.apiHandler = apiHandler;
