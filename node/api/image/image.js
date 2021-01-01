const { getRandom, fail, success, actionHandler } = require("../../util");

// 获取随机图片
const getImages = actionHandler(
  async ({ req, res }) => {
    req.body = req.body || {};
    const idx = getRandom(0, req.body.index || 7);
    const n = getRandom(1, req.body.length || 7);
    let requestUrl = process.env.BINGAPI;
    requestUrl = requestUrl.replace("${n}", n);
    requestUrl = requestUrl.replace("${idx}", idx);
    let { images } = await fetch(requestUrl).then((res) => res.json());
    images = images.map((item) => {
      return { ...item, relativeUrl: `${process.env.BINGURL}${item.url}` };
    });
    success(res, 200, ["获取成功", images]);
  },
  ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getImages方法出现错误")
);

exports.getImages = getImages;
