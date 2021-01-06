// 请求自动参数处理逻辑
import axios from "axios";
import getToken from "./token";
import assign from "lodash/assign";
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
  return (props) => {
    if (props) {
      const newMethod = props.method ? props.method : method;
      const newPath = props.path ? props.path : path;
      const newQuery = assign(props.query, query);
      const newData = assign(data, props.data);
      const newToken = props.token ? props.token : token;
      return autoRequestEx({ method: newMethod, path: newPath, query: newQuery, data: newData, token: newToken });
    } else {
      const relativePath = transformStringUrl(path, query);
      const config = getConfig(data, token);
      const currentMethod = method || "get";
      return axios[currentMethod](relativePath, config).then((res) => res.data);
    }
  };
};

export { autoRequest, fetcherRequest, autoRequestEx };
