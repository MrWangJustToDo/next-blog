// 添加博客信息
exports.insertBlog = async ({
  db,
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
  blogPriseState,
  blogCommentState,
  typeId,
  tagId,
}) => {
  return await db.run(
    "INSERT INTO blogs VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
    blogPriseState,
    blogCommentState,
    typeId,
    tagId
  );
};

// 添加首页信息
exports.insertHome = async ({
  db,
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
}) => {
  return await db.run(
    "INSERT INTO home VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
    tagId
  );
};

// 添加用户信息
exports.insertUser = async ({ db, ip, userId, userState, username, password, nickname, address, avatar, email, gender, qq }) => {
  return await db.run(
    "INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    ip,
    userId,
    userState,
    username,
    password,
    nickname,
    address,
    avatar,
    email,
    gender,
    qq
  );
};

// 添加type信息
exports.insertType = async ({ db, typeId, typeState, typeContent, typeCount }) => {
  return await db.run("INSERT INTO type VALUES(?,?,?,?)", typeId, typeState, typeContent, typeCount);
};

// 添加tag信息
exports.insertTag = async ({ db, tagId, tagState, tagContent, tagCount }) => {
  return await db.run("INSERT INTO tag VALUES(?,?,?,?)", tagId, tagState, tagContent, tagCount);
};

// 添加用户扩展信息
exports.insertUserEx = async ({ db, userId, collect, assent, publish, collectIds, assentIds }) => {
  return await db.run("INSERT INTO usersEx VALUES(?,?,?,?,?,?)", userId, collect, assent, publish, collectIds, assentIds);
};

// 添加主回复
exports.insertPrimaryComment = async ({ db, blogId, commentId, userId, ip, content, createDate, modifyState, modifyDate, childIds, childCount }) => {
  return await db.run(
    "INSERT INTO primaryComment VALUES(?,?,?,?,?,?,?,?,?,?)",
    blogId,
    commentId,
    userId,
    ip,
    content,
    createDate,
    modifyState,
    modifyDate,
    childIds,
    childCount
  );
};

// 添加子回复
exports.insertChildComment = async ({ db, primaryCommentId, commentId, fromIp, fromUserId, toIp, toUserId, content, createDate, modifyState, modifyDate }) => {
  return await db.run(
    "INSERT INTO childComment VALUES(?,?,?,?,?,?,?,?,?,?)",
    primaryCommentId,
    commentId,
    fromIp,
    fromUserId,
    toIp,
    toUserId,
    content,
    createDate,
    modifyState,
    modifyDate
  );
};
