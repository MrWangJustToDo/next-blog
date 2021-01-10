import React from "react";
import { getClass } from "utils/class";
import { useBool } from "hook/useBool";
import Animate from "./animate";
import { HoverType } from "./@type";

let Hover: HoverType;

Hover = React.memo(({ className = "", children, hoverItem }) => {
  const { bool, showThrottleState, hideDebounce } = useBool();
  return (
    <div onMouseEnter={showThrottleState} onMouseLeave={hideDebounce} className={getClass("position-relative", className)}>
      {children}
      <Animate show={bool}>{hoverItem}</Animate>
    </div>
  );
});

export default Hover;
