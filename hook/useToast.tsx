// Toast相关的hook
import { createContext, useCallback, useContext, useState } from "react";
import { delay } from "utils/delay";
import { toastState } from "config/toast";
import { ToastProps } from "components/Toast/@type";
import { UseToastPropsType, UseToastPushType, UseContentToastType } from "./@type";

const ToastPushContext = createContext<UseToastPushType>(() => {});

let useToastProps: UseToastPropsType;
let useCustomizeToast: UseToastPushType;
let useFailToast: UseContentToastType;
let useSucessToast: UseContentToastType;

useToastProps = (init = []) => {
  const [state, setState] = useState<ToastProps[]>(init);
  const filter = useCallback(() => setState((lastState) => lastState.filter(({ showState }) => showState === true)), []);
  const update = useCallback(() => setState((lastState) => [...lastState]), []);
  const push = useCallback<(props: ToastProps) => void>(
    (props) => {
      props.showState = true;
      props.currentTime = props.currentTime || new Date();
      props.closeHandler = () => {
        props.showState = false;
        update();
        delay(15000, filter, "toastFilter");
      };
      setState((lastState) => [props, ...lastState]);
    },
    [filter, update]
  );
  return { state, push };
};

useCustomizeToast = () => {
  const push = useContext(ToastPushContext);
  const customizeToast = useCallback<(props: ToastProps) => void>((props) => push(props), []);
  return customizeToast;
};

useFailToast = () => {
  const push = useContext(ToastPushContext);
  const failToast = useCallback((content) => push({ title: "message", content, contentState: toastState.fail }), []);
  return failToast;
};

useSucessToast = () => {
  const push = useContext(ToastPushContext);
  const failToast = useCallback((content) => push({ title: "message", content, contentState: toastState.success }), []);
  return failToast;
};

export { ToastPushContext, useToastProps, useCustomizeToast, useFailToast, useSucessToast };
