import { autoRequest } from "./fetcher";
import { getRelativeApiPath } from "./path";
import { autoTransformData } from "./data";
import { LoadImgType, ApiRequestResult } from "./@type";

const request = autoRequest();

let loadImg: LoadImgType;

loadImg = ({ imgUrl, strUrl, imgElement }) => {
  return new Promise<HTMLImageElement>((resolve) => {
    imgElement.setAttribute("src", getRelativeApiPath(imgUrl, { time: String(Date.now()) }));
    imgElement.addEventListener("load", () => resolve(imgElement));
  }).then((imgEle) =>
    request
      .run<ApiRequestResult<string>>(getRelativeApiPath(strUrl, { time: String(Date.now()) }))
      .then((data) => autoTransformData<string, {}>(data))
      .then((value) => imgEle.setAttribute("title", <string>value))
  );
};

export { loadImg };
