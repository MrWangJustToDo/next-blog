import { ChildMessage } from "components/BlogMessage";
import { useChildMessage, useMessageToReplay } from "hook/useMessage";
import { getClass } from "utils/class";
import BlogContentMessageReplayModule from "./blogContentMessageReplayModule";
import { BlogContentChildMessageType } from "./@type";

import style from "./index.module.scss";

let Index: BlogContentChildMessageType;

Index = ({ messages }) => {
  const { messageProps, more, loadMore } = useChildMessage(messages);
  const replay = useMessageToReplay((props) => (closeHandler) => (
    <>
      <ChildMessage {...props} withReplay={false} withChildren={false} />
      <BlogContentMessageReplayModule {...props} close={closeHandler} />
    </>
  ));
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
