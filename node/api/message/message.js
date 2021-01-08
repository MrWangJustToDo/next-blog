const { getPrimaryByBlogId, getChildByBlogId } = require("../../database");
const { actionHandler, fail, success, cacheHandler } = require("../../util");

// 获取评论,使用post请求
exports.getPrimaryMessageByBlogId = cacheHandler(
  actionHandler(
    async ({ req, res }) => {
      const body = req.body || {};
      const { data } = body;
      const { blogId } = data || {};
      if (blogId === undefined) {
        throw new Error("博客id参数不存在");
      }
      const primaryMessages = await getPrimaryByBlogId({ db: global.db, blogId });
      success(res, 200, ["获取成功", primaryMessages]);
    },
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getPrimaryMessageByBlogId方法出现错误")
  )
);

exports.getChildMessageByPrimaryId = cacheHandler(
  actionHandler(
    async ({ req, res }) => {
      const body = req.body || {};
      const { data } = body;
      const { primaryCommentId } = data || {};
      if (primaryCommentId === undefined) {
        throw new Error("主评论id参数不存在");
      }
      const childMessage = await getChildByBlogId({ db: global.db, primaryCommentId });
      success(res, 200, ["获取成功", childMessage]);
    },
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getChildMessageByPrimaryId方法出现错误")
  )
);
