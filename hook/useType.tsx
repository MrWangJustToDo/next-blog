import { useCallback, useEffect } from "react";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { pageContentLength } from "config/type&tag";
import { setDataSucess_client } from "store/reducer/client/action";
import useCurrentState from "./useCurrentState";
import { UseTypeType } from "./@type";

let useType: UseTypeType;

let autoChangeType = (type, currentType, changeCurrentType) => {
  useEffect(() => {
    if (currentType === "") {
      if (type.length) changeCurrentType(type[0].typeContent);
    }
  }, [currentType, changeCurrentType, type]);
};

useType = (blogs) => {
  const { state, dispatch } = useCurrentState();
  // 所有type
  const type = state.server[apiName.type]["data"];
  // 获取当前的blog
  blogs = blogs || state.server[apiName.home]["data"];
  // 当前选中的type
  const currentType = state.client[actionName.currentType]["data"];
  // 当前页数
  const currentPage = state.client[actionName.currentTypePage]["data"];
  // 更改当前选中的type
  const changeCurrentType = useCallback((nextType) => dispatch(setDataSucess_client(actionName.currentType, nextType)), []);
  autoChangeType(type, currentType, changeCurrentType);
  // 根据当前选中的type获取blog
  const currentBlogs = blogs.filter(({ typeContent }) => typeContent === currentType);
  // 根据符合的blog获取所有的页数
  const allPage = Math.ceil(currentBlogs.length / pageContentLength);
  const increasePage = useCallback(() => dispatch(setDataSucess_client(actionName.currentTypePage, currentPage + 1)), [currentPage]);
  const decreasePage = useCallback(() => dispatch(setDataSucess_client(actionName.currentTypePage, currentPage - 1)), [currentPage]);
  const increaseAble = currentPage < allPage;
  const decreaseAble = currentPage > 1;
  const currentPageBlogs = currentBlogs.slice(currentPage - 1 * pageContentLength, currentPage * pageContentLength);
  return {
    type,
    currentType,
    changeCurrentType,
    allPage,
    currentPage,
    currentPageBlogs,
    increasePage,
    decreasePage,
    increaseAble,
    decreaseAble,
  };
};

export default useType;