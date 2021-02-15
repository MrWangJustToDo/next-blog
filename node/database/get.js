const { mergeTypeTagToBlog } = require("./util");

// 根据用户名与密码获取用户信息
exports.getUserByUser = async ({ username, password, db }) => {
  return await db.get("SELECT rowid as id, * FROM users WHERE username = ? AND password = ?", username, password);
};

// 根据用户id获取用户信息
exports.getUserByUserId = async ({ userId, db }) => {
  return await db.get("SELECT * FROM users WHERE users.userId = ?", userId);
};

// 获取总的用户数
exports.getUserCount = async ({ db }) => {
  return await db.get("SELECT COUNT(*) FROM users");
};

// 获取home数据
exports.getHome = async ({ db }) => {
  const home = await db.all("SELECT * FROM home LEFT JOIN users WHERE home.authorId = users.userId");
  const type = await db.all("SELECT * FROM type");
  const tag = await db.all("SELECT * FROM tag");
  return home.map((item) => mergeTypeTagToBlog(item, type, tag));
};

// 根据userId获取个人点赞，收藏等信息
exports.getUsersExByUserId = async ({ userId, db }) => {
  return await db.get("SELECT * FROM usersEx WHERE userId = ?", userId);
};

// 获取type数据
exports.getType = async ({ db }) => {
  return await db.all("SELECT * FROM type");
};

// 根据typeId获取type数据
exports.getTypeByTypeId = async ({ db, typeId }) => {
  return await db.get("SELECT * FROM type WHERE typeId = ?", typeId);
};

// 获取tag数据
exports.getTag = async ({ db }) => {
  return await db.all("SELECT * FROM tag");
};

// 根据tagId获取tag数据
exports.getTagByTagId = async ({ db, tagId }) => {
  return await db.get("SELECT * FROM tag WHERE tagId = ?", tagId);
};

// 根据blogId获取详细的blog数据
exports.getBlogByBlogId = async ({ db, blogId }) => {
  const blog = await db.get("SELECT * FROM blogs LEFT JOIN users WHERE blogId = ? AND blogs.authorId = users.userId", blogId);
  const type = await db.all("SELECT * FROM type");
  const tag = await db.all("SELECT * FROM tag");
  return mergeTypeTagToBlog(blog, type, tag);
};

// 获取总的博客数
exports.getBlogCount = async ({ db }) => {
  return await db.get("SELECT COUNT(*) FROM blogs");
};

// 获取主评论
exports.getPrimaryByBlogId = async ({ db, blogId }) => {
  return await db.all("SELECT * FROM primaryComment LEFT JOIN users WHERE primaryComment.blogId = ? AND primaryComment.userId = users.userId", blogId);
};

// 获取子评论
exports.getChildByPrimaryId = async ({ db, primaryCommentId }) => {
  const childMessage = await db.all(
    "SELECT * FROM childComment LEFT JOIN users WHERE childComment.primaryCommentId = ? AND childComment.fromUserId = users.userId",
    primaryCommentId
  );
  for (let key in childMessage) {
    const { toUserId } = childMessage[key];
    if (toUserId) {
      const user = await this.getUserById({ db, userId: toUserId });
      childMessage[key]["toUserName"] = user.username;
    }
  }
  return childMessage;
};
