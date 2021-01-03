import { useShowAndHideAnimate } from "hook/useAnimate";
import { flexBetween, getClass } from "utils/class";
import { ReplayType } from "./@type";

let Replay: ReplayType;

Replay = ({ head, body, foot, closeHandler, showState, className = "" }) => {
  const { ref } = useShowAndHideAnimate<HTMLDivElement>({
    state: showState,
    key: "replay",
    showClassName: "animate__fadeInDown",
    hideClassName: "animate__fadeOutDown",
  });
  return (
    <div ref={ref} className={getClass("card m-auto user-select-none", className)} style={{ display: "none" }}>
      <div className={getClass("card-header", flexBetween)}>
        {head}
        <button className="close" style={{ outline: "none" }} onClick={closeHandler}>
          <i className="ri-close-line small ml-4" />
        </button>
      </div>
      <div className="card-body">{body(closeHandler)}</div>
      {foot && <div className="card-footer">{foot}</div>}
    </div>
  );
};

export default Replay;
