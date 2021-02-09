import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { loadImg } from "utils/image";
import { autoRequest } from "utils/fetcher";
import { actionHandler } from "utils/action";
import { useBool } from "./useData";
import { useFailToast } from "./useToast";
import { useShowAndHideAnimate } from "./useAnimate";
import { ApiRequestResult } from "utils/@type";
import {
  UseAutoActionHandlerProps,
  UseAutoActionHandlerType,
  UseAutoSetHeaderHeightType,
  UseAutoLoadCheckcodeImgProps,
  UseAutoLoadCheckcodeImgType,
  UseAutoShowAndHideType,
  UseAutoSetHeightProps,
  UseAutoSetHeightType,
  UseAutoLoadRandomImgType,
} from "./@type";

let useAutoActionHandler: UseAutoActionHandlerType;
let useAutoSetHeaderHeight: UseAutoSetHeaderHeightType;
let useAutoLoadCheckcodeImg: UseAutoLoadCheckcodeImgType;
let useAutoShowAndHide: UseAutoShowAndHideType;
let useAutoSetHeight: UseAutoSetHeightType;
let useAutoLoadRandomImg: UseAutoLoadRandomImgType;

useAutoActionHandler = <T>(
  { action, timmer, actionState = true, once = true, delayTime, rightNow = false, addListener, removeListener }: UseAutoActionHandlerProps<T>,
  ...deps: any[]
) => {
  useEffect(() => {
    if (timmer) {
      const actionCallback = () => {
        if (actionState) {
          action();
        }
      };
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
        if (actionState) {
          if (rightNow) {
            action();
          }
          addListener(action);
          return () => removeListener(action);
        }
      }
    }
  }, [delayTime, once, rightNow, addListener, removeListener, action, actionState, ...deps]);
};

useAutoSetHeaderHeight = <T extends HTMLElement>(breakPoint: number) => {
  const ref = useRef<T>();
  const [bool, setBool] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);
  const setHeightCallback = useCallback<() => void>(
    debounce(
      () =>
        actionHandler<T, void>(ref.current, (ele) => {
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
    (action) => actionHandler<Window, void>(window, (ele) => ele.addEventListener("resize", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window, void>(window, (ele) => ele.removeEventListener("resize", action)),
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

useAutoLoadCheckcodeImg = <T extends HTMLImageElement>({ imgUrl, strUrl }: UseAutoLoadCheckcodeImgProps) => {
  const ref = useRef<T>();
  const loadActionCallback = useCallback<() => void>(
    debounce(
      () => actionHandler<T, void>(ref.current, (ele) => loadImg({ imgUrl, strUrl, imgElement: ele })),
      400,
      { leading: true } // 立即执行一次
    ),
    []
  );
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T, void>(ref.current, (ele) => ele.addEventListener("click", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T, void>(ref.current, (ele) => ele.removeEventListener("click", action)),
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

useAutoShowAndHide = <T extends HTMLElement>(breakPoint: number) => {
  const [value, setValue] = useState<boolean>(false);
  const autoSetValueHandler = useCallback<() => void>(
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
    (action) => actionHandler<Window, void>(window, (ele) => ele.addEventListener("scroll", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window, void>(window, (ele) => ele.removeEventListener("scroll", action)),
    []
  );
  useAutoActionHandler({
    action: autoSetValueHandler,
    rightNow: true,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
  });
  const ref = useShowAndHideAnimate<T>({ state: value, key: "blogUtil", showClassName: "animate__slideInRight", hideClassName: "animate__slideOutRight" });
  return ref;
};

useAutoSetHeight = <T extends HTMLElement>({ forWardRef, maxHeight = 9999, deps = [] }: UseAutoSetHeightProps<T>) => {
  const ref = useRef<T>();
  const currentRef = forWardRef ? forWardRef : ref;
  const [height, setHeight] = useState<number>(0);
  const setHeightCallback = useCallback<() => void>(
    debounce(
      () =>
        actionHandler<T, void>(currentRef.current, (ele) => {
          const lastHeight = ele.offsetHeight;
          ele.style.height = "auto";
          const allHeight = ele.offsetHeight;
          const targetHeight = maxHeight > allHeight ? allHeight : maxHeight;
          ele.style.height = `${lastHeight}px`;
          setHeight(targetHeight);
        }),
      400,
      { leading: true }
    ),
    [maxHeight]
  );
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window, void>(window, (ele) => ele.addEventListener("resize", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<Window, void>(window, (ele) => ele.removeEventListener("resize", action)),
    []
  );
  useAutoActionHandler(
    {
      action: setHeightCallback,
      rightNow: true,
      addListener: addListenerCallback,
      removeListener: removeListenerCallback,
    },
    ...deps
  );
  return [currentRef, height];
};

useAutoLoadRandomImg = (apiName) => {
  const fail = useFailToast();
  const { bool, show, hide } = useBool();
  const ref = useRef<HTMLImageElement>();
  const loadSrc = useCallback<() => void>(
    debounce(
      () => {
        hide();
        autoRequest({ path: apiName, token: true })
          .run<ApiRequestResult<string>>()
          .then(({ data }) => {
            if (Array.isArray(data)) {
              throw new Error(`接口返回数据正确：${data.toString()}`);
            } else {
              return data;
            }
          })
          .then((url) => (actionHandler<HTMLImageElement, void>(ref.current, (ele) => (ele.src = "")), url))
          .then((url) => actionHandler<HTMLImageElement, void>(ref.current, (ele) => (ele.src = url)))
          .catch((e) => fail(`获取失败: ${e.toString()}`));
      },
      800,
      { leading: true }
    ),
    [apiName]
  );
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) =>
      actionHandler<HTMLImageElement, void>(ref.current, (ele) => {
        ele.addEventListener("load", show);
        ele.addEventListener("click", action);
      }),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) =>
      actionHandler<HTMLImageElement, void>(ref.current, (ele) => {
        ele.removeEventListener("load", show);
        ele.removeEventListener("click", action);
      }),
    []
  );
  useAutoActionHandler({
    action: loadSrc,
    rightNow: true,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
  });
  return [ref, bool];
};

export { useAutoActionHandler, useAutoSetHeaderHeight, useAutoLoadCheckcodeImg, useAutoShowAndHide, useAutoSetHeight, useAutoLoadRandomImg };
