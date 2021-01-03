// 请求自动参数处理逻辑
import axios from "axios";
import getToken from "./token";
import { transformStringUrl } from "./path";
import { AutoRequestType, AutoRequestExType } from "./@type";

let autoRequest: AutoRequestType;

let fetcherRequest: AutoRequestType;

let autoRequestEx: AutoRequestExType;

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
  const relativePath = path ? transformStringUrl(path, query) : "";
  const config = getConfig(data, token);
  return (path, token) => {
    if (!path) {
      path = relativePath;
    }
    if (token) {
      config["headers"] = { ...config["headers"], apiToken: getToken(token) };
    }
    const currentMethod = method || "get";
    return axios[currentMethod](path, config).then((res) => res.data);
  };
};

fetcherRequest = ({ method, token, data }) => autoRequest({ method, token, data });

autoRequestEx = ({ method, path, query, data, token }) => {
  let relativePath = path ? transformStringUrl(path, query) : "";
  let config = getConfig(data, token);
  let currentMethod = method || "get";
  return ({ method, path, query, data, token }) => {
    relativePath = path ? transformStringUrl(path, query) : relativePath;
    if (data) {
      config = { ...config, ...data };
    }
    if (token) {
      config["headers"] = { ...config["headers"], apiToken: getToken(token) };
    }
    currentMethod = method ? method : currentMethod;
    return axios[currentMethod](relativePath, config).then((res) => res.data);
  };
};

export { autoRequest, fetcherRequest, autoRequestEx };
