import { wrapper } from "store";
import { END } from "redux-saga";
import isEqual from "lodash/isEqual";
import groupBy from "lodash/groupBy";
import ArchiveContent from "containers/Archive";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { autoDispatchTockenHandler } from "config/ssr";
import { animateFadein, getClass } from "utils/class";
import { setDataSucess_client } from "store/reducer/client/action";
import { getDataAction_Server, getDataSucess_Server } from "store/reducer/server/action";

interface ArchiveComponent {
  (): JSX.Element;
}

let Archive: ArchiveComponent;

Archive = () => {
  return (
    <div className={getClass(animateFadein, "container-md my-5")}>
      <ArchiveContent />
    </div>
  );
};

export default Archive;

export const getServerSideProps = wrapper.getServerSideProps(
  autoDispatchTockenHandler(async ({ store, req, res, ...etc }) => {
    if (!req.session[apiName.home]) {
      // action
      store.dispatch(getDataAction_Server(apiName.home));
      // end the saga
      store.dispatch(END);
      // wait saga end
      await store.sagaTask.toPromise();
      req.session[apiName.home] = store.getState().server[apiName.home];
    }
    // 将session中的数据加载到store中
    if (!isEqual(store.getState().server[apiName.home]["data"], req.session[apiName.home]["data"])) {
      store.dispatch(getDataSucess_Server(apiName.home, req.session[apiName.home]["data"]));
    }
    // 当前页面需要的数据{'2020': [...], '2021': [....]}
    const blogs = req.session[apiName.home]["data"];
    const groupBlogs = groupBy(blogs, "blogCreateYear");
    if (!isEqual(store.getState().client[actionName.currentArchive]["data"], groupBlogs)) {
      store.dispatch(setDataSucess_client(actionName.currentArchive, groupBlogs));
    }
  })
);
