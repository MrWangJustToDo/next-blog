import { call, put, select } from "redux-saga/effects";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { fetcherRequest } from "utils/fetcher";
import { getRelativeApiPath } from "utils/path";
import { getDataSucess_Server, getDataFail_Server } from "store/reducer/server/action";

export function* getTagData() {
  const token = yield select((state) => state.client[actionName.currentToken].data);
  try {
    let { code, state, data } = yield call(fetcherRequest({ token }), getRelativeApiPath(apiName.tag));
    if (code === 0) {
      yield put(getDataSucess_Server(apiName.tag, data));
    } else {
      yield put(getDataFail_Server(apiName.tag, state));
    }
  } catch (e) {
    yield put(getDataFail_Server(apiName.tag, e.toString()));
  }
}
