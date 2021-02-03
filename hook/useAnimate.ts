import { useEffect, useRef } from "react";
import { cancel, delay } from "utils/delay";
import { actionHandler } from "utils/action";
import { UseShowAndHideAnimateProps, UseShowAndHideAnimateType } from "./@type";

let delayTime: number;
let useShowAndHideAnimate: UseShowAndHideAnimateType;

delayTime = 460;

useShowAndHideAnimate = <T extends HTMLElement>({ state, ref, key, showClassName = "animate__fadeIn", hideClassName = "animate__fadeOut" }: UseShowAndHideAnimateProps<T>) => {
  const current = useRef<T>();
  ref = ref || current;
  useEffect(() => {
    // init
    actionHandler<T, void>(ref.current, (ele) => ele.classList.add("animate__animated", "animate__faster"));
    if (!state) {
      // hide
      delay<void>(
        0,
        () => actionHandler<T, void>(ref.current, (ele) => ele.classList.add(hideClassName)),
        key
      )
        .then(() => delay<void>(delayTime, () => actionHandler<T, void>(ref.current, (ele) => (ele.style.display = "none")), key))
        .then(() => actionHandler<T, void>(ref.current, (ele) => ele.classList.remove(hideClassName)));
    } else {
      delay<void>(0, () => actionHandler<T, void>(ref.current, (ele) => (ele.style.display = "block")), key)
        .then(() => actionHandler<T, void>(ref.current, (ele) => ele.classList.add(showClassName)))
        .then(() => delay<void>(delayTime, () => actionHandler<T, void>(ref.current, (ele) => ele.classList.remove(showClassName)), key));
    }
    return () => key && cancel(key);
  }, [state]);
  return { ref };
};

export { useShowAndHideAnimate };
