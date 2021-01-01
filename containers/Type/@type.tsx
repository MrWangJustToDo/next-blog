import { BlogContentProps } from "hook/@type";

interface Element {
  (): JSX.Element;
}

export type { Element };

/* typeHeadItem */
interface TypeHeadItemType {
  (props: { typeContent: string; typeCount: number }): JSX.Element;
}

export type { TypeHeadItemType };

/* typeContent */
interface TypeContentType {
  (props: { blogs: BlogContentProps[] }): JSX.Element;
}

export type { TypeContentType };
