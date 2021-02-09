import Toast from "components/Toast";
import Replay from "components/Overlay";
import { useToastProps, ToastPushContext } from "hook/useToast";
import { useOverlayProps, OverlayOpenContext } from "hook/useOverlay";
import { flexCenter, getClass } from "utils/class";

import style from "./index.module.scss";

let ModuleManager = ({ children }) => {
  const { toast, push } = useToastProps([]);
  const { overlay, open } = useOverlayProps();
  return (
    <>
      <div className="position-fixed" style={{ right: "10px", top: "15px", zIndex: 999 }}>
        {toast.map((props) => (
          <Toast key={props.currentTime.getTime()} {...props} />
        ))}
      </div>
      <ToastPushContext.Provider value={push}>
        <OverlayOpenContext.Provider value={open}>{children}</OverlayOpenContext.Provider>
        <div className={getClass("position-fixed")} style={{ left: 0, top: 0, zIndex: 200, pointerEvents: "none" }}>
          <div
            className={getClass("vw-100 vh-100 overflow-auto py-5", flexCenter, style.cover, overlay && overlay.showState ? style.cover_active : "")}
            style={{ pointerEvents: overlay && overlay.showState ? "auto" : "none" }}
          >
            {overlay && <Replay {...overlay} />}
          </div>
        </div>
      </ToastPushContext.Provider>
    </>
  );
};

export default ModuleManager;
