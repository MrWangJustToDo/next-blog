import { BlogContentProps } from "hook/@type";

interface UserHoverProps extends BlogContentProps {
  children?: JSX.Element;
}

/* hoverItem */
interface UserHoverItemType {
  (props: UserHoverProps): JSX.Element;
}
interface UserExProps {
  userId?: string;
  collect?: number;
  assent?: number;
  publish?: number;
  collectIds?: number;
  assentIds?: number;
}

export type { UserExProps, UserHoverItemType };

/* index */

interface UserHoverType {
  (props: UserHoverProps): JSX.Element;
}

export type { UserHoverType };
