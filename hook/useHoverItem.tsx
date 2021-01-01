import { useCallback, useState } from "react";
import { delay } from "utils/delay";
import { UseHoverItemType } from "./@type";

let useHoverItem: UseHoverItemType;

useHoverItem = (init = false) => {
  const [showState, setShowState] = useState(init);
  const show = () => {
    if (!showState) {
      delay(300, () => setShowState(true), "userHover");
    }
  };
  const hide = useCallback(() => delay(300, () => setShowState(false), "userHover"), []);
  return { showState, show, hide };
};

export default useHoverItem;
