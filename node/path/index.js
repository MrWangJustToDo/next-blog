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
  // 首页信息
  home: "/home",
  user: "/user",
  userEx: "/userEx",
  tag: "/tag",
  type: "/type",
  // 管理信息
  addTag: "/addTag",
  addType: "/addType",
  checkTag: "/checkTag",
  checkType: "/checkType",
  deleteTag: "/deleteTag",
  deleteType: "/deleteType",
  changeTag: "/changeTag",
  changeType: "/changeType",
  deleteBlog: "/deleteBlog",
  publishBlog: "/publishBlog",
  // 博客信息
  blog: "/blog",
  childMessage: "/childMessage",
  primaryMessage: "/primaryMessage",
  putChildMessage: "/putChildMessage",
  putPrimaryMessage: "/putPrimaryMessage",

  // 测试api
  testBlog: "/test_blog",
  testHome: "/test_home",
  testTag: "/test_tag",
  testType: "/test_type",
  testUserEx: "/test_userEx",
  testUser: "/test_user",
  testChild: "/test_child",
  testPrimary: "/test_primary",
};

// 访问权限控制
const access = {
  // 用户信息
  [path.autoLogin]: { disable: false },
  [path.login]: { disable: false, token: false, method: "post" },
  [path.logout]: { disable: false, token: false },
  [path.register]: { disable: false, token: false, method: "post" },
  // 图片信息
  [path.image]: { disable: false, token: false },
  [path.captcha]: { disable: false, token: false },
  [path.captchaStr]: { disable: false, token: false },
  // 首页信息
  [path.home]: { disable: false, token: false },
  [path.user]: { disable: false, token: false },
  [path.userEx]: { disable: false, token: true },
  [path.tag]: { disable: false, token: false },
  [path.type]: { disable: false, token: false },
  // 博客信息
  [path.blog]: { disable: false, token: false },
  [path.childMessage]: { disable: false, token: false, method: "post" },
  [path.primaryMessage]: { disable: false, token: false, method: "post" },
  [path.putChildMessage]: { disable: false, token: false, method: "post" },
  [path.putPrimaryMessage]: { disable: false, token: false, method: "post" },
  // 管理信息
  [path.addTag]: { disable: false, token: false, method: "post" },
  [path.addType]: { disable: false, token: false, method: "post" },
  [path.checkTag]: { disable: false, token: false, method: "post" },
  [path.checkType]: { disable: false, token: false, method: "post" },
  [path.deleteTag]: { disable: false, token: false, method: "post" },
  [path.deleteType]: { disable: false, token: false, method: "post" },
  [path.deleteBlog]: { disable: false, token: true, method: "post" },
  [path.publishBlog]: { disable: false, token: true, method: "post" },
};

// api路径对应的key
const apiPath = (path) => `/api${path}`;

exports.path = path;
exports.access = access;
exports.apiPath = apiPath;
