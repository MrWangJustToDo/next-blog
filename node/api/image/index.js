// 验证码相关
const { path } = require("../../path");
const { getCaptcha, getCaptchaStr } = require("./captcha");
const { getImages } = require("./image");

exports.imageHandler = {
  // 获取验证码
  [path.captcha]: getCaptcha,
  // 获取验证码文本
  [path.captchaStr]: getCaptchaStr,
  // 获取随机图片
  [path.image]: getImages,
};
