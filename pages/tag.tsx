import { wrapper } from "store";
import { END } from "redux-saga";
import isEqual from "lodash/isEqual";
import TagContent from "containers/Tag";
import { MyNextComponent } from "./_app";
import { apiName } from "config/api";
import { autoDispatchTockenHandler } from "config/ssr";
import { animateFadein, getClass } from "utils/class";
import { getDataAction_Server, getDataSucess_Server } from "store/reducer/server/action";

let Tag: MyNextComponent;

Tag = () => {
  return (
    <div className={getClass(animateFadein, "container-md my-5")}>
      <TagContent />
    </div>
  );
};

Tag.title = "标签";

export default Tag;

// 加载tag页面数据
export const getServerSideProps = wrapper.getServerSideProps(
  autoDispatchTockenHandler(async ({ store, req, res, ...etc }) => {
    // action
    store.dispatch(getDataAction_Server(apiName.tag));
    // end the saga
    store.dispatch(END);
    // wait saga end
    await store.sagaTask.toPromise();
    if (!req.session[apiName.tag]) {
      req.session[apiName.tag] = store.getState().server[apiName.tag];
    }
    // 将session中的数据加载到store中
    if (!isEqual(store.getState().server[apiName.tag]["data"], req.session[apiName.tag]["data"])) {
      req.session[apiName.tag] = store.getState().server[apiName.tag];
      store.dispatch(getDataSucess_Server(apiName.tag, req.session[apiName.tag]["data"]));
    }
  })
);
