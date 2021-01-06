import Toast from "components/Toast";
import Replay from "components/Replay";
import { useToastProps, ToastPushContext } from "hook/useToast";
import { useReplayProps, ReplayOpenContext } from "hook/useReplay";
import { flexCenter, getClass } from "utils/class";

import style from "./index.module.scss";

let ModuleManager = ({ children }) => {
  const { toast, push } = useToastProps([]);
  const { replay, open } = useReplayProps();
  return (
    <>
      <div className="position-fixed" style={{ right: "10px", top: "15px", zIndex: 100 }}>
        {toast.map((props) => (
          <Toast key={props.currentTime.getTime()} {...props} />
        ))}
      </div>
      <ToastPushContext.Provider value={push}>
        <ReplayOpenContext.Provider value={open}>{children}</ReplayOpenContext.Provider>
        <div className={getClass("position-fixed")} style={{ left: 0, top: 0, zIndex: 50, pointerEvents: "none" }}>
          <div
            className={getClass(
              "vw-100 vh-100 overflow-auto py-5",
              flexCenter,
              style.cover,
              replay && replay.showState ? style.cover_active : ""
            )}
            style={{ pointerEvents: replay && replay.showState ? "auto" : "none" }}
          >
            {replay && <Replay {...replay} />}
          </div>
        </div>
      </ToastPushContext.Provider>
    </>
  );
};

export default ModuleManager;
