import { useEffect, useRef } from "react";
import { cancel, delay } from "utils/delay";
import { actionHandler } from "utils/element";
import { UseShowAndHideAnimateType } from "./@type";

let useShowAndHideAnimate: UseShowAndHideAnimateType;

function showAndHideAnimate<T extends HTMLElement>({ state, key, showClassName = "animate__fadeIn", hideClassName = "animate__fadeOut" }) {
  const ref = useRef<T>();
  useEffect(() => {
    // init
    actionHandler(ref.current, (element) => element.classList.add("animate__animated", "animate__faster"));
    if (!state) {
      delay(0, () => actionHandler(ref.current, (element) => element.classList.add(hideClassName)), key)
        .then(() => delay(450, () => actionHandler(ref.current, (element) => (element.style.display = "none")), key))
        .then(() => actionHandler(ref.current, (element) => element.classList.remove(hideClassName)));
    } else {
      delay(0, () => actionHandler(ref.current, (element) => (element.style.display = "block")), key)
        .then(() => actionHandler(ref.current, (element) => element.classList.add(showClassName)))
        .then(() => delay(450, () => actionHandler(ref.current, (element) => element.classList.remove(showClassName)), key));
    }
    return () => key && cancel(key);
  }, [state]);
  return { ref };
}

useShowAndHideAnimate = showAndHideAnimate;

export { useShowAndHideAnimate };
