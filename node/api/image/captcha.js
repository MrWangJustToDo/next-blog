const svgCaptcha = require("svg-captcha");
const { fail, success, actionTransform, actionCatch } = require("../../util");

// 获取验证码图片
const getCaptchaAction = actionTransform(
  actionCatch(
    async ({ req, res }) => {
      const captcha = svgCaptcha.create({
        noise: 4,
        background: "#ffffff",
      });
      req.session.captcha = captcha.text;
      res.type("svg");
      res.send(captcha.data);
    },
    ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getCaptchaAction")
  )
);

// 获取验证码明文
const getCaptchaStrAction = actionTransform(actionCatch(({ req, res }) => success(res, 200, ["获取成功", req.session.captcha])));

exports.getCaptchaAction = getCaptchaAction;
exports.getCaptchaStrAction = getCaptchaStrAction;
