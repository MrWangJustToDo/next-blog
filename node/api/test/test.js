const {
  insertBlog,
  insertUser,
  insertHome,
  insertUserEx,
  insertType,
  insertTag,
  insertPrimaryComment,
  insertChildComment,
} = require("../../database");
const { actionHandler, success } = require("../../util");

const test_publishBlog = actionHandler(async ({ res }) => {
  await insertBlog({
    db: global.db,
    authorId: "1",
    blogId: "1",
    blogState: 3,
    blogOriginState: 1,
    blogTitle: "Test Blog",
    blogImgLink: "https://h2.ioliu.cn/bing/FreshSalt_ZH-CN12818759319_1920x1080.jpg",
    blogCreateDate: new Date().toLocaleString(),
    blogModifyState: 0,
    blogModifyDate: new Date().toLocaleString(),
    blogPreview: "this is my first blog",
    blogContent: "this is my first blog content",
    blogAssentCount: 1,
    blogCollectCount: 1,
    blogReadCount: 1,
    blogPriseState: 1,
    blogCommentState: 1,
    typeId: 1,
    tagId: "1",
  });
  success(res, 200, ["创建成功"]);
});

const test_registerUser = actionHandler(async ({ res }) => {
  await insertUser({
    db: global.db,
    ip: "127.0.0.1",
    userId: "1",
    userState: 1,
    username: "mrwang",
    password: "099647",
    nickname: "王老师说过",
    address: "广州 深圳",
    avatar: "",
    email: "2711470541@qq.com",
    gender: 0,
    qq: "2711470541",
  });
  success(res, 200, ["创建成功"]);
});

const test_publishHome = actionHandler(async ({ res }) => {
  await insertHome({
    db: global.db,
    authorId: "1",
    blogId: "1",
    blogState: 3,
    blogTitle: "Test Blog",
    blogCreateDate: new Date().toLocaleString(),
    blogCreateYear: '2020',
    blogImgLink: "https://h2.ioliu.cn/bing/FreshSalt_ZH-CN12818759319_1920x1080.jpg",
    blogPreview: "blog content",
    blogAssentCount: 1,
    blogCollectCount: 1,
    blogReadCount: 1,
    typeId: 1,
    tagId: "1",
  });
  success(res, 200, ["创建成功"]);
});

const test_insertUserEx = actionHandler(async ({ res }) => {
  await insertUserEx({ db: global.db, userId: "1", collect: 0, assent: 0, publish: 1, collectIds: "", assentIds: "" });
  success(res, 200, ["创建成功"]);
});

const test_insertType = actionHandler(async ({ res }) => {
  await insertType({ db: global.db, typeId: 1, typeContent: "java", typeCount: 1 });
  success(res, 200);
});

const test_insertTag = actionHandler(async ({ res }) => {
  await insertTag({ db: global.db, tagId: 1, tagContent: "前端", tagCount: 1 });
  success(res, 200);
});

const test_primaryComment = actionHandler(async ({ res }) => {
  await insertPrimaryComment({
    db: global.db,
    blogId: "1",
    commentId: 1,
    userId: "1",
    ip: "127.0.0.1",
    content: "test content",
    createDate: new Date().toLocaleString(),
    modifyState: 0,
    modifyDate: new Date().toLocaleString(),
    childIds: "1",
    childCount: 1,
  });
  success(res, 200);
});

const test_childComment = actionHandler(async ({ res }) => {
  await insertChildComment({
    db: global.db,
    primaryCommentId: 1,
    commentId: 1,
    fromIp: "127.0.0.1",
    fromUserId: "1",
    toIp: "127.0.0.1",
    toUserId: "1",
    content: "test child",
    createDate: new Date().toLocaleString(),
    modifyState: 0,
    modifyDate: new Date().toLocaleString(),
  });
  success(res, 200);
});

exports.publishBlog = test_publishBlog;
exports.registerUser = test_registerUser;
exports.publishHome = test_publishHome;
exports.publishUserEx = test_insertUserEx;
exports.publishType = test_insertType;
exports.publishTag = test_insertTag;
exports.publishPrimaryComment = test_primaryComment;
exports.publishChildComment = test_childComment;
