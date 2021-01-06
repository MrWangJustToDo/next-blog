// 回复按钮点击后的弹出框
import { createContext, useCallback, useContext, useState } from "react";
import { delay } from "utils/delay";
import { ReplayProps } from "components/Replay/@type";
import { UseReplayOpenType, UseReplayPropsType } from "./@type";

const ReplayOpenContext = createContext<UseReplayOpenType>(() => {});

let useReplayProps: UseReplayPropsType;
let useReplayOpen: () => UseReplayOpenType;

useReplayProps = () => {
  const [replay, setReplay] = useState<ReplayProps>();
  const update = useCallback(
    () =>
      setReplay((lastState) => {
        return { ...lastState };
      }),
    []
  );
  const clear = useCallback(() => setReplay(undefined), []);
  const open = useCallback(
    (props) => {
      delay(0, () => {}, "replayModule");
      props.showState = true;
      props.closeHandler = () => {
        props.showState = false;
        update();
        delay(1000, clear, "replayModule");
      };
      setReplay(props);
    },
    [update, clear]
  );
  return { replay, open };
};

useReplayOpen = () => {
  return useContext(ReplayOpenContext);
};

export { ReplayOpenContext, useReplayProps, useReplayOpen };
