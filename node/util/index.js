const os = require("os");
const { Cache } = require("./cache");
const { getResponse } = require("./response");

const cache = new Cache();

/**
 * get random number between start to end
 * @param {Number} start 随机数开始
 * @param {Number} end  随机数结束
 */
module.exports.getRandom = (start, end) => {
  return ((Math.random() * (end - start + 1)) | 0) + start;
};

/**
 * 服务器响应成功，添加时间戳
 * @param {Object} res express响应对象
 * @param {Object|Array} resData 响应数据内容
 * @returns {Object|Array} resData 返回成功的响应值，用于缓存处理
 */
module.exports.success = (res, code = 200, resData = ["success"]) => {
  res.status(code).json(getResponse(0, resData));
  return resData;
};

/**
 * 服务器响应失败，添加时间戳
 * @param {Object} res express响应对象
 * @param {Object|Array} resData 响应数据内容
 */
module.exports.fail = (res, code = 404, resData = ["not found"], developMessage) => {
  res.status(code).json(getResponse(-1, resData, developMessage));
};

/**
 * express 统一错误捕获处理函数
 * @param {Function} action 正常处理逻辑
 * @param {Function} errHandler 错误捕获处理方法
 */
module.exports.actionHandler = (
  action = ({ res }) => {
    res.end("default");
  },
  errHandler = () => {}
) => {
  return async (req, res, next) => {
    try {
      return await action({ req, res, next });
    } catch (e) {
      this.log(`request error! method: ${req.method} url: ${req.originalUrl} error: ${e.toString()}`);
      errHandler({ req, res, next, e });
    }
  };
};

/**
 * 带有缓存功能的请求处理函数
 * @param {Function} actionHandler 自定义的express请求处理函数
 * @param {Number} time 当前结果缓存的时长
 */
module.exports.cacheHandler = (actionHandler, time) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cacheValue = cache.get(key);
    if (cacheValue) {
      this.log(`get response data from cache. method: ${req.method} url: ${req.originalUrl} key: ${key}`);
      this.success(res, 200, cacheValue);
    } else {
      const value = await actionHandler(req, res, next);
      if (value) {
        cache.set(key, value, time);
      } else {
        this.log(`request fail, so nothing to cache. method: ${req.method} url: ${req.originalUrl}`);
      }
    }
  };
};

/**
 * 获取本机ip地址
 * @returns {String} address 获取本机的ip地址
 */
module.exports.getNetworkAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      const { address, family, internal } = interface;
      if (family === "IPv4" && !internal) {
        return address;
      }
    }
  }
};

/**
 * 日志输出
 * @param {String} message 输出的信息
 * @param  {...Function|String} action 额外操作
 */
module.exports.log = (message, ...action) => {
  if (global.dev) {
    console.log(message);
    action.forEach((item) => {
      if (item) {
        if (typeof item === "function") {
          item();
        } else if (typeof item === "string") {
          console.log(item);
        }
      }
    });
  }
};
