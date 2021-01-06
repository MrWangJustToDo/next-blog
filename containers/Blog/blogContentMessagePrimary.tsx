import PageFoot from "components/PageFoot";
import LoadRender from "components/LoadRender";
import { PrimaryMessage } from "components/BlogMessage";
import { useMessageToReplay, usePrimaryMessage } from "hook/useMessage";
import { apiName } from "config/api";
import { getApiPath } from "utils/path";
import BlogContentChildMessage from "./blogContentMessageChild";
import BlogContentMessageReplayModule from "./blogContentMessageReplayModule";
import { BlogContentPrimaryMessageType } from "./@type";

import style from "./index.module.scss";

let Index: BlogContentPrimaryMessageType;

Index = ({ messages }) => {
  const { currentPage, increaseAble, decreaseAble, increasePage, decreasePage, currentMessage } = usePrimaryMessage(messages);
  const replay = useMessageToReplay((props) => (closeHandler) => (
    <>
      <PrimaryMessage {...props} withReplay={false} withChildren={false} />
      <BlogContentMessageReplayModule {...props} close={closeHandler} />
    </>
  ));
  return (
    <>
      <div className="card-body">
        {currentMessage.map((item) => (
          <PrimaryMessage key={item.commentId} {...item} replayHandler={replay}>
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
