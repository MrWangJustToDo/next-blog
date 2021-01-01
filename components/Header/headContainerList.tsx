import { useCallback } from "react";
import debounce from "lodash/debounce";
import HeadContent from "config/header";
import { getClass } from "utils/class";
import { useAutoSetHeaderHeight } from "hook/useAuto";
import HeadContainerItem from "./headContainerItem";
import { HeadContainerListType } from "./@type";

import style from "./index.module.scss";

let HeadContainerList: HeadContainerListType;

HeadContainerList = ({ show, hide }) => {
  const { ref, height } = useAutoSetHeaderHeight<HTMLUListElement>(992);
  const debounceHide = useCallback(debounce(hide, 1500), [hide]);
  return (
    <div className={getClass("navbar-collapse ml-lg-4")}>
      <ul className={getClass(style.transHeight, "navbar-nav mr-auto")} style={{ height: `${show ? height : 0}px` }} ref={ref}>
        {HeadContent.map(({ value, icon, hrefTo }) => (
          <HeadContainerItem value={value} key={value} icon={icon} hrefTo={hrefTo} handler={debounceHide} />
        ))}
      </ul>
    </div>
  );
};

export default HeadContainerList;
