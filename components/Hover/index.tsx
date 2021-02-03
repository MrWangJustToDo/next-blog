import React from "react";
import { getClass } from "utils/class";
import { useBool } from "hook/useData";
import Animate from "./animate";
import { HoverType } from "./@type";

let Hover: HoverType;

Hover = React.memo(({ className = "", children, hoverItem }) => {
  const { bool, showState, hideDebounceNoState } = useBool({ stateChangeTimeStep: 1200 });
  return (
    <div onMouseEnter={showState} onMouseLeave={hideDebounceNoState} className={getClass("position-relative", className)}>
      {children}
      <Animate show={bool}>{hoverItem}</Animate>
    </div>
  );
});

export default Hover;
