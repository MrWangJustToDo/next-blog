const { getTag } = require("../../database");
const { fail, success, cacheHandler, actionTransform, actionCatch } = require("../../util");

// 获取type数据
const getTagAction = actionTransform(
  actionCatch(
    cacheHandler(async ({ res }) => {
      const data = await getTag({ db: global.db });
      return success(res, 200, ["获取成功", data]);
    }),
    ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getTagAction")
  )
);

exports.getTagAction = getTagAction;
