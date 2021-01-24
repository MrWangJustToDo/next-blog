// 定义类型的文件
import { AnyAction } from "redux";
import { actionName } from "config/action";
import { BlogContentProps } from "hook/@type";

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

/* currentArchive */
interface StateProps {
  (year?: string): BlogContentProps[];
}

export type { ClientActionType, CreateAction, State, ActionMapType, StateProps };
