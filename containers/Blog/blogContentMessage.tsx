import LoadRender from "components/LoadRender";
import { PrimaryMessage, ChildMessage } from "components/BlogMessage";
import { apiName } from "config/api";
import { getApiPath } from "utils/path";

let BlogContentMessage = ({ blogId }) => {
  return (
    <li className="list-group-item">
      <div className="card">
        <h5 className="card-header small">留言区</h5>
        <div className="card-body">
          <LoadRender
            path={getApiPath(apiName.primaryMessage)}
            method="post"
            requestData={{ blogId }}
            loaded={(data) =>
              data.map((item) => (
                <PrimaryMessage key={item.commentId} {...item}>
                  <LoadRender
                    path={getApiPath(apiName.childMessage)}
                    method="post"
                    requestData={{ primaryCommentId: item.commentId }}
                    loaded={(data) => data.map((item) => <ChildMessage key={item.commentId} {...item} />)}
                  />
                </PrimaryMessage>
              ))
            }
          />
        </div>
      </div>
    </li>
  );
};

export default BlogContentMessage;
