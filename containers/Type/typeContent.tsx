import TypeContentItem from "components/BlogItem";
import useType from "hook/useType";
import { getClass } from "utils/class";
import { TypeContentType } from "./@type";

import style from "./index.module.scss";

let TypeContent: TypeContentType;

TypeContent = ({ blogs }) => {
  const { currentPageBlogs } = useType(blogs);
  return (
    <ul className="p-0">
      {currentPageBlogs.map((props) => (
        <div key={props.blogId} className="d-flex">
          <div className="col-lg-8 px-0">
            <TypeContentItem {...props} />
          </div>
          <div className={getClass("col-lg-4 card", style.autoHide)}>显示评论。。。</div>
        </div>
      ))}
    </ul>
  );
};

export default TypeContent;
