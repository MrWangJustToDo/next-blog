const { getHome } = require("../../database");
const { fail, success, actionHandler, cacheHandler } = require("../../util");

// 获取首页数据
const getHomeData = cacheHandler(
  actionHandler(
    async ({ res }) => {
      const data = await getHome({ db: global.db });
      return success(res, 200, ["获取成功", data]);
    },
    ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getHomeData出现错误")
  )
);

exports.getHomeData = getHomeData;
