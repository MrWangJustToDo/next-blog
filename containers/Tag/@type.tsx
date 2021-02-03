import { BlogContentProps } from "hook/@type";

/* tagContentType */
interface TagContentType {
  (props: { blogs: BlogContentProps[] }): JSX.Element;
}

export type { TagContentType };