const {
  insertBlog,
  getBlogByBlogId,
  getTypeByTypeId,
  getTagByTagId,
  updateTypeCountByTypeId,
  updateTagCountByTagId,
  deleteBlogByBlogId,
} = require("../../database");
const { actionTransform, actionCatch, fail, success, cacheHandler, userHandler } = require("../../util");

// 根据id获取blog
const getBlogByBlogIdAction = actionTransform(
  actionCatch(
    cacheHandler(async ({ req, res }) => {
      if (req.query.blogId === undefined) {
        throw new Error("博客id为空");
      } else {
        const blogId = req.query.blogId;
        const data = await getBlogByBlogId({ db: global.db, blogId });
        return success(res, 200, ["获取成功", data]);
      }
    }),
    ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getBlogByBlogIdAction")
  )
);

// 发布一个新的blog
const publishBlogAction = actionTransform(
  actionCatch(
    userHandler(async ({ req, res }) => {
      const { blogOriginState, blogTitle, blogContent, typeId, tagId, blogImgLink, blogState, blogPriseState, blogCommentState, blogPreview } = req.body;
      // 获取当前type
      const type = await getTypeByTypeId({ db: global.db, typeId });
      // 获取当前tag
      const tag = await getTagByTagId({ db: global.db, tagId });
      // 增加type
      await updateTypeCountByTypeId({ db: global.db, typeId, count: type.typeCount + 1 });
      // 增加tag
      await updateTagCountByTagId({ db: global.db, tagId, count: tag.tagCount + 1 });
      // 增加blog
      const now = new Date();
      await insertBlog({
        db: global.db,
        authorId: req.user.userId,
        blogId: now.getTime().toString(36),
        blogState,
        blogOriginState,
        blogTitle,
        blogImgLink,
        blogCreateDate: now.toLocaleString(),
        blogModifyState: 0,
        blogModifyDate: now.toLocaleString(),
        blogPreview,
        blogContent,
        blogAssentCount: 0,
        blogCollectCount: 0,
        blogReadCount: 0,
        blogPriseState,
        blogCommentState,
        typeId,
        tagId,
      });
      success(res, 200, ["创建博客成功", `id: ${now.getTime().toString(36)}`]);
    }, true),
    ({ res, e }) => fail(res, 401, ["创建博客失败", e.toString()], "publishBlogAction")
  )
);

// 根据id删除blog
const deleteBlogByBlogIdAAction = actionTransform(
  actionCatch(
    userHandler(async ({}) => {
      const { blogId, typeId, tagId } = req.body;
      // 获取当前type
      const type = await getTypeByTypeId({ db: global.db, typeId });
      // 获取当前tag
      const tag = await getTagByTagId({ db: global.db, tagId });
      // 减少type
      await updateTypeCountByTypeId({ db: global.db, typeId, count: type.typeCount - 1 });
      // 减少tag
      await updateTagCountByTagId({ db: global.db, tagId, count: tag.tagCount - 1 });
      // 删除blog
      await deleteBlogByBlogId({ db: global.db, blogId });
      success(res, 200, ["删除博客成功"]);
    }, true),
    ({ res, e }) => fail(res, 401, ["删除博客失败", e.toString()], "deleteBlogAAction")
  )
);

exports.getBlogByBlogIdAction = getBlogByBlogIdAction;
exports.publishBlogAction = publishBlogAction;
exports.deleteBlogByBlogIdAAction = deleteBlogByBlogIdAAction;
