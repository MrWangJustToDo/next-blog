import { apiName } from "config/api";
import { autoRequest } from "utils/fetcher";
import { useInput, usePutToCheckcodeModule } from "hook/useMessage";
import BlogContentCheckcodeModule from "./blogContentCheckcodeModule";
import { BlogContentMessagePutType } from "./@type";

import style from "./index.module.scss";

let Index: BlogContentMessagePutType;

Index = ({ blogId }) => {
  const [value, typeCallback] = useInput<HTMLTextAreaElement>();
  const putRequest = autoRequest({ method: "post", path: apiName.putPrimaryMessage, data: { blogId } });
  const { ref, submit } = usePutToCheckcodeModule<HTMLTextAreaElement>({
    request: putRequest,
    body: (request) => (close) => <BlogContentCheckcodeModule request={request} closeHandler={close} />,
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
