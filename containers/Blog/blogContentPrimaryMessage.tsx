import { useCallback } from "react";
import PageFoot from "components/PageFoot";
import LoadRender from "components/LoadRender";
import { PrimaryMessage } from "components/BlogMessage";
import { useReplayOpen } from "hook/useReplay";
import { usePrimaryMessage } from "hook/useMessage";
import { apiName } from "config/api";
import { getApiPath } from "utils/path";
import BlogContentChildMessage from "./blogContentChildMessage";
import BlogContentMessagePut from "./blogContentMessagePut";
import { BlogContentPrimaryMessageType } from "./@type";
import { PrimaryMessageProps } from "components/BlogMessage/@type";

import style from "./index.module.scss";

let Index: BlogContentPrimaryMessageType;

Index = ({ messages }) => {
  const { currentPage, increaseAble, decreaseAble, increasePage, decreasePage, currentMessage } = usePrimaryMessage(messages);
  const open = useReplayOpen();
  const openCallback = useCallback<(props: PrimaryMessageProps) => void>(
    (messageProps) =>
      open({
        head: "回复评论",
        body: (close) => (
          <>
            <PrimaryMessage {...messageProps}></PrimaryMessage>
            <BlogContentMessagePut blogId={messageProps.blogId} />
          </>
        ),
      }),
    []
  );
  return (
    <>
      <div className="card-body">
        {currentMessage.map((item) => (
          <PrimaryMessage key={item.commentId} {...item} replayHandler={openCallback}>
            <LoadRender
              path={getApiPath(apiName.childMessage)}
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

export default Index;
