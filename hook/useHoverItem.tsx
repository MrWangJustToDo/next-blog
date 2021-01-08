import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { UseHoverItemType } from "./@type";

let useHoverItem: UseHoverItemType;

useHoverItem = (init = false) => {
  const [showState, setShowState] = useState(init);
  const show = useCallback(
    throttle(() => setShowState(true), 800, { leading: true }),
    []
  );
  const hide = useCallback(
    debounce(() => setShowState(false), 300),
    []
  );
  return { showState, show, hide };
};

export default useHoverItem;
