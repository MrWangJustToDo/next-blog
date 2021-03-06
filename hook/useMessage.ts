import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import { childMessageLength, primaryMessageLength } from "config/message";
import { actionHandler } from "utils/action";
import { useOverlayOpen } from "./useOverlay";
import { useAutoActionHandler } from "./useAuto";
import { useFailToast, useSucessToast } from "./useToast";
import { ApiRequestResult } from "utils/@type";
import {
  UseChildMessageType,
  UsePrimaryMessageType,
  MyInputELement,
  UseJudgeInputValueType,
  UsePutToCheckcodeModuleType,
  UseCheckcodeModuleToSubmitProps,
  UseCheckcodeModuleToSubmitType,
  UseMessageToReplayModuleProps,
  UseMessageToReplayModuleType,
  UseReplayModuleToSubmitProps,
  UseReplayModuleToSubmitType,
  UsePutToCheckcodeModuleProps,
} from "./@type";

let useChildMessage: UseChildMessageType;
let usePrimaryMessage: UsePrimaryMessageType;
let useJudgeInputValue: UseJudgeInputValueType;
let usePutToCheckcodeModule: UsePutToCheckcodeModuleType;
let useCheckcodeModuleToSubmit: UseCheckcodeModuleToSubmitType;
let useMessageToReplayModule: UseMessageToReplayModuleType;
let useReplayModuleToSubmit: UseReplayModuleToSubmitType;

useChildMessage = (props) => {
  const [more, setMore] = useState<boolean>(props.length > childMessageLength);
  const loadMore = useCallback(() => setMore(true), []);
  const messageProps = useMemo(() => (more ? props.slice(0, childMessageLength) : props), [more, props]);
  return { messageProps, more, loadMore };
};

usePrimaryMessage = (props) => {
  const allPage = Math.ceil(props.length / primaryMessageLength);
  const [currentPage, setCurrentPage] = useState(1);
  const increasePage = useCallback(() => setCurrentPage((lastPage) => lastPage + 1), []);
  const decreasePage = useCallback(() => setCurrentPage((lastPage) => lastPage - 1), []);
  const increaseAble = currentPage < allPage;
  const decreaseAble = currentPage > 1;
  const currentMessage = props.slice(currentPage - 1 * primaryMessageLength, currentPage * primaryMessageLength);
  return { currentPage, increasePage, decreasePage, increaseAble, decreaseAble, currentMessage };
};

useJudgeInputValue = <T extends MyInputELement>(ref: RefObject<T>) => {
  const [bool, setBool] = useState<boolean>(false);
  const judgeValue = useCallback<() => void>(
    () => actionHandler<T, void>(ref.current, (ele) => (!!ele.value.length ? setBool(true) : setBool(false))),
    []
  );
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T, void>(ref.current, (ele) => ele.addEventListener("input", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T, void>(ref.current, (ele) => ele.removeEventListener("input", action)),
    []
  );
  useAutoActionHandler({
    action: judgeValue,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
  });
  return bool;
};

usePutToCheckcodeModule = <T extends MyInputELement>({ request, body, className = "" }: UsePutToCheckcodeModuleProps) => {
  const ref = useRef<T>();
  const open = useOverlayOpen();
  const submit = useCallback(() => {
    actionHandler<T, void>(ref.current, (ele) => {
      if (!!ele.value.length) {
        open({
          head: "验证码",
          body: body(request({ data: { content: ele.value } })),
          className,
        });
      }
    });
  }, [open]);
  const canSubmit = useJudgeInputValue<T>(ref);
  return { ref, submit, canSubmit };
};

useCheckcodeModuleToSubmit = <T extends MyInputELement>({ request, closeHandler }: UseCheckcodeModuleToSubmitProps) => {
  const ref = useRef<T>();
  const pushFail = useFailToast();
  const pushSucess = useSucessToast();
  const submit = useCallback(() => {
    return actionHandler<T, Promise<void>>(ref.current, (ele) => {
      if (ele.value.length) {
        return request({ data: { checkcode: ele.value } })
          .run<ApiRequestResult<string>>()
          .then(({ code, data }) => {
            if (code === 0) {
              pushSucess("提交成功");
              closeHandler();
            } else {
              pushFail(`提交失败: ${data.toString()}`);
            }
          })
          .catch((e) => pushFail(`发生错误: ${e.toString()}`));
      } else {
        return pushFail(`输入框没有内容？`);
      }
    });
  }, [request, closeHandler, pushFail, pushSucess]);
  const canSubmit = useJudgeInputValue<T>(ref);
  return { ref, submit, canSubmit };
};

useMessageToReplayModule = <T extends {}>({ request, body, className }: UseMessageToReplayModuleProps<T>) => {
  const open = useOverlayOpen();
  const replay = useCallback<(props: T) => void>((props) => {
    open({ head: "回复", body: body(request)(props), className });
  }, []);
  return replay;
};

useReplayModuleToSubmit = <T extends MyInputELement, F extends MyInputELement>({ request, closeHandler }: UseReplayModuleToSubmitProps) => {
  const input1 = useRef<T>();
  const input2 = useRef<F>();
  const pushFail = useFailToast();
  const pushSucess = useSucessToast();
  const submit = useCallback(
    () =>
      request({ data: { content: input1.current.value, checkcode: input2.current.value } })
        .run<ApiRequestResult<string>>()
        .then(({ code, data }) => {
          if (code === 0) {
            pushSucess("提交成功");
            closeHandler();
          } else {
            pushFail(`提交失败: ${data.toString()}`);
          }
        })
        .catch((e) => pushFail(`发生错误: ${e.toString()}`)),
    [pushFail, pushSucess, request, closeHandler]
  );
  const canSubmit1 = useJudgeInputValue(input1);
  const canSubmit2 = useJudgeInputValue(input2);
  return { input1, input2, submit, canSubmit: canSubmit1 && canSubmit2 };
};

export { useChildMessage, usePrimaryMessage, usePutToCheckcodeModule, useCheckcodeModuleToSubmit, useMessageToReplayModule, useReplayModuleToSubmit };
