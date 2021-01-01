require("dotenv").config();
const http = require("http");
const next = require("next");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { corsConfig, sessionConfig } = require("./node/config");
const { init } = require("./node/init");
const { api } = require("./node");

// 环境变量
global.dev = process.env.NODE_ENV !== "production";

// 基础端口
const port = process.env.PORT;

// 创建数据库连接实例
global.db;

// 根据环境变量创建next实例
const nextApp = next({ dev });

// 拿到 http 请求的响应
const handle = nextApp.getRequestHandler();

// 创建express实例
const app = express();

// 配置跨域
app.use(cors(corsConfig()));

// 配置静态文件
app.use(express.static(`${process.cwd()}/public`));
// 配置json解析
app.use(express.json({ limit: "5mb" }));
// 解析表单
app.use(express.urlencoded({ extended: true }));
// 配置cookie
app.use(cookieParser(process.env.COOKIEPARSER));
// 配置session
app.use(session(sessionConfig(process.env.HTTPS)));

// 初始化配置
init(app);

// api访问处理
api(app);

// 创建服务器
nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  http.createServer(app).listen(port, () => {
    console.log(`=== listening on port: ${port} ===`);
  });
});
