import { useCallback, useEffect, useState } from "react";
import { actionName } from "config/action";
import { useRouter } from "next/dist/client/router";
import { setDataSucess_client } from "store/reducer/client/action";
import useCurrentState from "./useCurrentState";
import { UseHeaderItemType } from "./@type";

let useHeaderItem: UseHeaderItemType;

let autoChangeHeader = (item, changeCurrentItem) => {
  useEffect(() => {
    changeCurrentItem(item);
  }, [item, changeCurrentItem]);
};

useHeaderItem = (appendHandler = () => {}) => {
  const { route } = useRouter();
  const { state, dispatch } = useCurrentState();
  const currentHeader = state.client[actionName.currentHeader]["data"];
  const changeCurrentHeader = useCallback(
    (headItem) => {
      dispatch(setDataSucess_client(actionName.currentHeader, headItem));
      appendHandler();
    },
    [appendHandler]
  );
  autoChangeHeader(route, changeCurrentHeader);
  return { currentHeader, changeCurrentHeader };
};

export { useHeaderItem };
