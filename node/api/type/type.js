const { getType } = require("../../database");
const { fail, success, cacheHandler, actionTransform, actionCatch } = require("../../util");

// 获取type数据
const getTypeAction = actionTransform(
  actionCatch(
    cacheHandler(async ({ res }) => {
      const data = await getType({ db: global.db });
      return success(res, 200, ["获取成功", data]);
    }),
    ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getTypeAction")
  )
);

exports.getTypeAction = getTypeAction;
