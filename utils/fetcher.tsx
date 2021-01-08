// 请求自动参数处理逻辑
import axios from "axios";
import assign from "lodash/assign";
import { apiName } from "config/api";
import { getToken } from "./token";
import { getRelativeApiPath, transformStringUrl } from "./path";
import { AutoRequestType } from "./@type";

let autoRequest: AutoRequestType;

const getConfig = (data, token) => {
  if (token) {
    return {
      data,
      headers: { apiToken: getToken(token) },
    };
  } else {
    return { data };
  }
};

autoRequest = ({ method, path, query, data, token }) => {
  const nextRequestEx: AutoRequestType = (props) => {
    const newMethod = props.method ? props.method : method;
    const newPath = props.path ? props.path : path;
    const newQuery = assign(query, props.query);
    const newData = assign(data, props.data);
    const newToken = props.token ? props.token : token;
    return autoRequest({ method: newMethod, path: newPath, query: newQuery, data: newData, token: newToken });
  };
  nextRequestEx.run = (currentPath, currentQuery) => {
    const targetPath = currentPath ? currentPath : path;
    const targetQuery = assign(query, currentQuery);
    const relativePath = targetPath.startsWith("http") ? transformStringUrl(targetPath, targetQuery) : getRelativeApiPath(targetPath as apiName, targetQuery);
    const config = getConfig(data, token);
    const currentMethod = method || "get";
    return axios[currentMethod](relativePath, config).then((res) => res.data);
  };
  return nextRequestEx;
};

export { autoRequest };
