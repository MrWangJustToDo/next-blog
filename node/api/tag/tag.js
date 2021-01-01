const { getTag } = require("../../database");
const { fail, success, actionHandler, cacheHandler } = require("../../util");

// 获取type数据
const getTagData = cacheHandler(
  actionHandler(
    async ({ res }) => {
      const data = await getTag({ db: global.db });
      return success(res, 200, ["获取成功", data]);
    },
    ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getTagData方法出现错误")
  )
);

exports.getTagData = getTagData;
