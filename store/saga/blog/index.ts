import { call, put, select } from "redux-saga/effects";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { autoRequest } from "utils/fetcher";
import { getDataSucess_Server, getDataFail_Server } from "store/reducer/server/action";

export function* getBlogData() {
  const state = yield select((state) => state);
  const token = state.client[actionName.currentToken]["data"];
  const id = state.client[actionName.currentBlogId]["data"];
  try {
    let { code, state, data } = yield call(autoRequest({ token, query: { blogId: id } }).run, apiName.blog);
    if (code === 0) {
      yield put(getDataSucess_Server(apiName.blog, data, { id }));
    } else {
      yield put(getDataFail_Server(apiName.blog, state, { id }));
    }
  } catch (e) {
    yield put(getDataFail_Server(apiName.blog, e.toString(), { id }));
  }
}
