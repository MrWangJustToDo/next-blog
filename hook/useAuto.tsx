import { useCallback, useEffect, useRef, useState } from "react";
import { actionHandler } from "utils/element";
import debounce from "lodash/debounce";
import { UseAutoActionHandlerType, UseAutoFlushHandlerType, UseAutoSetHeaderHeightType } from "./@type";

let useAutoActionHandler: UseAutoActionHandlerType;
let useAutoFlushHandler: UseAutoFlushHandlerType;
let useAutoSetHeaderHeight: UseAutoSetHeaderHeightType;

useAutoActionHandler = ({ action, timmer, actionState = true, once = true, delayTime, addListener, removeListener }) => {
  const actionCallback = useCallback(() => {
    if (actionState) {
      action();
    }
  }, [actionState, action]);
  useEffect(() => {
    if (timmer) {
      if (delayTime === undefined) {
        console.error("timmer delay not set ---> useAutoActionHandler");
        delayTime = 0;
      }
      if (once) {
        const id = setTimeout(actionCallback, delayTime);
        return () => clearTimeout(id);
      } else {
        const id = setInterval(actionCallback, delayTime);
        return () => clearInterval(id);
      }
    } else if (addListener) {
      if (!removeListener) {
        throw new Error("every addListener need a removeListener! ---> useAutoActionHandler");
      } else {
        addListener(actionCallback);
        return () => removeListener(actionCallback);
      }
    }
  }, [delayTime, once, actionCallback]);
};

function autoFlushHandler<T>({ delayTime, flushAction }) {
  const [state, setState] = useState<T>(flushAction());
  const flushActionCallback = useCallback(() => setState(flushAction()), [flushAction]);
  useAutoActionHandler({ delayTime, action: flushActionCallback, timmer: true, once: false });
  return state;
}

function autoSetHeaderHeight<T extends HTMLElement>(breakPoint) {
  const ref = useRef<T>();
  const [height, setHeight] = useState<number>(0);
  const setHeightBytyle = useCallback(
    () =>
      actionHandler(ref.current, (ele) => {
        ele.style.height = "auto";
        setHeight(ele.offsetHeight);
        ele.style.height = "0px";
      }),
    []
  );
  useEffect(() => {
    if (document.body.offsetWidth < breakPoint) {
      setHeightBytyle;
    } else {
      const debounceSetHeightByStyle = debounce((cb) => {
        if (document.body.offsetWidth < breakPoint) {
          setHeightBytyle();
          if (cb && typeof cb === "function") {
            cb();
          }
        }
      });
      window.addEventListener(
        "resize",
        debounceSetHeightByStyle.bind(null, () => window.removeEventListener("resize", debounceSetHeightByStyle))
      );
      return () => window.removeEventListener("resize", debounceSetHeightByStyle);
    }
  }, [setHeightBytyle]);
  return { ref, height };
}

useAutoFlushHandler = autoFlushHandler;

useAutoSetHeaderHeight = autoSetHeaderHeight;

export { useAutoActionHandler, useAutoFlushHandler, useAutoSetHeaderHeight };
