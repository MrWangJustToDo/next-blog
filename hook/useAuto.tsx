import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { loadImg } from "utils/image";
import { actionHandler } from "utils/element";
import debounce from "lodash/debounce";
import {
  UseAutoActionHandlerType,
  UseAutoFlushHandlerProps,
  UseAutoFlushHandlerType,
  UseAutoSetHeaderHeightType,
  UseAutoLoadCheckcodeImgProps,
  UseAutoLoadCheckcodeImgType,
} from "./@type";

let useAutoActionHandler: UseAutoActionHandlerType;
let useAutoFlushHandler: UseAutoFlushHandlerType;
let useAutoSetHeaderHeight: UseAutoSetHeaderHeightType;
let useAutoLoadCheckcodeImg: UseAutoLoadCheckcodeImgType;

useAutoActionHandler = ({ action, timmer, actionState = true, once = true, delayTime, addListener, removeListener, rightNow = false }) => {
  const actionCallback = useCallback(() => {
    if (actionState) {
      action();
    }
  }, [actionState, action]);
  useEffect(() => {
    if (timmer) {
      if (delayTime === undefined) {
        console.error("timmer delayTime not set ---> useAutoActionHandler");
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
        if (rightNow) {
          actionCallback();
        }
        addListener(actionCallback);
        return () => removeListener(actionCallback);
      }
    }
  }, [delayTime, once, actionCallback, rightNow]);
};

function autoFlushHandler<T>({ delayTime, flushAction }: UseAutoFlushHandlerProps): T {
  const [state, setState] = useState<T>(flushAction<T>());
  const flushActionCallback = useCallback(() => setState(flushAction()), [flushAction]);
  useAutoActionHandler({ delayTime, action: flushActionCallback, timmer: true, once: false });
  return state;
}

function autoSetHeaderHeight<T extends HTMLElement>(breakPoint: number): { ref: RefObject<T>; height: number } {
  const ref = useRef<T>();
  const [height, setHeight] = useState<number>(0);
  const setHeightCallback = useCallback(
    () =>
      actionHandler<T>(ref.current, (ele) => {
        ele.style.height = "auto";
        setHeight(ele.offsetHeight);
        ele.style.height = "0px";
      }),
    []
  );
  useEffect(() => {
    if (document.body.offsetWidth < breakPoint) {
      setHeightCallback();
    } else {
      const debounceSetHeightByStyle = debounce((cb) => {
        if (document.body.offsetWidth < breakPoint) {
          setHeightCallback();
          if (cb && typeof cb === "function") {
            cb();
          }
        }
      }, 300);
      window.addEventListener(
        "resize",
        debounceSetHeightByStyle.bind(null, () => window.removeEventListener("resize", debounceSetHeightByStyle))
      );
      return () => window.removeEventListener("resize", debounceSetHeightByStyle);
    }
  }, [setHeightCallback]);
  return { ref, height };
}

function autoLoadCheckcode<T extends HTMLImageElement>({ imgUrl, strUrl }: UseAutoLoadCheckcodeImgProps): RefObject<T> {
  const ref = useRef<T>();
  const loadActionCallback = useCallback(
    debounce(
      () => actionHandler<T>(ref.current, (ele) => loadImg({ imgUrl, strUrl, imgElement: ele })),
      400,
      { leading: true } // 立即执行一次
    ),
    [imgUrl, strUrl]
  );
  useAutoActionHandler({
    action: loadActionCallback,
    rightNow: true,
    addListener: (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("click", action)),
    removeListener: (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("click", action)),
  });
  return ref;
}

useAutoFlushHandler = autoFlushHandler;

useAutoSetHeaderHeight = autoSetHeaderHeight;

useAutoLoadCheckcodeImg = autoLoadCheckcode;

export { useAutoActionHandler, useAutoFlushHandler, useAutoSetHeaderHeight, useAutoLoadCheckcodeImg };
