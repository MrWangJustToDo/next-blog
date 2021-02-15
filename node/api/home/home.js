const { getHome } = require("../../database");
const { fail, success, cacheHandler, actionTransform, actionCatch } = require("../../util");

// 获取首页数据
const getHomeAction = actionTransform(
  actionCatch(
    cacheHandler(async ({ res }) => {
      const data = await getHome({ db: global.db });
      return success(res, 200, ["获取成功", data]);
    }),
    ({ res, e }) => fail(res, 500, ["获取数据失败", e.toString()], "getHomeAction")
  )
);

exports.getHomeAction = getHomeAction;
