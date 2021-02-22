const { getHome } = require("../../database");
const { fail, success, autoActionHandler } = require("../../util");

// 获取首页数据
const getHomeAction = autoActionHandler({
  actionHandler: async ({ res }) => {
    const data = await getHome({ db: global.db });
    return success(res, 200, ["获取成功", data]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["获取数据失败", e.toString()], "getHomeAction"),
  cacheConfig: { needCache: true },
});

exports.getHomeAction = getHomeAction;
