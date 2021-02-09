// 回复按钮点击后的弹出框
import { createContext, useCallback, useContext, useState } from "react";
import { delay, cancel } from "utils/delay";
import { OverlayProps } from "components/Overlay/@type";
import { UseOverlayOpenType, UseOverlayPropsType } from "./@type";

const OverlayOpenContext = createContext<UseOverlayOpenType>(() => {});

let useOverlayProps: UseOverlayPropsType;
let useOverlayOpen: () => UseOverlayOpenType;

useOverlayProps = () => {
  const [overlay, setReplay] = useState<OverlayProps>();
  const update = useCallback(() => setReplay((lastState) => ({ ...lastState })), []);
  const clear = useCallback(() => setReplay(undefined), []);
  const open = useCallback(
    (props) => {
      cancel("replayModule");
      props.showState = true;
      props.closeHandler = () => {
        props.showState = false;
        update();
        delay(600, clear, "replayModule");
      };
      setReplay(props);
    },
    [update, clear]
  );
  return { overlay, open };
};

useOverlayOpen = () => {
  return useContext(OverlayOpenContext);
};

export { OverlayOpenContext, useOverlayProps, useOverlayOpen };
