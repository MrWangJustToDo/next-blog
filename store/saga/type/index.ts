import { call, put, select } from "redux-saga/effects";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { autoRequest } from "utils/fetcher";
import { getRelativeApiPath } from "utils/path";
import { getDataSucess_Server, getDataFail_Server } from "store/reducer/server/action";

export function* getTypeData() {
  const token = yield select((state) => state.client[actionName.currentToken].data);
  try {
    let { code, state, data } = yield call(autoRequest({ token }).run, getRelativeApiPath(apiName.type));
    if (code === 0) {
      yield put(getDataSucess_Server(apiName.type, data));
    } else {
      yield put(getDataFail_Server(apiName.type, state));
    }
  } catch (e) {
    yield put(getDataFail_Server(apiName.type, e.toString()));
  }
}
