// 删除指定blog
exports.deleteBlogByBlogId = async ({ db, blogId }) => {
  return await db.run("DELETE FROM blog WHERE blogId = ?", blogId);
};

// 删除指定type
exports.deleteTypeByTypeId = async ({ db, typeId }) => {
  return await db.run("DELETE FROM type WHERE typeId = ?", typeId);
};

// 删除指定tag
exports.deleteTagByTagId = async ({ db, tagId }) => {
  return await db.run("DELETE FROM tag WHERE tagId = ?", tagId);
};
