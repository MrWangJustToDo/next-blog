const os = require("os");
const assign = require("lodash/assign");
const { Cache } = require("./cache");
const { RequestError } = require("./error");
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
 * @param {String} methodName 出现错误的方法名
 */
module.exports.fail = (res, code = 404, resData = ["not found"], methodName) => {
  res.status(code).json(getResponse(-1, resData, methodName ? methodName + "方法出现错误" : undefined));
};

/**
 * express访问参数转换
 * @param {Function} actionHandler 自定义express访问功能函数
 */
module.exports.actionTransform = (actionHandler) => {
  return async (req, res, next) => {
    return await actionHandler({ req, res, next });
  };
};

/**
 * express 错误处理函数，必须放在actionTransform中
 * @param {Function} actionHandler 自定义的express访问功能函数
 * @param {Function} errHandler 访问出错时的处理函数
 */
module.exports.actionCatch = (actionHandler, errHandler = () => {}) => {
  return async ({ req, res, next }) => {
    try {
      return await actionHandler({ req, res, next });
    } catch (e) {
      this.log(`request error! method: ${req.method} url: ${req.originalUrl} error: ${e.toString()}`);
      if (e instanceof RequestError) {
        errHandler({ req, res, next, e, code: e.code });
      } else {
        errHandler({ req, res, next, e });
      }
    }
  };
};

/**
 * express 缓存处理函数，必须放在actionCatch中
 * @param {Function} actionHandler 自定义的express请求处理函数
 * @param {Number} time 当前结果缓存的时长
 * @param {Object} cacheConfig 缓存配置 {needDelete: String | Array | Boolean, needCache: Boolean, cacheTime: 毫秒}
 */
module.exports.cacheHandler = (actionHandler, time, cacheConfig) => {
  return async ({ req, res, next }) => {
    const currentCacheConfig = assign(cacheConfig, req.config.cache);
    const key = req.originalUrl;
    const needCache = currentCacheConfig.needCache;
    const needDelete = currentCacheConfig.needDelete;
    if (needDelete) {
      if (Array.isArray(needDelete)) {
        needDelete.forEach(cache.deleteRightNow);
      } else if (typeof needDelete === "string") {
        cache.deleteRightNow(needDelete);
      } else if (needDelete === true) {
        cache.deleteRightNow(key);
      }
    }
    if (needCache) {
      const cacheValue = cache.get(key);
      if (cacheValue) {
        this.log(`get response data from cache. method: ${req.method} url: ${req.originalUrl} key: ${key}`);
        this.success(res, 200, cacheValue);
      } else {
        // 缓存第一次请求后的resData，已经符合了规则
        const value = await actionHandler({ req, res, next });
        if (value) {
          const currentCacheTime = currentCacheConfig.cacheTime ? currentCacheConfig.cacheTime : time;
          cache.set(key, value, currentCacheTime);
        } else {
          this.log(`nothing to return, so nothing to cache. method: ${req.method} url: ${req.originalUrl}`);
        }
      }
    } else {
      return await actionHandler({ req, res, next });
    }
  };
};

/**
 * express 访问处理函数，必须放在actionCatch中
 * @param {Function} actionHandler 自定义的express请求处理函数
 * @param {Boolean} strict 验证模式，请求参数必须带有userId
 * @param {Object} userConfig 验证配置  {needCheck: Boolean, checkStrict: Boolean}
 */
module.exports.userHandler = (actionHandler, strict, userConfig) => {
  return async ({ req, res, next }) => {
    const currentUserConfig = assign(userConfig, req.config.user);
    const needCheck = currentUserConfig.needCache;
    if (needCheck) {
      if (!req.user) {
        throw new RequestError("未登录，拒绝访问", 401);
      }
      const currentStrict = currentUserConfig.checkStrict ? currentUserConfig.checkStrict : strict;
      if (currentStrict) {
        if (req.user.userId !== req.query.userId) {
          throw new RequestError("登录用户与发布用户不一致", 401);
        }
      }
      return await actionHandler({ req, res, next });
    } else {
      return await actionHandler({ req, res, next });
    }
  };
};

/**
 * 包裹所有判断处理逻辑的action，可扩展
 * @param {{actionHandler:Function, errHandler: Function, strict: Boolean, time: Number, cacheConfig: {needCache: Boolean, needDelete: Array | String | Boolean, cacheTime: Number}, userConfig: {needCheck: Boolean, checkStrict: Boolean}}} param
 */
module.exports.autoActionHandler = ({ actionHandler, errHandler, strict, time, cacheConfig, userConfig }) =>
  this.actionTransform(this.actionCatch(this.userHandler(this.cacheHandler(actionHandler, time, cacheConfig), strict, userConfig), errHandler));

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
