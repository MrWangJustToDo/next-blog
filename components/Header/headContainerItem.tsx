import Link from "next/link";
import { useCallback } from "react";
import { useHeaderItem } from "hook/useHeader";
import { getClass } from "utils/class";
import { HeadContainerItemType } from "./@type";

import style from "./index.module.scss";

let HeadContainerItem: HeadContainerItemType;

HeadContainerItem = ({ value = "head", hrefTo = "/", icon = "ri-home-heart-fill", handler = () => {} }) => {
  const { currentHeader, changeCurrentHeader } = useHeaderItem(handler);
  const clickHandler = useCallback(() => {
    changeCurrentHeader(hrefTo);
  }, [hrefTo]);
  return (
    <li className={getClass(style.nav_hover, "nav-item px-lg-3", currentHeader === hrefTo ? style.nav_active : "")}>
      <Link href={hrefTo}>
        <a className={getClass("nav-link text-reset d-flex")} onClick={clickHandler}>
          <i className={getClass(style.icon, icon)} />
          {value}
        </a>
      </Link>
    </li>
  );
};

export default HeadContainerItem;