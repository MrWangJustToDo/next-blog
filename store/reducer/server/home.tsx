import { Draft, produce } from "immer";
import { AnyAction, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { serverAction } from "./action";
import { apiName } from "config/api";
import { State, ActionMapType } from "./@type";

type CurrentState = State<any[]>;

let initState: CurrentState;
let reducer: Reducer<CurrentState>;
let actionReducerMap: ActionMapType<CurrentState>;

initState = { data: [] };

reducer = (state: CurrentState = initState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    if (state.data.length) {
      return { ...action.payload.server[apiName.home], ...state };
    } else {
      return { ...action.payload.server[apiName.home] };
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
