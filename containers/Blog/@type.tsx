import { BlogContentProps } from "hook/@type";

interface BlogContentType {
  (props: BlogContentProps): JSX.Element;
}

export type { BlogContentType };

/* blogContentImg */
interface BlogContentImgType {
  (props: { src: string }): JSX.Element;
}

export type { BlogContentImgType };
