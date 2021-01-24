import { wrapper } from "store";
import { END } from "redux-saga";
import isEqual from "lodash/isEqual";
import Main from "containers/Main";
import { MyNextComponent } from "./_app";
import { apiName } from "config/api";
import { autoDispatchTockenHandler } from "config/ssr";
import { animateFadein, getClass } from "utils/class";
import { getDataAction_Server, getDataSucess_Server } from "store/reducer/server/action";

let Home: MyNextComponent;

Home = () => {
  return (
    <div className={getClass(animateFadein, "container-md my-5")}>
      <Main />
    </div>
  );
};

Home.title = "首页";

export default Home;

// 加载home页面数据
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
  })
);
