// 请求自动参数处理逻辑
import axios from "axios";
import assign from "lodash/assign";
import { apiName, cacheApi } from "config/api";
import { getToken } from "./token";
import { TreeNode } from "./node";
import { getRelativeApiPath, transformStringUrl } from "./path";
import { AutoRequestType } from "./@type";

let autoRequest: AutoRequestType;
const treeNode = new TreeNode<string>();
const weakMap = new WeakMap();

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
  nextRequest.run = (currentPath, currentQuery) => {
    const targetPath = currentPath ? currentPath : path;
    if (!targetPath) {
      throw new Error('request path should not undefined!!')
    }
    const targetQuery = assign(query, currentQuery);
    const relativePath = targetPath.startsWith("http") ? transformStringUrl(targetPath, targetQuery) : getRelativeApiPath(targetPath as apiName, targetQuery);
    if (process.browser) {
      if (cacheApi[currentPath]) {
        const target = treeNode.get(relativePath);
        if (target) {
          const resData = weakMap.get(target);
          if (resData) {
            return Promise.resolve(resData);
          }
        }
      }
      const currentMethod = method || "get";
      const newTarget = treeNode.add(relativePath);
      // 使用链表优化网络请求  尽量避免短时间内的大量重复请求
      return axios[currentMethod](relativePath, data, { headers: { apiToken: getToken(token) } })
        .then((res) => res.data)
        .then((resData) => (weakMap.set(newTarget, resData), resData));
    } else {
      const currentMethod = method || "get";
      return axios[currentMethod](relativePath, data, { headers: { apiToken: getToken(token) } }).then((res) => res.data);
    }
  };
  return nextRequest;
};

export { autoRequest };
