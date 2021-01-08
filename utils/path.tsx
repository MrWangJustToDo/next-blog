import { TransformStringUrl, TransformObjectUrl, GetRelativeApiPathType } from "./@type";

let transformObjectUrl: TransformObjectUrl;
let transformStringUrl: TransformStringUrl;
let getRelativeApiPath: GetRelativeApiPathType;

transformObjectUrl = ({ path, query }) => {
  if (!path) {
    throw new Error("path error, path is undefined");
  }
  if (path.startsWith("http")) {
    if (!path.includes("/api")) {
      console.log("third part link：", path);
    }
    return path;
  }
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  if (path.startsWith("/api")) {
    const protocal = JSON.parse(process.env.NEXT_PUBLIC_HTTPS) ? "https://" : "http://";
    const url = process.env.NEXT_PUBLIC_APIHOST + path;
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
    console.error("error path request：", path);
    return path;
  }
};

transformStringUrl = (path, query) => transformObjectUrl({ path, query });

getRelativeApiPath = (apiName, query) => transformStringUrl(`/api/${apiName}`, query);

export { transformStringUrl, transformObjectUrl, getRelativeApiPath };
