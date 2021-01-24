import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import debounce from "lodash/debounce";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { delay } from "utils/delay";
import { formSerialize } from "utils/data";
import { autoRequest } from "utils/fetcher";
import { actionHandler, judgeAction } from "utils/action";
import { setDataSucess_client } from "store/reducer/client/action";
import { useCurrentState } from "./useBase";
import { useAutoActionHandler } from "./useAuto";
import { useFailToast, useSucessToast } from "./useToast";
import { ApiRequestResult } from "utils/@type";
import { UserProps, UseAutoLoginType, UseCurrentUserType, UseLoginInputProps, UseLoginInputType, UseLoginType, UseLogoutType } from "./@type";

let useAutoLogin: UseAutoLoginType;

let useCurrentUser: UseCurrentUserType;

let useLoginInput: UseLoginInputType;

let useLogin: UseLoginType;

let useLogout: UseLogoutType;

// 未登录时尝试自动登录
useAutoLogin = () => {
  const { state, dispatch } = useCurrentState();
  const user = state.client[actionName.currentUser]["data"] as UserProps;
  useEffect(() => {
    if (!user.userId) {
      autoRequest({ token: true })
        .run<ApiRequestResult<UserProps>>(apiName.autoLogin)
        .then(({ code, data }) => {
          if (code === 0 && !Array.isArray(data) && data.userId) {
            dispatch(setDataSucess_client(actionName.currentUser, data));
          }
        });
    }
  }, [user]);
};

// 获取当前登录对象
useCurrentUser = () => {
  const { state } = useCurrentState();
  return state.client[actionName.currentUser]["data"];
};

// 输入验证
useLoginInput = <T extends HTMLInputElement>({ option, successClassname, failClassname }: UseLoginInputProps) => {
  const ref = useRef<T>();
  const [bool, setBool] = useState<boolean>(false);
  const actionCallback = useCallback(
    debounce(
      () =>
        judgeAction({
          element: ref.current,
          judge: option.regexp.test(ref.current.value),
          successClassname,
          failClassname,
          successMessage: option.success,
          failMessage: option.fail,
          successCallback: () => setBool(true),
          failCallback: () => setBool(false),
        }),
      800
    ),
    [option]
  );
  const addListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.addEventListener("input", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: () => void) => void>(
    (action) => actionHandler<T>(ref.current, (ele) => ele.removeEventListener("input", action)),
    []
  );
  useAutoActionHandler({
    action: actionCallback,
    addListener: addListenerCallback,
    removeListener: removeListenerCallback,
  });
  return [ref, bool];
};

// 登录
useLogin = () => {
  const router = useRouter();
  const { dispatch } = useCurrentState();
  const failToast = useFailToast();
  const successToast = useSucessToast();
  const ref = useRef<HTMLFormElement>();
  const loginCallback = useCallback((e: Event) => {
    e.preventDefault();
    autoRequest({ method: "post", data: formSerialize(ref.current) })
      .run<ApiRequestResult<UserProps>>(apiName.login)
      .then(({ code, data }) => {
        if (code === 0 && !Array.isArray(data) && data.userId) {
          dispatch(setDataSucess_client(actionName.currentUser, data));
          successToast("登录成功，将要跳转到首页");
          delay(2000, () => router.push("/"));
        } else {
          failToast(`登录失败：${data}`);
        }
      })
      .catch((e) => failToast(`出现错误：${e.toString()}`));
  }, []);
  const addListenerCallback = useCallback<(action: (e: Event) => void) => void>(
    (action) => actionHandler<HTMLFormElement>(ref.current, (ele) => ele.addEventListener("submit", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: (e: Event) => void) => void>(
    (action) => actionHandler<HTMLFormElement>(ref.current, (ele) => ele.removeEventListener("submit", action)),
    []
  );
  useAutoActionHandler<Event>({ action: loginCallback, addListener: addListenerCallback, removeListener: removeListenerCallback });
  return ref;
};

// 登出
useLogout = () => {
  const router = useRouter();
  const failToast = useFailToast();
  const successToast = useSucessToast();
  const { state, dispatch } = useCurrentState();
  const user = state.client[actionName.currentUser]["data"] as UserProps;
  const logoutCallback = useCallback(() => {
    if (user.userId) {
      autoRequest({ method: "post", token: true })
        .run<ApiRequestResult<string>>(apiName.logout)
        .then(({ code, state }) => {
          if (code === 0) {
            dispatch(setDataSucess_client(actionName.currentUser, {}));
            successToast("登出成功，即将返回首页");
            delay(2000, () => router.push("/"));
          } else {
            failToast(`登出失败：${state}`);
          }
        })
        .catch((e) => failToast(`出现错误：${e.toString()}`));
    }
  }, [user]);
  return logoutCallback;
};

export { useAutoLogin, useCurrentUser, useLoginInput, useLogin, useLogout };
