import { Draft, produce } from "immer";
import { AnyAction, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { serverAction } from "./action";
import { apiName } from "config/api";
import { State, ActionMapType } from "./@type";

interface BlogData {
  [props: string]: any;
}

type CurrentState = State<BlogData>;

let initState: CurrentState;
let reducer: Reducer<CurrentState>;
let actionReducerMap: ActionMapType<CurrentState>;

initState = { data: {} };

reducer = (state: CurrentState = initState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    if (Object.keys(state.data).length) {
      return { ...action.payload.server[apiName.blog], ...state };
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
