import { useCallback } from "react";
import { apiName } from "config/api";
import { useInput } from "hook/useMessage";
import { useReplayOpen } from "hook/useReplay";
import { getApiPath } from "utils/path";
import { autoRequestEx } from "utils/fetcher";
import BlogContentImageCheck from "./blogContentImageCheck";
import { BlogContentMessagePutType } from "./@type";

import style from "./index.module.scss";

let Index: BlogContentMessagePutType;

Index = ({ blogId }) => {
  const open = useReplayOpen();
  const { value, typeCallback } = useInput<HTMLTextAreaElement>();
  const submit = useCallback(() => {
    if (value.length) {
      const request = autoRequestEx({ method: "post", path: getApiPath(apiName.putPrimaryMessage), data: { blogId, content: value } });
      open({
        head: "验证码验证",
        body: (close) => <BlogContentImageCheck request={request} closeHandler={close} />,
        className: style.imgCheck,
      });
    }
  }, [value, open, blogId]);
  return (
    <li className="list-group-item">
      <textarea
        className="w-100 my-2 border outline-none rounded"
        placeholder="请输入留言"
        style={{ minHeight: "100px" }}
        value={value}
        onChange={typeCallback}
      ></textarea>
      <button className="btn btn-sm btn-primary" onClick={submit}>
        新留言
      </button>
    </li>
  );
};

export default Index;
