// 定义类型的文件
import { AnyAction } from "redux";
import { apiName } from "config/api";

/* action */
interface ServerActionType {
  [props: string]: (name: apiName) => string;
}
interface CreateAction {
  (name: apiName, data?: any, e?: any, res?: any): AnyAction;
}

/* reducer */
interface State<T> {
  readonly data: T;
}
interface ActionMapType<T> {
  [props: string]: (state: T, action: AnyAction) => T;
}

export type { ServerActionType, CreateAction, State, ActionMapType };
