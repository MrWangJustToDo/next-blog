import { Draft, produce } from "immer";
import { AnyAction, Reducer } from "redux";
import { clientAction } from "./action";
import { actionName } from "config/action";
import { State, ActionMapType, StateProps } from "./@type";
import { HYDRATE } from "next-redux-wrapper";

type CurrentState = State<StateProps>;

let initState: CurrentState;
let reducer: Reducer<CurrentState>;
let actionReducerMap: ActionMapType<CurrentState>;

initState = { data: {} as StateProps };

reducer = (state: CurrentState = initState, action: AnyAction) => {
  // 合并服务器上的client部分数据
  if (action.type === HYDRATE) {
    return { ...action.payload.client[actionName.currentArchive] };
  }
  let actionReducer = actionReducerMap[action.type];
  if (actionReducer) {
    return actionReducer(state, action);
  } else {
    return state;
  }
};

actionReducerMap = {
  [clientAction.SETDATASUCESS(actionName.currentArchive)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data = action.data;
    }),
  [clientAction.SETDATAFAIL(actionName.currentArchive)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data = action.e;
    }),
};

export default reducer;
