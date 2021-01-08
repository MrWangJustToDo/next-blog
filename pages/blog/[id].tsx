import { wrapper } from "store";
import { END } from "redux-saga";
import isEqual from "lodash/isEqual";
import Blog from "containers/Blog";
import { apiName } from "config/api";
import { actionName } from "config/action";
import { autoDispatchTockenHandler } from "config/ssr";
import { setDataSucess_client } from "store/reducer/client/action";
import { getDataAction_Server, getDataSucess_Server } from "store/reducer/server/action";
import { BlogContentType } from "containers/Blog/@type";

let BlogContent: BlogContentType;

BlogContent = (props) => {
  return (
    <div className="container-md my-5">
      <Blog {...props} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  autoDispatchTockenHandler(async ({ store, req, res, ...etc }) => {
    // 获取当前需要加载的博客详细信息
    const {
      params: { id },
    } = etc;
    if (!req.session[apiName.blog] || !req.session[apiName.blog]["data"] || !req.session[apiName.blog]["data"][id]) {
      // 加载数据并且存储在session中
      store.dispatch(getDataAction_Server(apiName.blog));
      // end the saga
      store.dispatch(END);
      // wait saga end
      await store.sagaTask.toPromise();
      req.session[apiName.blog] = store.getState().server[apiName.blog];
    }
    // 修改当前博客标识,同步不即时
    store.dispatch(setDataSucess_client(actionName.currentBlogId, id));
    // 将session中的数据加载到store中
    if (!isEqual(store.getState().server[apiName.blog]["data"][id], req.session[apiName.blog]["data"][id])) {
      store.dispatch(getDataSucess_Server(apiName.blog, req.session[apiName.blog]["data"][id], { id }));
    }
    return { props: req.session[apiName.blog]["data"][id] };
  })
);

export default BlogContent;
