const {
  insertHome,
  insertBlog,
  getTagByTagId,
  getTypeByTypeId,
  getBlogByBlogId,
  updateTagCountByTagId,
  updateTypeCountByTypeId,
  deleteBlogByBlogIdWithBlogState,
  deleteHomeByBlogIdWithBlogState,
  updateTableWithParam,
} = require("../../database");
const { path } = require("../../path");
const { fail, success, autoActionHandler } = require("../../utils");
const { RequestError } = require("../../utils/error");

// 根据id获取blog
const getBlogByBlogIdAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    if (req.query.blogId === undefined) {
      throw new RequestError("博客id为空", 400);
    } else {
      const blogId = req.query.blogId;
      const data = await getBlogByBlogId({ db: global.db, blogId });
      return success(res, 200, ["获取成功", data]);
    }
  },
  errHandler: ({ res, e, code }) => fail(res, code, ["获取失败", e.toString()], "getBlogByBlogIdAction"),
  cacheConfig: { needCache: true },
});

// 发布一个新的blog
const publishBlogAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const { blogOriginState, blogTitle, blogContent, typeId, tagId, blogImgLink, blogState, blogPriseState, blogCommentState, blogPreview } = req.body;
    if (typeId) {
      // 获取当前type
      const type = await getTypeByTypeId({ db: global.db, typeId });
      // 增加type
      await updateTypeCountByTypeId({ db: global.db, typeId, count: type.typeCount + 1 });
    }
    if (tagId) {
      const tagIdArr = tagId.split(",");
      for (let id of tagIdArr) {
        const tag = await getTagByTagId({ db: global.db, tagId: id });
        await updateTagCountByTagId({ db: global.db, tagId, count: tag.tagCount + 1 });
      }
    }
    // 增加blog
    const now = new Date();
    const authorId = req.user.userId;
    const blogId = now.getTime().toString(36);
    const blogCreateDate = now.toLocaleString();
    const blogCreateYear = now.getFullYear();
    const blogModifyDate = now.toLocaleString();
    const blogModifyState = 0;
    const blogAssentCount = 0;
    const blogCollectCount = 0;
    const blogReadCount = 0;
    const blogPriseStateNum = Number(blogPriseState === "on");
    const blogCommentStateNum = Number(blogCommentState === "on");
    // 增加blog
    await insertBlog({
      db: global.db,
      authorId,
      blogId,
      blogState,
      blogOriginState,
      blogTitle,
      blogImgLink,
      blogCreateDate,
      blogModifyState,
      blogModifyDate,
      blogPreview,
      blogContent,
      blogAssentCount,
      blogCollectCount,
      blogReadCount,
      blogPriseState: blogPriseStateNum,
      blogCommentState: blogCommentStateNum,
      typeId,
      tagId,
    });
    // 增加home
    await insertHome({
      db: global.db,
      authorId,
      blogId,
      blogState,
      blogTitle,
      blogCreateDate,
      blogCreateYear,
      blogImgLink,
      blogPreview,
      blogAssentCount,
      blogCollectCount,
      blogReadCount,
      typeId,
      tagId,
    });
    success(res, 200, ["创建博客成功", `id: ${now.getTime().toString(36)}`]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["创建博客失败", e.toString()], "publishBlogAction"),
  userConfig: { needCheck: true, checkStrict: true },
  cacheConfig: { needDelete: [path.home] },
});

// 根据id删除blog
const deleteBlogByBlogIdAAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const { blogId, typeId, tagId } = req.body;
    if (tagId) {
      const tagIdArr = tagId.split(",");
      for (let id of tagIdArr) {
        const tag = await getTagByTagId({ db: global.db, tagId: id });
        await updateTagCountByTagId({ db: global.db, tagId, count: tag.tagCount - 1 });
      }
    }
    if (typeId) {
      // 获取当前type
      const type = await getTypeByTypeId({ db: global.db, typeId });
      // 减少type
      await updateTypeCountByTypeId({ db: global.db, typeId, count: type.typeCount - 1 });
    }
    // 删除blog
    await deleteBlogByBlogIdWithBlogState({ db: global.db, blogId });
    // 删除home
    await deleteHomeByBlogIdWithBlogState({ db: global.db, blogId });
    success(res, 200, ["删除博客成功"]);
  },
  errHandler: ({ res, e, code = 400 }) => fail(res, code, ["删除博客失败", e.toString()], "deleteBlogAAction"),
  userConfig: { needCheck: true, checkStrict: true },
  cacheConfig: { needDelete: [path.home] },
});

// 根据id更新blog
const updateBlogByBlogIdAction = autoActionHandler({
  actionHandler: async ({ req, res }) => {
    const { oldProps, newProps } = req.body;
    // 删除了type
    if (oldProps.typeId) {
      // 获取type
      const type = await getTypeByTypeId({ db: global.db, typeId: oldProps.typeId });
      // 减少type
      await updateTypeCountByTypeId({ db: global.db, typeId: oldProps.typeId, count: type.typeCount - 1 });
    }
    // 增加了type
    if (newProps.typeId) {
      // 获取type
      const type = await getTypeByTypeId({ db: global.db, typeId: newProps.typeId });
      // 增加type
      await updateTypeCountByTypeId({ db: global.db, typeId: newProps.typeId, count: type.typeCount + 1 });
    }
    // 删除了tag
    if (oldProps.tagId) {
      const tagIdArr = oldProps.tagId.split(",");
      for (let id of tagIdArr) {
        const tag = await getTagByTagId({ db: global.db, tagId: id });
        await updateTagCountByTagId({ db: global.db, tagId, count: tag.tagCount - 1 });
      }
    }
    // 增加了tag
    if (newProps.tagId) {
      const tagIdArr = newProps.tagId.split(",");
      for (let id of tagIdArr) {
        const tag = await getTagByTagId({ db: global.db, tagId: id });
        await updateTagCountByTagId({ db: global.db, tagId, count: tag.tagCount + 1 });
      }
    }
    // 进行更新
    const { blogId, ...resProps } = newProps;
    await updateTableWithParam({ db: global.db, table: "blogs", param: { set: { ...resProps }, where: { blogId: { value: blogId } } } });
    // await updateTableWithParam({ db: global.db, table: "home", param: {set: {}} });
    success(res, 200, ["更新成功", `更新blog成功, id: ${blogId}`]);
  },
  errHandler: ({ res, e, code = 500 }) => fail(res, code, ["更新失败", e.toString()], "updateBlogByBlogIdAction"),
  userConfig: { needCheck: true, checkStrict: true },
});

exports.getBlogByBlogIdAction = getBlogByBlogIdAction;

exports.publishBlogAction = publishBlogAction;

exports.deleteBlogByBlogIdAAction = deleteBlogByBlogIdAAction;
