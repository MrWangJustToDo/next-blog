import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { childMessageLength, primaryMessageLength } from "config/message";
import { actionHandler } from "utils/element";
import { useReplayOpen } from "./useReplay";
import { useFailToast, useSucessToast } from "./useToast";
import {
  UseChildMessageType,
  UsePrimaryMessageType,
  UseInputType,
  MyInputELement,
  UsePutToCheckcodeModuleProps,
  UsePutToCheckcodeModuleType,
  UseCheckcodeModuleToSubmitProps,
  UseCheckcodeModuleToSubmitType,
  UseMessageToReplayModuleProps,
  UseMessageToReplayModuleType,
  UseReplayModuleToSubmitProps,
  UseReplayModuleToSubmitType,
} from "./@type";
import { ApiRequestResult } from "utils/@type";

let useChildMessage: UseChildMessageType;
let usePrimaryMessage: UsePrimaryMessageType;
let useInput: UseInputType;
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

function input<T extends MyInputELement>(init = ""): [string, (e: ChangeEvent<T>) => void] {
  const [value, setValue] = useState<string>(init);
  const typeCallback = useCallback<(e: ChangeEvent<T>) => void>((e) => setValue(e.target.value), []);
  return [value, typeCallback];
}

useInput = input;

function putToCheckcodeModule<T extends MyInputELement>({ request, body, className = "" }: UsePutToCheckcodeModuleProps) {
  const ref = useRef<T>();
  const open = useReplayOpen();
  const submit = useCallback(() => {
    actionHandler<T>(ref.current, (ele) => {
      if (!!ele.value.length) {
        open({
          head: "验证码",
          body: body(request({ data: { content: ele.value } })),
          className,
        });
      }
    });
  }, [open]);
  return { ref, submit };
}

usePutToCheckcodeModule = putToCheckcodeModule;

function checkcodeModuleToSubmit<T extends MyInputELement>({ request, closeHandler }: UseCheckcodeModuleToSubmitProps) {
  const ref = useRef<T>();
  const pushFail = useFailToast();
  const pushSucess = useSucessToast();
  const submit = useCallback(() => {
    actionHandler<T>(ref.current, (ele) => {
      if (ele.value.length) {
        request({ data: { checkCode: ele.value } })
          .run<ApiRequestResult>()
          .then(({ code, data }) => {
            if (code === 0) {
              pushSucess("提交成功");
              closeHandler();
            } else {
              pushFail(`提交失败: ${data.toString()}`);
            }
          })
          .catch((e) => pushFail(`发生错误: ${e}`));
      }
    });
  }, [request, closeHandler, pushFail, pushSucess]);
  return { ref, submit };
}

useCheckcodeModuleToSubmit = checkcodeModuleToSubmit;

function messageToReplayModule<T>({ request, body, className }: UseMessageToReplayModuleProps<T>) {
  const open = useReplayOpen();
  const replay = useCallback<(props: T) => void>((props) => {
    open({ head: "回复", body: body(request)(props), className });
  }, []);
  return replay;
}

useMessageToReplayModule = messageToReplayModule;

function replayModuleToSubmit({ request, closeHandler, checkCode, content }: UseReplayModuleToSubmitProps) {
  const pushFail = useFailToast();
  const pushSucess = useSucessToast();
  const submit = useCallback(() => {
    request({ data: { checkCode, content } })
      .run<ApiRequestResult>()
      .then(({ code, data }) => {
        if (code === 0) {
          pushSucess("提交成功");
          closeHandler();
        } else {
          pushFail(`提交失败: ${data.toString()}`);
        }
      })
      .catch((e) => pushFail(`发生错误: ${e}`));
  }, [checkCode, content, pushFail, pushSucess, request]);
  return submit;
}

useReplayModuleToSubmit = replayModuleToSubmit;

export { useChildMessage, usePrimaryMessage, useInput, usePutToCheckcodeModule, useCheckcodeModuleToSubmit, useMessageToReplayModule, useReplayModuleToSubmit };
