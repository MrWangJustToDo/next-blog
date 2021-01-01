// 跨域配置
exports.corsConfig = (develop = true) => {
  if (develop) {
    return {
      maxAge: 86400,
      origin: "*",
    };
  } else {
    return {};
  }
};

// session配置
exports.sessionConfig = (https = false) => {
  if (https) {
    return {
      secret: "keyboard cat",
      resave: true,
      rolling: true,
      saveUninitialized: true,
      cookie: { secure: true, maxAge: 600000 },
      name: "blog_id",
    };
  } else {
    return {
      secret: "keyboard cat",
      resave: true,
      rolling: true,
      saveUninitialized: true,
      cookie: { maxAge: 600000 },
      name: "blog_id",
    };
  }
};
