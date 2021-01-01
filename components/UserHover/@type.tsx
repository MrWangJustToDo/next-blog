import { BlogContentProps } from "hook/@type";

interface UserHoverProps extends BlogContentProps {
  children: JSX.Element;
}

/* hoverItem */
interface UserHoverItemType {
  (props: UserHoverProps): JSX.Element;
}

export type { UserHoverItemType };

/* index */

interface UserHoverType {
  (props: UserHoverProps): JSX.Element;
}

export type { UserHoverType };
