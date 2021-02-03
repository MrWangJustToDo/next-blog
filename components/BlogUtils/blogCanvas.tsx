import { getClass } from "utils/class";
import { useBool } from "hook/useData";
import { useLinkToImg } from "hook/useBlog";
import { useShowAndHideAnimate } from "hook/useAnimate";
import { SimpleElement } from "containers/Main/@type";

import style from "./index.module.scss";

let BlogCanvas: SimpleElement;

BlogCanvas = () => {
  const canvasRef = useLinkToImg<HTMLCanvasElement>();
  const { bool, switchBoolState } = useBool();
  useShowAndHideAnimate<HTMLCanvasElement>({
    state: bool,
    ref: canvasRef,
    key: "blogMenu",
    showClassName: "animate__backInRight",
    hideClassName: "animate__backOutRight",
  });
  return (
    <>
      <button className="btn btn-secondary position-relative" onClick={switchBoolState}>
        <i className="ri-smartphone-line" />
      </button>
      <canvas ref={canvasRef} className={getClass("position-absolute border rounded", style.canvasContent)} style={{ display: "none" }} />
    </>
  );
};

export default BlogCanvas;
