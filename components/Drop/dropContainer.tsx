import { useAutoSetHeight } from "hook/useAuto";
import { getClass } from "utils/class";
import { DropContainerType } from "./@type";

import style from "./index.module.scss";

let DropContainer: DropContainerType;

DropContainer = ({ bool, children, length }) => {
  const [ref, height] = useAutoSetHeight<HTMLDivElement>(length);
  return (
    <div
      ref={ref}
      className={getClass("position-absolute w-100 overflow-hidden rounded-bottom", style.dropContainer)}
      style={{ height: bool ? `${height}px` : "0px" }}
    >
      {children}
    </div>
  );
};

export default DropContainer;
