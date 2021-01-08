import { ChildMessage } from "components/BlogMessage";
import { useChildMessage, useMessageToReplayModule } from "hook/useMessage";
import { apiName } from "config/api";
import { getClass } from "utils/class";
import { autoRequest } from "utils/fetcher";
import BlogContentMessageReplayModule from "./blogContentMessageReplayModule";
import { ChildMessageProps } from "components/BlogMessage/@type";
import { BlogContentChildMessageType } from "./@type";

import style from "./index.module.scss";

let Index: BlogContentChildMessageType;

Index = ({ messages }) => {
  const { messageProps, more, loadMore } = useChildMessage(messages);
  const request = autoRequest({ method: "post", path: apiName.putChildMessage });
  const replay = useMessageToReplayModule<ChildMessageProps>({
    body: (request) => (props) => (closeHandler) => (
      <>
        <ChildMessage {...props} withReplay={false} withChildren={false} />
        <BlogContentMessageReplayModule request={request} closeHandler={closeHandler} />
      </>
    ),
    className: "",
    request,
  });
  return (
    <>
      {messageProps.map((item, index) => (
        <ChildMessage key={item.commentId} {...item} replayHandler={replay}>
          {index === messageProps.length - 1 && more && (
            <button className={getClass("btn btn-outline-info float-right", style.loadMore)} onClick={loadMore}>
              loadMore
            </button>
          )}
        </ChildMessage>
      ))}
    </>
  );
};

export default Index;
