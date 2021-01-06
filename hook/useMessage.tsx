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
  UseSubmitToCheckModuleType,
  UseCheckcodeToSubmitType,
} from "./@type";

let useChildMessage: UseChildMessageType;
let usePrimaryMessage: UsePrimaryMessageType;
let useInput: UseInputType;
let useSubmitToCheckModule: UseSubmitToCheckModuleType;
let useCheckcodeToSubmit: UseCheckcodeToSubmitType;

useChildMessage = (props) => {
  const [more, setMore] = useState<boolean>(props.length > childMessageLength);
  const loadMore = useCallback(() => setMore(true), []);
  const messageProps = useMemo(() => {
    if (more) {
      return props.slice(0, childMessageLength);
    } else {
      return props;
    }
  }, [more, props, childMessageLength]);
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

function submitToCheckModule<T extends MyInputELement>({ request, body, className }) {
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

useSubmitToCheckModule = submitToCheckModule;

function checkcodeToSubmit<T extends MyInputELement>({ request, closeHandler }) {
  const ref = useRef<T>();
  const pushFail = useFailToast();
  const pushSucess = useSucessToast();
  const submit = useCallback(() => {
    actionHandler<T>(ref.current, (ele) => {
      if (ele.value.length) {
        request({ data: { checkCode: ele.value } })()
          .then(({ code, e }) => {
            if (code === 0) {
              pushSucess("提交成功").then(() => closeHandler());
            } else {
              pushFail(`提交失败: ${e}`);
            }
          })
          .catch((e) => pushFail(`提交失败: ${e}`));
      }
    });
  }, [request, closeHandler, pushFail, pushSucess]);
  return { ref, submit };
}

useCheckcodeToSubmit = checkcodeToSubmit;

function messageToReplay(body) {
  const open = useReplayOpen();
  const submit = useCallback((props) => {
    open({ head: "回复", body: body(props) });
  }, []);
  return submit;
}

let useMessageToReplay = messageToReplay;

export { useChildMessage, usePrimaryMessage, useInput, useSubmitToCheckModule, useCheckcodeToSubmit, useMessageToReplay };
