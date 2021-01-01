import BlogHead from "components/BlogHead";
import BlogContentImg from "./blogContentImg";
import BlogContentType_Tag from "./blogContentType&Tag";
import BlogContentBody from "./blogContentBody";
import BlogContentLike from "./blogContentLike";
import BlogContentMessage from "./blogContentMessage";
import { BlogContentType } from "./@type";

let Blog: BlogContentType;

Blog = (props) => {
  const { blogImgLink, typeContent, tagContent, blogTitle, blogContent, blogId } = props;
  return (
    <div className="card user-select-none">
      <BlogHead {...props} />
      <ul className="list-group list-group-flush">
        <BlogContentImg src={blogImgLink} />
        <BlogContentType_Tag typeContent={typeContent} tagContent={tagContent} />
        <BlogContentBody blogTitle={blogTitle} blogContent={blogContent} />
        <BlogContentLike />
        <BlogContentMessage blogId={blogId} />
      </ul>
    </div>
  );
};

export default Blog;
