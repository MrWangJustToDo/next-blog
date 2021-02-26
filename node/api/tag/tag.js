const { getTag, getTagByTagContent, getTagCount, insertTag } = require("../../database");
const { fail, success, autoActionHandler } = require("../../utils");
const { RequestError } = require("../../utils/error");

// 获取tag数据
const getTagAction = autoActionHandler({
  actionHandler: async ({ res }) => {
    const data = await getTag({ db: global.db });
    return success(res, 200, ["获取成功", data]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["获取失败", e.toString()], "getTagAction"),
  cacheConfig: { needCache: true },
});

// 判断当前tag是否存在
const checkTagAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const { tagContent } = req.body;
    if (!tagContent) {
      throw new RequestError("check tag参数不正确", 400);
    }
    const result = await getTagByTagContent({ db: global.db, tagContent });
    if (result) {
      throw new RequestError("tag 内容重复", 400);
    }
    success(res, 200, ["检测通过", "当前tag可以使用"]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["检测未通过", e.toString()]),
  userConfig: { needCheck: true, checkStrict: true },
});

// 新增tag
const addTagAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const { tagContent } = req.body;
    if (!tagContent) {
      throw new RequestError("add tag参数不正确", 400);
    }
    const tagCount = await getTagCount({ db: global.db });
    await insertTag({ db: global.db, tagId: tagCount + 1, tagContent, tagCount: 0 });
    success(res, 200, ["新增tag成功", `tagId: ${tagCount + 1}, tagContent: ${tagContent}`]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["添加失败", e.toString()], "addTagAction"),
  userConfig: { needCheck: true, checkStrict: true },
});

exports.getTagAction = getTagAction;
exports.addTagAction = addTagAction;
exports.checkTagAction = checkTagAction;
