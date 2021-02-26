const { getPrimaryByBlogId, getChildByPrimaryId, deletePrimaryMessageByBlogId, deleteChildMessageByPrimaryId } = require("../../database");
const { fail, success, autoActionHandler } = require("../../utils");
const { RequestError } = require("../../utils/error");

// 获取主评论
const getPrimaryMessageByBlogIdAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const body = req.body || {};
    const { blogId } = body;
    if (blogId === undefined) {
      throw new RequestError("博客id参数不存在", 400);
    }
    const primaryMessages = await getPrimaryByBlogId({ db: global.db, blogId });
    return success(res, 200, ["获取成功", primaryMessages]);
  },
  errHandler: ({ res, e, code = 404 }) => fail(res, code, ["获取失败", e.toString()], "getPrimaryMessageByBlogIdAction"),
  cacheConfig: { needCache: true },
});

// 获取子评论
const getChildMessageByPrimaryIdAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const body = req.body || {};
    const { primaryCommentId } = body;
    if (primaryCommentId === undefined) {
      throw new RequestError("主评论id参数不存在", 400);
    }
    const childMessage = await getChildByPrimaryId({ db: global.db, primaryCommentId });
    return success(res, 200, ["获取成功", childMessage]);
  },
  errHandler: ({ res, e, code = 404 }) => fail(res, code, ["获取失败", e.toString()], "getChildMessageByPrimaryIdAction"),
  cacheConfig: { needCache: true },
});

// 根据博客id删除所有评论
const deleteAllMessageByBlogId = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const blogId = req.query.blogId;
    if (!blogId) {
      throw new RequestError("请求的blogId参数不存在", 400);
    }
    const primaryIds = [];
    // 获取需要删除的主评论
    const primaryMessages = await getPrimaryByBlogId({ db: global.db, blogId });
    primaryMessages.forEach(({ commentId }) => primaryIds.push(commentId));
    // 删除主评论
    await deletePrimaryMessageByBlogId({ db: global.db, blogId });
    // 删除子评论
    for (let id of primaryIds) {
      await deleteChildMessageByPrimaryId({ db: global.db, primaryId: id });
    }
    success(res, 200, ["删除成功", `删除blogId: ${blogId} 下的所有message`]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["删除失败", e.toString()], "deleteAllMessageByBlogId"),
  userConfig: { needCheck: true, checkStrict: true },
});

exports.getPrimaryMessageByBlogIdAction = getPrimaryMessageByBlogIdAction;

exports.getChildMessageByPrimaryIdAction = getChildMessageByPrimaryIdAction;
