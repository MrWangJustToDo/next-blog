import LoadRender from "components/LoadRender";
import { apiName } from "config/api";
import { getApiPath } from "utils/path";
import BlogContentPrimaryMessage from "./blogContentPrimaryMessage";
import BlogContentImageCheck from "./blogContentImageCheck";
import { BlogContentMessageType } from "./@type";

let BlogContentMessage: BlogContentMessageType;

BlogContentMessage = ({ blogId }) => {
  return (
    <li className="list-group-item">
      <div className="card">
        <h5 className="card-header small">留言区</h5>
        <LoadRender
          path={getApiPath(apiName.primaryMessage)}
          method="post"
          requestData={{ blogId }}
          loaded={(data) => <BlogContentPrimaryMessage messages={data} />}
        />
      </div>
    </li>
  );
};

export default BlogContentMessage;
