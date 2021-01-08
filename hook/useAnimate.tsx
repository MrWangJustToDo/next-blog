import { RefObject, useEffect, useRef } from "react";
import { cancel, delay } from "utils/delay";
import { actionHandler } from "utils/element";
import { UseShowAndHideAnimateProps, UseShowAndHideAnimateType } from "./@type";

let delayTime: number;
let useShowAndHideAnimate: UseShowAndHideAnimateType;

delayTime = 450;

function showAndHideAnimate<T extends HTMLElement>({
  state,
  key,
  showClassName = "animate__fadeIn",
  hideClassName = "animate__fadeOut",
}: UseShowAndHideAnimateProps): { ref: RefObject<T> } {
  const ref = useRef<T>();
  useEffect(() => {
    // init
    actionHandler<T>(ref.current, (ele) => ele.classList.add("animate__animated", "animate__faster"));
    if (!state) {
      delay(0, () => actionHandler(ref.current, (ele) => ele.classList.add(hideClassName)), key)
        .then(() => delay(delayTime, () => actionHandler(ref.current, (ele) => (ele.style.display = "none")), key))
        .then(() => actionHandler(ref.current, (ele) => ele.classList.remove(hideClassName)));
    } else {
      delay(0, () => actionHandler(ref.current, (ele) => (ele.style.display = "block")), key)
        .then(() => actionHandler(ref.current, (ele) => ele.classList.add(showClassName)))
        .then(() => delay(delayTime, () => actionHandler(ref.current, (ele) => ele.classList.remove(showClassName)), key));
    }
    return () => key && cancel(key);
  }, [state]);
  return { ref };
}

useShowAndHideAnimate = showAndHideAnimate;

export { useShowAndHideAnimate };
