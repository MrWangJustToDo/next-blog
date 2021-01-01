const mergeWith = require("lodash/mergeWith");

/**
 *
 * @param {Object} srcObject 原始对象
 * @returns {Object} resObject  元素转换为数组的对象
 */
const transformObjectValueToArray = (srcObject) => {
  const resObject = {};
  for (let key in srcObject) {
    if (Array.isArray(srcObject[key])) {
      resObject[key] = srcObject[key];
    } else {
      resObject[key] = [srcObject[key]];
    }
  }
  return resObject;
};

/**
 * 合并type与tag信息到blog上
 * @param {Object} blog 当前博客信息
 * @param {Array} type 所有type
 * @param {Array} tag 所有tag
 */
module.exports.mergeTypeTagToBlog = (blog, type, tag) => {
  const currentType = type.find((it) => blog.typeId === it.typeId);
  const currentTagIds = String(blog.tagId).split("#").map(Number);
  const currentTagArray = tag.filter((it) => currentTagIds.includes(it.tagId));
  let currentTag;
  if (currentTagArray.length > 1) {
    currentTag = mergeWith(...currentTagArray, (res, srcValue) => {
      if (!Array.isArray(res)) {
        res = [res];
      }
      return res.concat(srcValue);
    });
  } else {
    currentTag = transformObjectValueToArray(currentTagArray[0]);
  }
  return { ...blog, ...currentType, ...currentTag };
};
