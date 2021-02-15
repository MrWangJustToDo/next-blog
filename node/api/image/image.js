const { getRandom, fail, success, actionTransform, actionCatch } = require("../../util");

// 获取图片请求链接
const getImagePath = (props = {}) => {
  const idx = getRandom(0, props.index || 7);
  const n = getRandom(1, props.length || 7);
  let requestUrl = String(process.env.BINGAPI);
  requestUrl = requestUrl.replace("--n--", n);
  requestUrl = requestUrl.replace("--idx--", idx);
  return requestUrl;
};

// 获取所有随机图片信息
const getImagesAction = actionTransform(
  actionCatch(
    async ({ req, res }) => {
      const requestUrl = getImagePath(req.body);
      let { images } = await fetch(requestUrl).then((res) => res.json());
      images = images.map((item) => {
        return { ...item, relativeUrl: `${process.env.BINGURL}${item.url}` };
      });
      success(res, 200, ["获取成功", images]);
    },
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getImagesAction")
  )
);

// 获取随机图片信息
const getRandomImageAction = actionTransform(
  actionCatch(
    async ({ req, res }) => {
      const requestUrl = getImagePath(req.body);
      const { images } = await fetch(requestUrl).then((res) => res.json());
      const [{ relativeUrl }] = images.map((item) => ({ relativeUrl: `${process.env.BINGURL}${item.url}` }));
      success(res, 200, ["获取成功", relativeUrl]);
    },
    ({ res, e }) => fail(res, 404, ["获取失败", e.toString()], "getRandomImageAction")
  )
);

exports.getImagesAction = getImagesAction;

exports.getRandomImageAction = getRandomImageAction;
