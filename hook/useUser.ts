import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { delay } from "utils/delay";
import { formSerialize } from "utils/data";
import { autoRequest } from "utils/fetcher";
import { actionHandler } from "utils/action";
import { setDataFail_client, setDataSucess_client } from "store/reducer/client/action";
import { useCurrentState } from "./useBase";
import { useAutoActionHandler } from "./useAuto";
import { useFailToast, useSucessToast } from "./useToast";
import { ApiRequestResult } from "utils/@type";
import { UserProps, UseAutoLoginType, UseCurrentUserType, UseLoginType, UseLogoutType } from "./@type";

let useAutoLogin: UseAutoLoginType;

let useCurrentUser: UseCurrentUserType;

let useLogin: UseLoginType;

let useLogout: UseLogoutType;

// 未登录时尝试自动登录
useAutoLogin = () => {
  const { dispatch } = useCurrentState();
  const autoLoginCallback = useCallback(
    () =>
      autoRequest({ token: true })
        .run<ApiRequestResult<UserProps>>(apiName.autoLogin)
        .then(({ code, data }) => {
          if (code === 0 && !Array.isArray(data) && data.userId) {
            dispatch(setDataSucess_client(actionName.currentUser, data));
          } else {
            dispatch(setDataFail_client(actionName.currentUser, {}));
          }
        })
        .catch(() => dispatch(setDataFail_client(actionName.currentUser, {}))),
    []
  );
  useAutoActionHandler({ timmer: true, once: false, rightNow: true, delayTime: 1000 * 60 * 10, action: autoLoginCallback });
};

// 获取当前登录对象
useCurrentUser = () => {
  const { state } = useCurrentState();
  return state.client[actionName.currentUser]["data"];
};

// 登录
useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const failToast = useFailToast();
  const successToast = useSucessToast();
  const ref = useRef<HTMLFormElement>();
  const loginCallback = useCallback<(e: Event) => void>((e) => {
    e.preventDefault();
    autoRequest({ method: "post", data: formSerialize(ref.current) })
      .run<ApiRequestResult<UserProps>>(apiName.login)
      .then(({ code, data }) => {
        if (code === 0 && !Array.isArray(data) && data.userId) {
          dispatch(setDataSucess_client(actionName.currentUser, data));
          successToast("登录成功，将要跳转到首页");
          delay(1000, () => router.push("/"));
        } else {
          failToast(`登录失败：${data}`);
        }
      })
      .catch((e) => failToast(`出现错误：${e.toString()}`));
  }, []);
  const addListenerCallback = useCallback<(action: (e: Event) => void) => void>(
    (action) => actionHandler<HTMLFormElement, void>(ref.current, (ele) => ele.addEventListener("submit", action)),
    []
  );
  const removeListenerCallback = useCallback<(action: (e: Event) => void) => void>(
    (action) => actionHandler<HTMLFormElement, void>(ref.current, (ele) => ele.removeEventListener("submit", action)),
    []
  );
  useAutoActionHandler<Event, void>({ action: loginCallback, addListener: addListenerCallback, removeListener: removeListenerCallback });
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
    return autoRequest({ method: "post", token: true })
      .run<ApiRequestResult<string>>(apiName.logout)
      .then(({ code, state }) => {
        if (code === 0) {
          dispatch(setDataSucess_client(actionName.currentUser, {}));
          successToast("登出成功，即将返回首页");
          delay(1000, () => router.push("/"));
        } else {
          failToast(`登出失败：${state}`);
        }
      })
      .catch((e) => failToast(`出现错误：${e.toString()}`));
  }, [user]);
  return logoutCallback;
};

export { useAutoLogin, useCurrentUser, useLogin, useLogout };
