import { useAutoActionHandler, useAutoFlushHandler } from "hook/useAuto";
import { useShowAndHideAnimate } from "hook/useAnimate";
import { flexBetween, flexCenter, getClass } from "utils/class";
import { momentTo } from "utils/time";
import { ToastType } from "./@type";

import style from "./index.module.scss";

let Toast: ToastType;

Toast = ({ title, currentTime, contentState, content, showState, closeHandler, autoCloseSecond }) => {
  useAutoActionHandler({ delayTime: autoCloseSecond, action: closeHandler, actionState: showState });
  const currentTimeString = useAutoFlushHandler<string>({ delayTime: 60 * 1000, flushAction: () => momentTo(currentTime) });
  const { ref } = useShowAndHideAnimate<HTMLDivElement>({
    state: showState,
    key: String(currentTime.getTime()),
    showClassName: "animate__fadeInRight",
    hideClassName: "animate__fadeOutRight",
  });
  return (
    <div ref={ref} className={getClass("toast", style.toast)} style={{ display: "none" }}>
      <div className={getClass("toast-header p-md-2", flexBetween)}>
        <div className={getClass("text-info", flexCenter)}>
          <i className="ri-chat-1-fill mr-1" />
          {title}
        </div>
        <div className={getClass(flexCenter)}>
          <small className="text-muted align-bottom">{currentTimeString}</small>
          <button className={getClass("ml-2 close", flexCenter, style.close)} onClick={close}>
            <i className="ri-close-line small" />
          </button>
        </div>
      </div>
      <div className={getClass("toast-body", contentState || "")}>{content}</div>
    </div>
  );
};

export default Toast;
