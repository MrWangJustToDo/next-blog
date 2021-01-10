import { getClass } from "utils/class";
import { useBool } from "hook/useBool";
import { useLinkToImg } from "hook/useBlog";
import { useShowAndHideAnimate } from "hook/useAnimate";

import style from "./index.module.scss";

let Index = () => {
  const canvasRef = useLinkToImg<HTMLCanvasElement>();
  const { bool, switchBoolThrottleState } = useBool(false);
  useShowAndHideAnimate<HTMLCanvasElement>({
    state: bool,
    ref: canvasRef,
    key: "blogMenu",
    showClassName: "animate__backInRight",
    hideClassName: "animate__backOutRight",
  });
  return (
    <>
      <button className="btn btn-secondary position-relative" onClick={switchBoolThrottleState}>
        <i className="ri-smartphone-line" />
      </button>
      <canvas ref={canvasRef} className={getClass("position-absolute border rounded", style.canvasContent)} style={{ display: "none" }} />
    </>
  );
};

export default Index;
