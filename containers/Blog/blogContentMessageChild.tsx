import { useMemo } from "react";
import { ChildMessage } from "components/BlogMessage";
import { useChildMessage, useMessageToReplayModule } from "hook/useMessage";
import { apiName } from "config/api";
import { getClass } from "utils/class";
import { autoRequest } from "utils/fetcher";
import BlogContentReplayModule from "./blogContentReplayModule";
import { ChildMessageProps } from "components/BlogMessage/@type";
import { BlogContentChildMessageType, BlogContentChildMessageWithReplayType } from "./@type";

import style from "./index.module.scss";

let BlogContentChildMessageWithReplay: BlogContentChildMessageWithReplayType;

let BlogContentChildMessage: BlogContentChildMessageType;

BlogContentChildMessageWithReplay = ({ messages, replay }) => {
  const { messageProps, more, loadMore } = useChildMessage(messages);
  return (
    <>
      {messageProps.map((item, index) => (
        <ChildMessage key={item.commentId} {...item} replayHandler={replay}>
          {index === messageProps.length - 1 && more && (
            <button className={getClass("btn btn-info float-right", style.loadMore)} onClick={loadMore}>
              loadMore
            </button>
          )}
        </ChildMessage>
      ))}
    </>
  );
};

BlogContentChildMessage = ({ messages }) => {
  const request = useMemo(() => autoRequest({ method: "post", path: apiName.putChildMessage }), []);
  const replay = useMessageToReplayModule<ChildMessageProps>({
    body: (request) => (props) => (closeHandler) => (
      <>
        <ChildMessage {...props} withReplay={false} withChildren={false} />
        <BlogContentReplayModule request={request} closeHandler={closeHandler} />
      </>
    ),
    className: style.replayModule,
    request,
  });
  return <BlogContentChildMessageWithReplay messages={messages} replay={replay} />;
};

export default BlogContentChildMessage;
