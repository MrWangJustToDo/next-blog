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
  const aliveHome = await db.all("SELECT * FROM home LEFT JOIN users WHERE home.authorId = users.userId AND home.blogState != -1");
  const aliveType = await this.getAliveType({ db });
  const aliveTag = await this.getAliveTag({ db });
  return aliveHome.map((item) => mergeTypeTagToBlog(item, aliveType, aliveTag));
};

// 根据userId获取个人点赞，收藏等信息
exports.getUsersExByUserId = async ({ userId, db }) => {
  return await db.get("SELECT * FROM usersEx WHERE userId = ?", userId);
};

// 获取所有type数据
exports.getType = async ({ db }) => {
  return await db.all("SELECT * FROM type");
};

// 获取有效的type
exports.getAliveType = async ({ db }) => {
  return await db.all("SELECT * FROM type WHERE typeState = 1");
};

// 获取type数量
exports.getTypeCount = async ({ db }) => {
  return await db.get("SELECT count(*) FROM type");
};

// 根据typeId获取type数据
exports.getTypeByTypeId = async ({ db, typeId }) => {
  return await db.get("SELECT * FROM type WHERE typeId = ?", typeId);
};

// 根据typeContent获取type数据
exports.getTypeByTypeContent = async ({ db, typeContent }) => {
  return await db.get("SELECT * FROM type WHERE typeContent = ?", typeContent);
};

// 获取tag数据
exports.getTag = async ({ db }) => {
  return await db.all("SELECT * FROM tag");
};

// 获取有效的tag
exports.getAliveTag = async ({ db }) => {
  return await db.all("SELECT * FROM tag WHERE tagState = 1");
};

// 获取tag数量
exports.getTagCount = async ({ db }) => {
  return await db.get("SELECT count(*) FROM tag");
};

// 根据tagId获取tag数据
exports.getTagByTagId = async ({ db, tagId }) => {
  return await db.get("SELECT * FROM tag WHERE tagId = ?", tagId);
};

// 根据tagContent获取tag数据
exports.getTagByTagContent = async ({ db, tagContent }) => {
  return await db.get("SELECT * FROM tag WHERE tagContent = ?", tagContent);
};

// 根据blogId获取详细的blog数据
exports.getBlogByBlogId = async ({ db, blogId }) => {
  const blog = await db.get("SELECT * FROM blogs LEFT JOIN users WHERE blogId = ? AND blogs.authorId = users.userId", blogId);
  const aliveType = await this.getAliveType({ db });
  const aliveTag = await this.getAliveTag({ db });
  return mergeTypeTagToBlog(blog, aliveType, aliveTag);
};

// 获取总的博客数
exports.getBlogCount = async ({ db }) => {
  return await db.get("SELECT COUNT(*) FROM blogs");
};

// 获取有效的博客数
exports.getAliveBlogCount = async ({ db }) => {
  return await db.get("SELECT COUNT(*) FROM blogs WHERE blogState != -1");
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
      const user = await this.getUserByUserId({ db, userId: toUserId });
      childMessage[key]["toUserName"] = user.username;
    }
  }
  return childMessage;
};
