const { getPrimaryByBlogId, getChildByPrimaryId } = require("../../database");
const { fail, success, cacheHandler, actionTransform, actionCatch } = require("../../util");

// 获取评论,使用post请求
const getPrimaryMessageByBlogIdAction = actionTransform(
  actionCatch(
    cacheHandler(async ({ req, res }) => {
      const body = req.body || {};
      const { blogId } = body;
      if (blogId === undefined) {
        throw new Error("博客id参数不存在");
      }
      const primaryMessages = await getPrimaryByBlogId({ db: global.db, blogId });
      return success(res, 200, ["获取成功", primaryMessages]);
    }),
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getPrimaryMessageByBlogIdAction")
  )
);

const getChildMessageByPrimaryIdAction = actionTransform(
  actionCatch(
    cacheHandler(async ({ req, res }) => {
      const body = req.body || {};
      const { primaryCommentId } = body;
      if (primaryCommentId === undefined) {
        throw new Error("主评论id参数不存在");
      }
      const childMessage = await getChildByPrimaryId({ db: global.db, primaryCommentId });
      return success(res, 200, ["获取成功", childMessage]);
    }),
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getChildMessageByPrimaryIdAction")
  )
);

exports.getPrimaryMessageByBlogIdAction = getPrimaryMessageByBlogIdAction;

exports.getChildMessageByPrimaryIdAction = getChildMessageByPrimaryIdAction;
