const { getType, getTypeByTypeContent, getTypeCount, insertType } = require("../../database");
const { fail, success, autoActionHandler } = require("../../util");
const { RequestError } = require("../../util/error");

// 获取type数据
const getTypeAction = autoActionHandler({
  actionHandler: async ({ res }) => {
    const data = await getType({ db: global.db });
    return success(res, 200, ["获取成功", data]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["获取失败", e.toString()], "getTypeAction"),
  cacheConfig: { needCache: true },
});

// 判断当前type是否存在
const checkTypeAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const { typeContent } = req.body;
    if (!typeContent) {
      throw new RequestError("check type参数不正确", 400);
    }
    const result = await getTypeByTypeContent({ db: global.db, typeContent });
    if (result) {
      throw new RequestError("type 内容重复", 400);
    }
    success(res, 200, ["检测通过", "当前type可以使用"]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["检测未通过", e.toString()]),
  userConfig: { needCheck: true, checkStrict: true },
});

// 新增type
const addTypeAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const { typeContent } = req.body;
    if (!typeContent) {
      throw new RequestError("add type参数不正确", 400);
    }
    const typeCount = await getTypeCount({ db: global.db });
    await insertType({ db: global.db, typeId: typeCount + 1, typeContent, typeCount: 0 });
    success(res, 200, ["新增type成功", `typeId: ${typeCount + 1}, typeContent: ${typeContent}`]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["添加失败", e.toString()], "addTypeAction"),
  userConfig: { needCheck: true, checkStrict: true },
});

exports.getTypeAction = getTypeAction;
exports.addTypeAction = addTypeAction;
exports.checkTypeAction = checkTypeAction;
