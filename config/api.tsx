// api请求名称
enum apiName {
  home = "home", // 获取home页面数据path
  userEx = "userEx", // 获取用户信息数据path
  user = "user", // 获取用户详细数据
  type = "type", // 获取type页面数据path
  tag = "tag", // 获取tag页面数据path
  blog = "blog", // 获取blog详情
  primaryMessage = "primaryMessage", // 获取主要留言信息
  childMessage = "childMessage", // 获取次要留言信息
  captcha = "captcha", // 获取验证码图片
  captchaStr = "captchaStr", // 获取验证码文本
  putPrimaryMessage = "putPrimaryMessage", // 发布主要评论
  putChildMessage = "putChildMessage", // 发布次要评论
}

export { apiName };
