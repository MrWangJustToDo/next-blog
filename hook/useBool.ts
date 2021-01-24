import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { delay } from "utils/delay";
import { UseBoolType } from "./@type";

let useBool: UseBoolType;

useBool = (init = false) => {
  const [bool, setBool] = useState<boolean>(init);
  const [boolState, setBoolState] = useState<boolean>(true);
  const show = useCallback(() => setBool(true), []);
  const hide = useCallback(() => setBool(false), []);
  const switchBool = useCallback(() => setBool((last) => !last), []);
  const showThrottle = useCallback(
    throttle(() => setBool(true), 400, { leading: true }),
    []
  );
  const hideDebounce = useCallback(
    debounce(() => setBool(false), 400),
    []
  );
  const switchBoolThrottle = useCallback(
    throttle(() => setBool((last) => !last), 400, { leading: true }),
    []
  );
  const showThrottleState = useCallback(
    throttle(
      () => {
        if (boolState) {
          setBoolState(false);
          setBool(true);
          delay(800, () => setBoolState(true));
        }
      },
      400,
      { leading: true }
    ),
    [boolState]
  );
  const hideDebounceState = useCallback(
    debounce(() => {
      if (boolState) {
        setBoolState(false);
        setBool(false);
        delay(800, () => setBoolState(true));
      }
    }, 400),
    [boolState]
  );
  const switchBoolThrottleState = useCallback(
    throttle(
      () => {
        if (boolState) {
          setBoolState(false);
          setBool((last) => !last);
          delay(400, () => setBoolState(true));
        }
      },
      500,
      { leading: true }
    ),
    [boolState]
  );
  return { bool, show, hide, switchBool, showThrottle, hideDebounce, switchBoolThrottle, showThrottleState, hideDebounceState, switchBoolThrottleState };
};

export { useBool };
