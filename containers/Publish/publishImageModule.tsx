import { useCallback } from "react";
import Loading from "components/Loading";
import { useAutoLoadRandomImg } from "hook/useAuto";
import { useShowAndHideAnimate } from "hook/useAnimate";
import { apiName } from "config/api";
import { getClass } from "utils/class";
import { PublishImageModuleType } from "./@type";

import style from "./index.module.scss";
import { actionHandler } from "utils/action";

let PublishImageModule: PublishImageModuleType;

PublishImageModule = ({ closeHandler, appendHandler }) => {
  
  const [ref, bool] = useAutoLoadRandomImg(apiName.image);

  useShowAndHideAnimate<HTMLImageElement>({ state: bool, forWardRef: ref, key: "imgPreview" });

  const clickCallback = useCallback(() => {
    actionHandler<HTMLImageElement, void>(ref.current, (ele) => appendHandler(ele.src));
    closeHandler();
  }, []);

  return (
    <div className="container">
      <div className={getClass("position-relative", style.imgContainer)}>
        <Loading className={getClass("position-absolute", style.imgLoding)} _style={{ display: bool ? "none" : "block" }} />
        <img
          className={getClass("position-absolute border rounded", style.imgItem)}
          ref={ref}
          title="点击切换"
          alt="图片信息"
          width="400"
          style={{ display: "none" }}
        />
      </div>
      <div className="form-row my-3 flex-row-reverse">
        <button className="btn btn-secondary btn-sm mx-2" type="button" onClick={clickCallback}>
          确定
        </button>
      </div>
    </div>
  );
};

export default PublishImageModule;
