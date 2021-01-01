import { BlogContentProps } from "hook/@type";

interface BlogItemType {
  (props: BlogContentProps): JSX.Element;
}

export type { BlogItemType };

/* blogItemRight */
interface BlogItemRightType {
  (props: { src: string }): JSX.Element;
}

export type { BlogItemRightType };
