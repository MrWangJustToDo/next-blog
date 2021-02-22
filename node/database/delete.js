// 删除指定blog
exports.deleteBlogByBlogId = async ({ db, blogId }) => {
  return await db.run("DELETE FROM blogs WHERE blogId = ?", blogId);
};

// 设置指定blog为删除状态
exports.deleteBlogByBlogIdWithBlogState = async ({ db, blogId }) => {
  return await db.run("UPDATE blogs SET blogState = ? WHERE blogId = ?", -1, blogId);
};

// 删除指定home
exports.deleteHomeByBlogId = async ({ db, blogId }) => {
  return await db.run("DELETE FROM home WHERE blogId = ?", blogId);
};

// 设置指定home为删除状态
exports.deleteHomeByBlogIdWithBlogState = async ({ db, blogId }) => {
  return await db.run("UPDATE blogs SET blogState = ? WHERE blogId = ?", -1, blogId);
};

// 删除指定type
exports.deleteTypeByTypeId = async ({ db, typeId }) => {
  return await db.run("DELETE FROM type WHERE typeId = ?", typeId);
};

// 设置指定type为删除状态
exports.deleteTypeByTypeIdWithTypeState = async ({ db, typeId }) => {
  return await db.run("UPDATE type SET typeId = ? WHERE typeId = ?", -1, typeId);
};

// 删除指定tag
exports.deleteTagByTagId = async ({ db, tagId }) => {
  return await db.run("DELETE FROM tag WHERE tagId = ?", tagId);
};

// 删除指定博客下的所有primaryMessage
exports.deletePrimaryMessageByBlogId = async ({ db, blogId }) => {
  return await db.run("DELETE FROM primaryComment WHERE blogId = ?", blogId);
};

// 删除指定primaryMessage
exports.deletePrimaryMessageByCommentId = async ({ db, commentId }) => {
  return await db.run("DELETE FROM primaryComment WHERE commentId = ?", commentId);
};

// 删除指定primaryMessage下的所有childMessage
exports.deleteChildMessageByPrimaryId = async ({ db, primaryId }) => {
  return await db.run("DELETE FROM childComment WHERE primaryCommentId = ?", primaryId);
};

// 删除指定childMessage
exports.deleteChildMessageByCommentId = async ({ db, commentId }) => {
  return await db.run("DELETE FROM childComment WHERE commentId = ?", commentId);
};
