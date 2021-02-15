import { BlogContentProps } from "hook/@type";

/* typeContent */
interface TypeContentType {
  (props: { blogs: BlogContentProps[] }): JSX.Element;
}

export type { TypeContentType };
