import { useCallback, useEffect } from "react";
import { actionName } from "config/action";
import { useRouter } from "next/dist/client/router";
import { useCurrentState } from "./useBase";
import { setDataSucess_client } from "store/reducer/client/action";
import { UseHeaderItemType } from "./@type";

let useHeaderItem: UseHeaderItemType;

let autoChangeHeader = (item, changeCurrentItem) => {
  useEffect(() => {
    changeCurrentItem(item);
  }, [item, changeCurrentItem]);
};

useHeaderItem = () => {
  const { route } = useRouter();
  const { state, dispatch } = useCurrentState();
  const currentHeader = state.client[actionName.currentHeader]["data"];
  const changeCurrentHeader = useCallback((headItem) => dispatch(setDataSucess_client(actionName.currentHeader, headItem)), []);
  autoChangeHeader(route, changeCurrentHeader);
  return { currentHeader, changeCurrentHeader };
};

export { useHeaderItem };
