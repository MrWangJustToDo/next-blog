import { Draft, produce } from "immer";
import { AnyAction, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { serverAction } from "./action";
import { apiName } from "config/api";
import { State, ActionMapType } from "./@type";
import { BlogContentProps } from "hook/@type";

type CurrentState = State<BlogContentProps[]>;

let initState: CurrentState;
let reducer: Reducer<CurrentState>;
let actionReducerMap: ActionMapType<CurrentState>;

initState = { data: [] };

reducer = (state: CurrentState = initState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    if (state.data.length === 0) {
      return { ...action.payload.server[apiName.home] };
    } else {
      if (state.data.length < action.payload.server[apiName.home]["data"].length) {
        return { ...state, ...action.payload.server[apiName.home] };
      } else {
        return { ...action.payload.server[apiName.home], ...state };
      }
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
  [serverAction.GETDATASUCESS(apiName.home)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data = action.data;
    }),
  [serverAction.GETDATAFAIL(apiName.home)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data = action.e;
    }),
};

export default reducer;
