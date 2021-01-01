import { BlogContentProps } from "hook/@type";

interface Element {
  (): JSX.Element;
}

export type { Element };

/* tagContentType */
interface TagContentType {
  (props: { blogs: BlogContentProps[] }): JSX.Element;
}

export type { TagContentType };