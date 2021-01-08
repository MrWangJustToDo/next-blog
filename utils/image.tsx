import { autoRequest } from "./fetcher";
import { getRelativeApiPath } from "./path";
import { autoTransformData } from "./data";
import { LoadImgType, ApiRequestResult } from "./@type";

const request = autoRequest({ method: "get" });

let loadImg: LoadImgType;

loadImg = ({ imgUrl, strUrl, imgElement }) => {
  return new Promise<HTMLImageElement>((resolve) => {
    imgElement.setAttribute("src", getRelativeApiPath(imgUrl, { time: String(Date.now()) }));
    imgElement.addEventListener("load", () => resolve(imgElement));
  }).then((imgEle) =>
    request
      .run<ApiRequestResult>(getRelativeApiPath(strUrl))
      .then(autoTransformData)
      .then((value) => imgEle.setAttribute("title", value))
  );
};

export { loadImg };
