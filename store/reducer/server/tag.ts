import { Draft, produce } from "immer";
import { AnyAction, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { serverAction } from "./action";
import { apiName } from "config/api";
import { State, ActionMapType } from "./@type";
import { TagProps } from "containers/Publish/@type";

type CurrentState = State<TagProps[]>;

let initState: CurrentState;
let reducer: Reducer<CurrentState>;
let actionReducerMap: ActionMapType<CurrentState>;

initState = { data: [] };

reducer = (state: CurrentState = initState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    if (state.data.length) {
      if (state.data.length < action.payload.server[apiName.tag]["data"].length) {
        return { ...state, ...action.payload.server[apiName.tag] };
      }
      return { ...action.payload.server[apiName.tag], ...state };
    } else {
      return { ...action.payload.server[apiName.tag] };
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
  [serverAction.GETDATASUCESS(apiName.tag)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data = action.data;
    }),
  [serverAction.GETDATAFAIL(apiName.tag)]: (state: CurrentState, action: AnyAction) =>
    produce(state, (proxy: Draft<CurrentState>) => {
      proxy.data = action.e;
    }),
};

export default reducer;
