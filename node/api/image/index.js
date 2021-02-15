// 验证码相关
const { path } = require("../../path");
const { getCaptchaAction, getCaptchaStrAction } = require("./captcha");
const { getRandomImageAction } = require("./image");

exports.imageHandler = {
  // 获取验证码
  [path.captcha]: getCaptchaAction,
  // 获取验证码文本
  [path.captchaStr]: getCaptchaStrAction,
  // 获取随机图片
  [path.image]: getRandomImageAction,
};
