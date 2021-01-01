import React from "react";
import useHoverItem from "hook/useHoverItem";
import { getClass } from "utils/class";
import Animate from "./animate";
import { HoverType } from "./@type";

let Hover: HoverType;

Hover = React.memo(({ className = "", children, hoverItem }) => {
  const { showState, show, hide } = useHoverItem();
  return (
    <div onMouseEnter={show} onMouseLeave={hide} className={getClass("position-relative", className)}>
      {children}
      <Animate show={showState}>{hoverItem}</Animate>
    </div>
  );
});

export default Hover;
