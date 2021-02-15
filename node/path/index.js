// 服务器端访问路径

const path = {
  // 用户信息
  autoLogin: "/autoLogin" /*自动登录*/,
  login: "/login" /*登录*/,
  logout: "/logout" /*登出*/,
  register: "/register" /*注册*/,
  // 图片相关
  image: "/image",
  captcha: "/captcha",
  captchaStr: "/captchaStr",
  // 页面信息
  home: "/home",
  user: "/user",
  userEx: "/userEx",
  type: "/type",
  tag: "/tag",
  // 博客信息
  blog: "/blog",
  deleteBlog: "/deleteBlog",
  publishBlog: "/publishBlog",
  primaryMessage: "/primaryMessage",
  childMessage: "/childMessage",

  // 测试接口
  testBlog: "/testBlog",
  testHome: "/testHome",
  testTag: "/testTag",
  testType: "/testType",
  testUserEx: "/testUserEx",
  testUser: "/testUser",
  testPrimary: "/testPrimary",
  testChild: "/testChild",
};

// 访问权限控制

const access = {
  [path.autoLogin]: { disable: false },
  [path.login]: { disable: false, token: false, method: "post" },
  [path.logout]: { disable: false, token: false },
  [path.register]: { disable: false, token: false, method: "post" },
  [path.captcha]: { disable: false, token: false },
  [path.captchaStr]: { disable: false, token: false },
  [path.image]: { disable: false, token: false },
  [path.home]: { disable: false, token: false },
  [path.user]: { disable: false, token: false },
  [path.userEx]: { disable: false, token: true },
  [path.type]: { disable: false, token: false },
  [path.tag]: { disable: false, token: false },
  [path.blog]: { disable: false, token: false },
  [path.primaryMessage]: { disable: false, token: false, method: "post" },
  [path.childMessage]: { disable: false, token: false, method: "post" },
  [path.publishBlog]: { disable: false, token: true, method: "post" },
};

exports.path = path;
exports.access = access;
