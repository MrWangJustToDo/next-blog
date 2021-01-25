import LoadRender from "components/LoadRender";
import { apiName } from "config/api";
import BlogContentPrimaryMessage from "./blogContentMessagePrimary";
import { PrimaryMessageProps } from "components/BlogMessage/@type";
import { BlogContentMessageType } from "./@type";

let BlogContentMessage: BlogContentMessageType;

BlogContentMessage = ({ blogId }) => {
  return (
    <li className="list-group-item">
      <div className="card">
        <h5 className="card-header small">留言区</h5>
        <LoadRender<PrimaryMessageProps[]>
          path={apiName.primaryMessage}
          method="post"
          requestData={{ blogId }}
          loaded={(data) => <BlogContentPrimaryMessage messages={data} />}
        />
      </div>
    </li>
  );
};

export default BlogContentMessage;
