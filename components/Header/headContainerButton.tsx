import { getClass } from "utils/class";
import { HeadContainerTagNavBtnType } from "./@type";

import style from "./index.module.scss";

let HeadContainerTagNavBtn: HeadContainerTagNavBtnType;

HeadContainerTagNavBtn = ({ handler }) => {
  return (
    <button className={getClass(style.btn, "navbar-toggler")} onClick={handler}>
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};

export default HeadContainerTagNavBtn;
