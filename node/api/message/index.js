// 评论相关
const { path } = require("../../path");
const { getPrimaryMessageByBlogId, getChildMessageByPrimaryId } = require("./message");

exports.messageHandler = {
  [path.primaryMessage]: getPrimaryMessageByBlogId,
  [path.childMessage]: getChildMessageByPrimaryId,
};
