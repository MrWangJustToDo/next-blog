import { flexBetween, getClass } from "utils/class";
import BlogHeadLeft from "./blogHeadLeft";
import BlogHeadRight from "./blogHeadRight";
import { BlogContentType } from "containers/Blog/@type";

let BlogHead: BlogContentType;

BlogHead = (props) => {
  return (
    <h6 className={getClass("card-header bg-transparent", flexBetween)}>
      <BlogHeadLeft {...props} />
      <BlogHeadRight />
    </h6>
  );
};

export default BlogHead;
