import { useCallback, useMemo, useState } from "react";
import throttle from "lodash/throttle";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { archiveLength } from "config/archive";
import { actionHandler } from "utils/action";
import { useCurrentState } from "./useBase";
import { useAutoActionHandler } from "./useAuto";
import { ArchiveProps, UseArchiveType, UseAutoLoadArchiveType } from "./@type";

let useArchive: UseArchiveType;
let useAutoLoadArchive: UseAutoLoadArchiveType;

let autoLoadArchive = (loadArchive, archiveData, needUpdate, setNeedUpdate) => {
  if (Object.keys(archiveData).length && needUpdate) {
    loadArchive((last) => {
      return { ...last, ...archiveData };
    });
    setNeedUpdate(false);
  }
};

useArchive = () => {
  const { state } = useCurrentState();
  const [page, setPage] = useState<number>(1);
  const [bool, setBool] = useState<boolean>(true);
  const [value, setValue] = useState<ArchiveProps | {}>({});
  // 获取所有的archive
  const archives = state.client[actionName.currentArchive]["data"];
  // 获取所有的长度
  const allCount = state.server[apiName.home]["data"].length;
  // 获取当前最少显示的archive数量
  const currentCount = page * archiveLength;
  const currentArchive: ArchiveProps | {} = {};
  let count = 0;
  for (let key in archives) {
    count += archives[key].length;
    currentArchive[key] = archives[key];
    if (count >= currentCount) {
      break;
    }
  }
  autoLoadArchive(setValue, currentArchive, bool, setBool);
  const loadMore = useCallback(() => (setPage((last) => last + 1), setBool(true)), []);
  const canLoad = useMemo(() => allCount > currentCount, [allCount, currentCount]);
  return { value, allCount, canLoad, loadMore };
};

useAutoLoadArchive = ({ canLoad, loadMore, breakPoint }) => {
  const loadMoreCallback = useCallback(
    throttle(() => {
      if (document.body.offsetHeight - document.scrollingElement.scrollTop < breakPoint) {
        loadMore();
      }
    }, 1000),
    []
  );
  useAutoActionHandler({
    action: loadMoreCallback,
    actionState: canLoad,
    rightNow: true,
    addListener: (action) => actionHandler<Window>(window, (ele) => ele.addEventListener("scroll", action)),
    removeListener: (action) => actionHandler<Window>(window, (ele) => ele.removeEventListener("scroll", action)),
  });
};

export { useArchive, useAutoLoadArchive };
