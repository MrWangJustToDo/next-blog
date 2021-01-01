import BlogMessage from "components/BlogMessage";
import LoadRender from "components/LoadRender";
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
            loaded={(data) => data.map((item) => <BlogMessage key={item.modifyDate} {...item} />)}
          />
        </div>
      </div>
    </li>
  );
};

export default BlogContentMessage;
