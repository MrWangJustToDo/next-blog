// 延迟执行函数
import { Cancel, Delay, TimeoutMap, ResolveMap, KeyMap } from "./@type";

// 类型声明
let timeoutMap: TimeoutMap;
let resolveMap: ResolveMap;
let cancel: Cancel;
let delay: Delay;
let keyMap: KeyMap;

// 实现
timeoutMap = {};
resolveMap = {};
keyMap = {};
let keyLength = 0;

cancel = (key) => {
  const length = timeoutMap[key].length;
  timeoutMap[key] = timeoutMap[key].map((id) => id && clearTimeout(id)).slice(length);
  resolveMap[key] = resolveMap[key].map((resolve) => resolve()).slice(length);
  if (keyLength > 100) {
    // 按照使用次数从小到大排序
    const keys = Object.keys(keyMap).sort((key1, key2) => (keyMap[key1] > keyMap[key2] ? 1 : -1));
    // 删除一半
    for (let key of keys) {
      delete keyMap[key];
      delete timeoutMap[key];
      delete resolveMap[key];
    }
    keyLength = 50;
  }
};

delay = (time, action, key) => {
  if (!(key in keyMap)) {
    keyMap[key] = 1;
    timeoutMap[key] = [];
    resolveMap[key] = [];
    keyLength++;
  } else {
    keyMap[key]++;
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

export { delay, cancel };
