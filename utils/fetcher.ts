// 请求自动参数处理逻辑
import { AxiosResponse } from "axios";
import assign from "lodash/assign";
import { apiName, cacheApi } from "config/api";
import { getToken } from "./token";
import { TreeNode } from "./node";
import { instance } from "./request";
import { getRelativeApiPath, transformStringUrl } from "./path";
import { AutoRequestType, NeedCacheType, QueryProps } from "./@type";

let autoRequest: AutoRequestType;

let needCache: NeedCacheType;

const treeNode = new TreeNode<string, any>();

needCache = (path) => path.startsWith("http") || cacheApi[path];

autoRequest = (props = {}) => {
  const { method, path, query, data, token } = props;
  const nextRequest: AutoRequestType = (props) => {
    const newMethod = props.method ? props.method : method;
    const newPath = props.path ? props.path : path;
    const newQuery = assign(query, props.query);
    const newData = assign(data, props.data);
    const newToken = props.token ? props.token : token;
    return autoRequest({ method: newMethod, path: newPath, query: newQuery, data: newData, token: newToken });
  };
  nextRequest.run = <T>(currentPath: string, currentQuery: QueryProps) => {
    const targetPath = currentPath ? currentPath : path;
    if (!targetPath) {
      throw new Error("request path should not undefined!!");
    }
    const targetQuery = assign(query, currentQuery);
    const relativePath = targetPath.startsWith("http") ? transformStringUrl(targetPath, targetQuery) : getRelativeApiPath(targetPath as apiName, targetQuery);
    if (process.browser) {
      if (needCache(targetPath)) {
        const target = treeNode.get(relativePath);
        if (target) {
          return Promise.resolve(<T>target.value);
        }
      }
      const currentMethod = method || "get";
      const currentToken = getToken(token);
      let requestPromise: Promise<AxiosResponse<T>>;
      requestPromise = instance({ method: currentMethod, headers: { apiToken: currentToken }, url: relativePath, data });
      return requestPromise.then((res) => res.data).then((resData) => (needCache(relativePath) && treeNode.add(relativePath, resData), resData));
    } else {
      const currentMethod = method || "get";
      const currentToken = getToken(token);
      let requestPromise: Promise<AxiosResponse<T>>;
      requestPromise = instance({ method: currentMethod, headers: { apiToken: currentToken }, url: relativePath, data });
      return requestPromise.then((res) => res.data);
    }
  };
  return nextRequest;
};

export { autoRequest };
