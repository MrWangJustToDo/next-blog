import { useCallback, useEffect, useRef, useState } from "react";
import tocbot from "tocbot";
import { toCanvas } from "qrcode";
import { actionHandler } from "utils/action";
import { addIdForHeads } from "utils/markdown";
import { useAutoActionHandler } from "./useAuto";
import "tocbot/dist/tocbot.css";

let useBlogMenu = (className) => {
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

let useAutoScrollTop = <T extends HTMLElement>() => {
  const ref = useRef<T>();
  const scrollTopCallback = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useAutoActionHandler({
    action: scrollTopCallback,
    addListener: (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("click", action)),
    removeListener: (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("click", action)),
  });
  return ref;
};

let useAutoScrollBottom = <T extends HTMLElement>() => {
  const ref = useRef<T>();
  const scrollTopCallback = useCallback(() => {
    window.scrollTo({
      top: document.body.offsetHeight - 1000,
      behavior: "smooth",
    });
  }, []);
  useAutoActionHandler({
    action: scrollTopCallback,
    addListener: (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("click", action)),
    removeListener: (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("click", action)),
  });
  return ref;
};

let useLinkToImg = <T extends HTMLElement>() => {
  const ref = useRef<T>();
  useEffect(() => {
    let a = document.createElement("a");
    a.href = "#";
    actionHandler<T>(ref.current, (ele) => toCanvas(ele, a.href));
  }, []);
  return ref;
};

export { useBlogMenu, useAutoScrollTop, useAutoScrollBottom, useLinkToImg };
