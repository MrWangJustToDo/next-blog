// 评论相关
const { path } = require("../../path");
const { getPrimaryMessageByBlogIdAction, getChildMessageByPrimaryIdAction } = require("./message");

exports.messageHandler = {
  [path.primaryMessage]: getPrimaryMessageByBlogIdAction,
  [path.childMessage]: getChildMessageByPrimaryIdAction,
};
