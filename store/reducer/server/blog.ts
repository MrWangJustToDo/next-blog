import { Draft, produce } from "immer";
import { AnyAction, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { serverAction } from "./action";
import { apiName } from "config/api";
import { BlogContentProps } from "hook/@type";
import { State, ActionMapType } from "./@type";

type CurrentState = State<BlogContentProps>;

let initState: CurrentState;
let reducer: Reducer<CurrentState>;
let actionReducerMap: ActionMapType<CurrentState>;

initState = { data: {} };

reducer = (state: CurrentState = initState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    if (Object.keys(state.data).length) {
      if (Object.keys(action.payload.server[apiName.blog]["data"]).length > Object.keys(state.data).length) {
        return { ...state, ...action.payload.server[apiName.blog] };
      } else {
        return { ...action.payload.server[apiName.blog], ...state };
      }
    } else {
      return { ...action.payload.server[apiName.blog] };
    }
  }
  let actionReducer = actionReducerMap[action.type];
  if (actionReducer) {
    return actionReducer(state, action);
  } else {
    return state;
  }
};

actionReducerMap = {
  [serverAction.GETDATASUCESS(apiName.blog)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data[action.id] = action.data;
    }),
  [serverAction.GETDATAFAIL(apiName.blog)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data[action.id] = action.e;
    }),
};

export default reducer;
