// api请求名称
enum apiName {
  home = "home", // 获取home页面数据path
  userEx = "userEx", // 获取用户信息数据path
  user = "user", // 获取用户详细数据
  type = "type", // 获取type页面数据path
  tag = "tag", // 获取tag页面数据path
  blog = "blog", // 获取blog详情
  login = "login", // 登录
  logout = "logout", // 登出
  autoLogin = "autoLogin", // 自动登录
  primaryMessage = "primaryMessage", // 获取主要留言信息
  childMessage = "childMessage", // 获取次要留言信息
  captcha = "captcha", // 获取验证码图片
  captchaStr = "captchaStr", // 获取验证码文本
  putPrimaryMessage = "putPrimaryMessage", // 发布主要评论
  putChildMessage = "putChildMessage", // 发布次要评论
  publishBlog = "publishBlog", // 发布博客信息
  image = "image", // 获取图片
  search = "search", // 搜索博客
}

// 需要暂存结果的路径
enum cacheApi {
  home,
  userEx,
  user,
  type,
  tag,
  blog,
}

export { apiName, cacheApi };
