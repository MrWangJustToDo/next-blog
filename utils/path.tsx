import { TransformStringUrl, TransformObjectUrl, GetApiPathType, GetRelativeApiPathType } from "./@type";

let transformObjectUrl: TransformObjectUrl;
let transformStringUrl: TransformStringUrl;
let getApiPath: GetApiPathType;
let getRelativeApiPath: GetRelativeApiPathType;

transformObjectUrl = ({ path, query }) => {
  if (!path) {
    throw new Error("path error, path is undefined");
  }
  if (path.startsWith("http")) {
    if (!path.includes("/api")) {
      console.log("外部链接访问：", path);
    }
    return path;
  }
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  if (path.startsWith("/api")) {
    let protocal = JSON.parse(process.env.NEXT_PUBLIC_HTTPS) ? "https://" : "http://";
    let url = process.env.NEXT_PUBLIC_APIHOST + path;
    let relativeUrl = protocal + url;
    if (query) {
      relativeUrl += "?";
      for (let key in query) {
        relativeUrl += `${key}=${query[key]}&`;
      }
      relativeUrl = relativeUrl.slice(0, -1);
    }
    return relativeUrl;
  } else {
    console.error("非法链接访问：", path);
    return path;
  }
};

transformStringUrl = (path, query) => transformObjectUrl({ path, query });

getApiPath = (apiName) => `/api/${apiName}`;

getRelativeApiPath = (apiName, query) => transformStringUrl(getApiPath(apiName), query);

export { transformStringUrl, transformObjectUrl, getApiPath, getRelativeApiPath };
