const { getBlogById } = require("../../database");
const { actionHandler, fail, success, cacheHandler } = require("../../util");

const getBlog = cacheHandler(
  actionHandler(
    async ({ req, res }) => {
      if (req.query.blogId === undefined) {
        throw new Error("博客id为空");
      } else {
        const blogId = req.query.blogId;
        const data = await getBlogById({ db: global.db, blogId });
        return success(res, 200, ["获取成功", data]);
      }
    },
    ({ res, e }) => fail(res, 500, ["获取失败", e.toString()], "getBlog方法出现异常")
  )
);

exports.getBlog = getBlog;
