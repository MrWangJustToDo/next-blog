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
        if (rightNow && actionState) {
          action();
        }
        if (actionState) {
          addListener(action);
          return () => removeListener(action);
        }
      }
    }
  }, [delayTime, once, actionCallback, rightNow, addListener, removeListener, action]);
};

useAutoSetHeaderHeight = <T extends HTMLElement>(breakPoint) => {
  const ref = useRef<T>();
  const [bool, setBool] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);
  const setHeightCallback = useCallback(
    debounce(
      () =>
        actionHandler<T>(ref.current, (ele) => {
          if (document.body.offsetWidth < breakPoint) {
            setBool(false);
            ele.style.height = "auto";
            setHeight(ele.offsetHeight);
            ele.style.height = "0px";
          }
        }),
      300,
      { leading: true }
    ),
    [breakPoint]
  );
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window>(window, (ele) => ele.addEventListener("resize", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window>(window, (ele) => ele.removeEventListener("resize", action)),
    []
  );
  useAutoActionHandler({
    action: setHeightCallback,
    actionState: bool,
    rightNow: true,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
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
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("click", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("click", action)),
    []
  );
  useAutoActionHandler({
    action: loadActionCallback,
    rightNow: true,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
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
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window>(window, (ele) => ele.addEventListener("scroll", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window>(window, (ele) => ele.removeEventListener("scroll", action)),
    []
  );
  useAutoActionHandler({
    action: autoSetValueHandler,
    rightNow: true,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
  });
  const { ref } = useShowAndHideAnimate<T>({ state: value, key: "blogUtil", showClassName: "animate__slideInRight", hideClassName: "animate__slideOutRight" });
  return ref;
};

export { useAutoActionHandler, useAutoSetHeaderHeight, useAutoLoadCheckcodeImg, useAutoShowAndHide };
