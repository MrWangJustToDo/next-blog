import { useCallback, useEffect, useRef, useState } from "react";
import tocbot from "tocbot";
import { toCanvas } from "qrcode";
import { actionHandler } from "utils/action";
import { addIdForHeads } from "utils/markdown";
import { useAutoActionHandler } from "./useAuto";
import { UseBlogMenuType, UseAutoScrollType, UseLinkToImgType } from "./@type";
import "tocbot/dist/tocbot.css";
import { cancel, delay } from "utils/delay";

let useBlogMenu: UseBlogMenuType;
let useAutoScrollTop: UseAutoScrollType;
let useAutoScrollBottom: UseAutoScrollType;
let useLinkToImg: UseLinkToImgType;
let useEditor;

useBlogMenu = (className) => {
  const [bool, setBool] = useState<boolean>(false);
  useEffect(() => {
    const added = addIdForHeads(className);
    if (added) {
      setBool(true);
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: ".js-toc",
        // Where to grab the headings to build the table of contents.
        contentSelector: className,
        // Which headings to grab inside of the contentSelector element.
        headingSelector: "h1, h2, h3, h4",
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
      });
    }
    const re = tocbot.destroy.bind(tocbot);
    return () => tocbot && re && re();
  }, []);
  return bool;
};

useAutoScrollTop = <T extends HTMLElement>() => {
  const ref = useRef<T>();
  const scrollTopCallback = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("click", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("click", action)),
    []
  );
  useAutoActionHandler({
    action: scrollTopCallback,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
  });
  return ref;
};

useAutoScrollBottom = <T extends HTMLElement>() => {
  const ref = useRef<T>();
  const scrollTopCallback = useCallback(() => {
    window.scrollTo({
      top: document.body.offsetHeight - 1000,
      behavior: "smooth",
    });
  }, []);
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("click", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("click", action)),
    []
  );
  useAutoActionHandler({
    action: scrollTopCallback,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
  });
  return ref;
};

useLinkToImg = <T extends HTMLElement>() => {
  const ref = useRef<T>();
  useEffect(() => {
    let a = document.createElement("a");
    a.href = "#";
    actionHandler<T>(ref.current, (ele) => toCanvas(ele, a.href));
  }, []);
  return ref;
};

useEditor = (className) => {
  const keydonwHandler = useCallback<(e: KeyboardEvent) => void>((e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertText", false, " ".repeat(2));
    }
  }, []);
  const initCallback = useCallback(
    () =>
      delay(
        100,
        () =>
          actionHandler<HTMLTextAreaElement>(
            document.querySelector(className),
            (ele) => {
              ele.addEventListener("keydown", keydonwHandler);
            },
            initCallback
          ),
        "initEditor"
      ),
    [className]
  );
  const removeCallback = useCallback(
    () => actionHandler<HTMLTextAreaElement>(document.querySelector(className), (ele) => ele.removeEventListener("keydown", keydonwHandler)),
    [className]
  );
  useEffect(() => {
    initCallback();
    return () => {
      cancel("initEditor");
      removeCallback();
    };
  }, []);
};

export { useBlogMenu, useAutoScrollTop, useAutoScrollBottom, useLinkToImg, useEditor };
