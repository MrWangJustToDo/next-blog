import { apiName } from "config/api";
import { getApiPath } from "utils/path";
import { autoRequestEx } from "utils/fetcher";
import { useInput, useSubmitToCheckModule } from "hook/useMessage";
import BlogContentImageCheck from "./blogContentCheckcodeModule";
import { BlogContentMessagePutType } from "./@type";
import { AutoRequestExType } from "utils/@type";

import style from "./index.module.scss";

let Index: BlogContentMessagePutType;

Index = ({ blogId }) => {
  const [value, typeCallback] = useInput<HTMLTextAreaElement>();
  const putRequest = autoRequestEx({ method: "post", path: getApiPath(apiName.putPrimaryMessage), data: { blogId } }) as AutoRequestExType;
  const { ref, submit } = useSubmitToCheckModule<HTMLTextAreaElement>({
    request: putRequest,
    body: (request) => (close) => <BlogContentImageCheck request={request} closeHandler={close} />,
    className: style.imgCheck,
  });
  return (
    <li className="list-group-item">
      <textarea
        className="w-100 my-2 border rounded"
        placeholder="请输入留言"
        style={{ minHeight: "100px" }}
        ref={ref}
        value={value}
        onChange={typeCallback}
      />
      <button className="btn btn-sm btn-primary" onClick={submit} disabled={!!!value.length}>
        新留言
      </button>
    </li>
  );
};

export default Index;
