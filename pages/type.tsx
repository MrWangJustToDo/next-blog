import { END } from "redux-saga";
import isEqual from "lodash/isEqual";
import TypeContent from "containers/Type";
import { apiName } from "config/api";
import { wrapper } from "store";
import { autoDispatchTockenHandler } from "config/ssr";
import { getDataAction_Server, getDataSucess_Server } from "store/reducer/server/action";
import { animateFadein, getClass } from "utils/class";

interface TypeComponent {
  (): JSX.Element;
}

let Type: TypeComponent;

Type = () => {
  return (
    <div className={getClass(animateFadein, "container-md my-5")}>
      <TypeContent />
    </div>
  );
};

export default Type;

// 加载type页面数据
export const getServerSideProps = wrapper.getServerSideProps(
  autoDispatchTockenHandler(async ({ store, req, res, ...etc }) => {
    if (!req.session[apiName.type]) {
      // action
      store.dispatch(getDataAction_Server(apiName.type));
      // end the saga
      store.dispatch(END);
      // wait saga end
      await store.sagaTask.toPromise();
      req.session[apiName.type] = store.getState().server[apiName.type];
    }
    // 将session中的数据加载到store中
    if (!isEqual(store.getState().server[apiName.type]["data"], req.session[apiName.type]["data"])) {
      store.dispatch(getDataSucess_Server(apiName.type, req.session[apiName.type]["data"]));
    }
  })
);
