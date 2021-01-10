import { useMemo } from "react";
import PageFoot from "components/PageFoot";
import LoadRender from "components/LoadRender";
import { PrimaryMessage } from "components/BlogMessage";
import { usePrimaryMessage, useMessageToReplayModule } from "hook/useMessage";
import { apiName } from "config/api";
import { autoRequest } from "utils/fetcher";
import BlogContentChildMessage from "./blogContentMessageChild";
import BlogContentReplayModule from "./blogContentReplayModule";
import { PrimaryMessageProps } from "components/BlogMessage/@type";
import { BlogContentPrimaryMessageType, BlogContentPrimaryMessageWithReplayType } from "./@type";

import style from "./index.module.scss";

let BlogContentPrimaryMessage: BlogContentPrimaryMessageType;
let BlogContentPrimaryMessageWithReplay: BlogContentPrimaryMessageWithReplayType;

BlogContentPrimaryMessageWithReplay = ({ messages, replay }) => {
  const { currentPage, increaseAble, decreaseAble, increasePage, decreasePage, currentMessage } = usePrimaryMessage(messages);
  return (
    <>
      <div className="card-body">
        {currentMessage.map((item) => (
          <PrimaryMessage key={item.commentId} {...item} replayHandler={replay}>
            <LoadRender
              path={apiName.childMessage}
              method="post"
              requestData={{ primaryCommentId: item.commentId }}
              loaded={(data) => <BlogContentChildMessage messages={data} />}
            />
          </PrimaryMessage>
        ))}
      </div>
      <PageFoot
        page={currentPage}
        className={style.footPage}
        increaseAble={increaseAble}
        decreaseAble={decreaseAble}
        increasePage={increasePage}
        decreasePage={decreasePage}
      />
    </>
  );
};

BlogContentPrimaryMessage = ({ messages }) => {
  const request = useMemo(() => autoRequest({ method: "post", path: apiName.putPrimaryMessage }), []);
  const replay = useMessageToReplayModule<PrimaryMessageProps>({
    body: (request) => (props) => (closeHandler) => (
      <>
        <PrimaryMessage {...props} withReplay={false} withChildren={false} />
        <BlogContentReplayModule request={request} closeHandler={closeHandler} />
      </>
    ),
    className: style.replayModule,
    request,
  });
  return <BlogContentPrimaryMessageWithReplay messages={messages} replay={replay} />;
};

export default BlogContentPrimaryMessage;
