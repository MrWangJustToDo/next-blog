import { useShowAndHideAnimate } from "hook/useAnimate";
import { getClass } from "utils/class";
import { AnimateType } from "./@type";

import style from "./index.module.scss";

let Animate: AnimateType;

Animate = ({ children, show }) => {
  const { ref } = useShowAndHideAnimate<HTMLDivElement>({ state: show, key: "hover" });
  return (
    <div ref={ref} className={getClass("overflow-hidden", style.animatePanel)} style={{ display: "none" }}>
      {children}
      <div className={getClass("bg-white position-absolute", style.hoverTriangle)} />
      <div className={getClass("w-100", style.hoverHolder)} />
    </div>
  );
};

export default Animate;
