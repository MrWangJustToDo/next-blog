import ManageTag from "./manageTag";
import ManageType from "./manageType";
import ManageAddModule from "./manageAddModule";
import { SimpleElement } from "containers/Main/@type";
import { useManageToAddModule } from "hook/useManage";
import { autoRequest } from "utils/fetcher";
import { apiName } from "config/api";

let ManageRight: SimpleElement;

ManageRight = () => {
  const request = autoRequest({ method: "post", path: apiName.search });
  const click = useManageToAddModule({
    request,
    title: "添加标签",
    judgeApiName: apiName.search,
    body: (request) => (judgeApiName) => <ManageAddModule request={request} judgeApiName={judgeApiName} />,
  });
  return (
    <div className="col-md-4">
      <div className="card mt-4 mt-md-0">
        <div className="card-header small">标签</div>
        <ManageTag />
        <div className="card-footer small">
          <button type="button" className="float-right btn btn-info btn-sm" onClick={click}>
            新建
          </button>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header small">分类</div>
        <ManageType />
        <div className="card-footer small">
          <button type="button" className="float-right btn btn-info btn-sm">
            新建
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRight;
