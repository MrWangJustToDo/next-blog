import TagContentItem from "components/BlogItem";
import useTag from "hook/useTag";
import { getClass } from "utils/class";
import { TagContentType } from "./@type";

import style from "./index.module.scss";

let TagContent: TagContentType;

TagContent = ({ blogs }) => {
  const { currentPageBlogs } = useTag(blogs);
  return (
    <ul className="p-0">
      {currentPageBlogs.map((props) => (
        <div key={props.blogId} className="d-flex">
          <div className="col-lg-8 px-0">
            <TagContentItem {...props} />
          </div>
          <div className={getClass("col-lg-4 card", style.autoHide)}>显示评论。。。</div>
        </div>
      ))}
    </ul>
  );
};

export default TagContent;
