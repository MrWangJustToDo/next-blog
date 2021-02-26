const timeoutMap = {};
const resolveMap = {};

/**
 * 取消指定key的后续所有定时任务
 * @param {String} key 定时任务对应的key
 */
const cancel = (key) => {
  const length = timeoutMap[key].length;
  if (length) {
    timeoutMap[key] = timeoutMap[key].map((id) => id && clearTimeout(id)).slice(length);
    resolveMap[key] = resolveMap[key].map((resolve) => resolve()).slice(length);
  }
};

/**
 * 延迟执行任务
 * @param {Number} time 延迟毫秒数
 * @param {Function} action 需要执行的操作
 * @param {String} key 当前延迟任务对应的key
 */
const delay = (time, action, key) => {
  if (key === undefined) {
    throw new Error("mast have a key for this delay function");
  }
  if (!(key in timeoutMap)) {
    timeoutMap[key] = [];
    resolveMap[key] = [];
  }
  cancel(key);
  return new Promise((resolve) => {
    resolveMap[key].push(resolve);
    timeoutMap[key].push(
      setTimeout(() => {
        resolve(action());
      }, time)
    );
  });
};

exports.delay = delay;
exports.cancel = cancel;
