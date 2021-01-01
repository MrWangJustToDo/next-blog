// 定义类型的文件
import { AnyAction } from "redux";
import { actionName } from "config/action";

/* action */
interface ClientActionType {
  [props: string]: (name: actionName) => string;
}
interface CreateAction {
  (name: actionName, data?: any, e?: any): AnyAction;
}

/* reducer */
interface State<T> {
  readonly data: T;
}
interface ActionMapType<T> {
  [props: string]: (state: T, action: AnyAction) => T;
}

export type { ClientActionType, CreateAction, State, ActionMapType };
