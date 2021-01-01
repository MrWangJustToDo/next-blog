import Link from "next/link";
import BlogItemLeft from "./blogItemLeft";
import BlogItemRight from "./blogItemRight";
import { getClass, flexAround } from "utils/class";
import { BlogItemType } from "./@type";

let BlogItem: BlogItemType;

BlogItem = (props) => {
  const { blogImgLink } = props;
  return (
    <Link href={`/blog/${props.blogId}`}>
      <a className={getClass("text-reset text-decoration-none card-body row flex-wrap-reverse", flexAround)}>
        <BlogItemLeft {...props} />
        <BlogItemRight src={blogImgLink} />
      </a>
    </Link>
  );
};

export default BlogItem;
