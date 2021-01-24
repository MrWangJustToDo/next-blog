import { call, put, select } from "redux-saga/effects";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { autoRequest } from "utils/fetcher";
import { getRelativeApiPath } from "utils/path";
import { getDataSucess_Server, getDataFail_Server } from "store/reducer/server/action";

export function* getHomeData() {
  const token = yield select((state) => state.client[actionName.currentToken].data);
  try {
    let { code, state, data } = yield call(autoRequest({ token }).run, getRelativeApiPath(apiName.home));
    if (code === 0) {
      yield put(getDataSucess_Server(apiName.home, data));
    } else {
      yield put(getDataFail_Server(apiName.home, state));
    }
  } catch (e) {
    yield put(getDataFail_Server(apiName.home, e.toString()));
  }
}
