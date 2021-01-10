import { getClass } from "utils/class";
import { useBool } from "hook/useBool";
import { useBlogMenu } from "hook/useBlog";
import { useShowAndHideAnimate } from "hook/useAnimate";

import style from "./index.module.scss";

let Index = () => {
  const seted = useBlogMenu(".blog-content");
  const { bool, switchBoolThrottle } = useBool(false);
  const { ref } = useShowAndHideAnimate<HTMLDivElement>({
    state: bool && seted,
    key: "blogMenu",
    showClassName: "animate__lightSpeedInRight",
    hideClassName: "animate__lightSpeedOutRight",
  });
  return (
    <>
      <button type="button" className="btn btn-info" onClick={switchBoolThrottle}>
        目录
      </button>
      <div ref={ref} className={getClass("position-absolute mb-2 py-1 border rounded", style.menuContent)} style={{ display: "none" }}>
        <ol className="js-toc toc p-0 m-0"></ol>
      </div>
    </>
  );
};

export default Index;
