/**
 * 获取响应数据
 * @param {Number} code 响应码
 * @param {Object|Array} resData 响应数据对象
 * @param {String} developMessage 开发错误提示
 */
module.exports.getResponse = (code, resData, developMessage) => {
  const resJson = { code };
  if (Array.isArray(resData)) {
    resJson.state = resData[0];
    if (resData.length === 1) {
      resJson.data = resData[0];
    } else {
      resJson.data = resData[1];
      if (resData.length > 2) {
        resJson.res = resDatas.slice(2);
      }
    }
    resJson.time = new Date().toLocaleString();
    if (global.dev && developMessage) {
      resJson.develop = developMessage;
    }
    return resJson;
  } else if (typeof resData === "object") {
    const newResJson = { ...resData, ...resJson };
    newResJson.time = new Date().toLocaleString();
    if (global.dev && developMessage) {
      newResJson.develop = developMessage;
    }
    return newResJson;
  } else {
    throw new Error(`response data type error resData: ${resData}`);
  }
};
