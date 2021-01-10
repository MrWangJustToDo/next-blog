import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { loadImg } from "utils/image";
import { actionHandler } from "utils/action";
import { useShowAndHideAnimate } from "./useAnimate";
import { UseAutoActionHandlerType, UseAutoSetHeaderHeightType, UseAutoLoadCheckcodeImgType, UseAutoShowAndHideType } from "./@type";

let useAutoActionHandler: UseAutoActionHandlerType;
let useAutoSetHeaderHeight: UseAutoSetHeaderHeightType;
let useAutoLoadCheckcodeImg: UseAutoLoadCheckcodeImgType;
let useAutoShowAndHide: UseAutoShowAndHideType;

useAutoActionHandler = ({ action, timmer, actionState = true, once = true, delayTime, rightNow = false, addListener, removeListener }) => {
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
  }, [delayTime, once, actionCallback, rightNow, addListener, removeListener]);
};

useAutoSetHeaderHeight = <T extends HTMLElement>(breakPoint) => {
  const ref = useRef<T>();
  const [bool, setBool] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);
  const setHeightCallback = useCallback(
    debounce(
      (cb) =>
        actionHandler<T>(ref.current, (ele) => {
          if (bool && document.body.offsetWidth < breakPoint) {
            setBool(false);
            ele.style.height = "auto";
            setHeight(ele.offsetHeight);
            ele.style.height = "0px";
            if (cb && typeof cb === "function") {
              cb();
            }
          }
        }),
      400,
      { leading: true }
    ),
    [breakPoint, bool]
  );
  setHeightCallback.bind(null, () => actionHandler<Window>(window, (ele) => ele.removeEventListener("resize", setHeightCallback)));
  useAutoActionHandler({
    action: setHeightCallback,
    rightNow: true,
    addListener: (action) => actionHandler<Window>(window, (ele) => ele.addEventListener("resize", action)),
    removeListener: (action) => actionHandler<Window>(window, (ele) => ele.removeEventListener("resize", action)),
  });
  return { ref, height };
};

useAutoLoadCheckcodeImg = <T extends HTMLImageElement>({ imgUrl, strUrl }) => {
  const ref = useRef<T>();
  const loadActionCallback = useCallback(
    debounce(
      () => actionHandler<T>(ref.current, (ele) => loadImg({ imgUrl, strUrl, imgElement: ele })),
      400,
      { leading: true } // 立即执行一次
    ),
    []
  );
  useAutoActionHandler({
    action: loadActionCallback,
    rightNow: true,
    addListener: (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("click", action)),
    removeListener: (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("click", action)),
  });
  return ref;
};

useAutoShowAndHide = <T extends HTMLElement>(breakPoint) => {
  const [value, setValue] = useState<boolean>(false);
  const autoSetValueHandler = useCallback(
    throttle(() => {
      if (document.documentElement.scrollTop < breakPoint) {
        setValue(false);
      } else {
        setValue(true);
      }
    }, 400),
    [breakPoint]
  );
  useAutoActionHandler({
    action: autoSetValueHandler,
    rightNow: true,
    addListener: (action) => actionHandler<Window>(window, (ele) => ele.addEventListener("scroll", action)),
    removeListener: (action) => actionHandler<Window>(window, (ele) => ele.removeEventListener("scroll", action)),
  });
  const { ref } = useShowAndHideAnimate<T>({ state: value, key: "blogUtil", showClassName: "animate__slideInRight", hideClassName: "animate__slideOutRight" });
  return ref;
};

export { useAutoActionHandler, useAutoSetHeaderHeight, useAutoLoadCheckcodeImg, useAutoShowAndHide };
