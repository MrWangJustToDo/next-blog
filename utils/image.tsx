import { autoRequest } from "./fetcher";
import { getRelativeApiPath } from "./path";
import { autoTransformData } from "./data";
import { LoadImgType } from "./@type";

const request = autoRequest({ method: "get" });

let loadImg: LoadImgType;

loadImg = (imgUrl, strUrl, imgElement) => {
  return new Promise<HTMLImageElement>((resolve) => {
    imgElement.setAttribute("src", getRelativeApiPath(imgUrl, { time: Date.now() }));
    imgElement.addEventListener("load", () => resolve(imgElement));
  }).then((imgEle) =>
    request(getRelativeApiPath(strUrl))
      .then(autoTransformData)
      .then((value) => imgEle.setAttribute("title", value))
  );
};

export default loadImg;
