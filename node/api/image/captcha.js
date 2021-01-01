const svgCaptcha = require("svg-captcha");
const { fail, success, actionHandler } = require("../../util");

// 获取验证码图片
exports.getCaptcha = actionHandler(
  ({ req, res }) => {
    let captcha = svgCaptcha.create({
      noise: 4,
      background: "#ffffff",
    });
    req.session.captcha = captcha.text;
    res.type("svg");
    res.send(captcha.data);
  },
  ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getCaptcha出现错误")
);

// 获取验证码明文
exports.getCaptchaStr = (req, res) => {
  success(res, 200, ["获取成功", req.session.captcha]);
};
