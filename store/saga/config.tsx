import { apiName } from "config/api";
import { getHomeData } from "./home";
import { getTypeData } from "./type";
import { getTagData } from "./tag";
import { getBlogData } from "./blog";

// action type 对应的 saga 函数
interface SagaConfig {
  [props: string]: any;
}

const sagaConfig: SagaConfig = {
  [apiName.home]: getHomeData,
  [apiName.type]: getTypeData,
  [apiName.tag]: getTagData,
  [apiName.blog]: getBlogData,
};

export default sagaConfig;
