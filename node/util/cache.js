const { delay } = require("./delay");

// 可缓存工具对象
class Cache {
  constructor(maxTime = 1000 * 60 * 10, store = new Map()) {
    if (!store.has || !store.set || !store.delete || !store.get) {
      throw new Error(`store must is a Map. store: ${store}`);
    }
    this.maxTime = maxTime;
    this.store = store;
  }

  set(key, value, time = this.maxTime) {
    if (this.store.has(key)) {
      console.warn(`already cache, should not cache again! key: ${key} oldValue: ${this.store.get(key)} newValue: ${value}`);
    }
    this.store.set(key, value);
    this.delete(key, time);
  }

  delete(key, time = this.maxTime) {
    delay(
      time,
      () => {
        if (this.store.has(key)) {
          console.log(`start delete data from cache, next request will update this data. key: ${key}`);
          this.store.delete(key);
        } else {
          console.error(`error, nothing need to delete. key: ${key}`);
        }
      },
      key
    );
  }

  get(key) {
    if (this.store.has(key)) {
      return this.store.get(key);
    } else {
      console.warn(`warn, not cache yet, nothing to return. key: ${key}`);
      return false;
    }
  }
}

exports.Cache = Cache;
