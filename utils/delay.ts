// 延迟执行函数
import { Cancel, Delay, TimeoutMap, ResolveMap, KeyMap } from "./@type";

// 类型声明
let timeoutMap: TimeoutMap;
let resolveMap: ResolveMap;
let cancel: Cancel;
let delay: Delay;
let keyMap: KeyMap;
let keyLength: number;

// 实现
timeoutMap = {};
resolveMap = {};
keyMap = {};
keyLength = 0;

cancel = (key) => {
  if (timeoutMap[key]) {
    const length = timeoutMap[key].length;
    timeoutMap[key] = timeoutMap[key].map((id) => id && clearTimeout(id)).slice(length);
    resolveMap[key] = resolveMap[key].map((resolve) => resolve && resolve()).slice(length);
  }
  if (keyLength > 300) {
    // 按照使用次数从小到大排序
    const keys = Object.keys(keyMap).sort((key1, key2) => (keyMap[key1] > keyMap[key2] ? 1 : -1));
    // 删除一半
    console.log("start delete delay key...");
    for (let keyItem of keys) {
      // 当前数组中没有需要取消的方法并且这个key不是当前需要的key时才删除
      if (keyItem !== key && !resolveMap[keyItem].length) {
        delete keyMap[keyItem];
        delete timeoutMap[keyItem];
        delete resolveMap[keyItem];
      }
    }
    keyLength = 50;
  }
};

delay = (time, action, key) => {
  if (key === undefined) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(action());
      }, time);
    });
  } else {
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
  }
};

export { delay, cancel };
