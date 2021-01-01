/* animate */
interface AnimateType {
  (props: { children?: JSX.Element; show: boolean; }): JSX.Element;
}

export type { AnimateType };

/* index */
interface HoverProps {
  className?: string;
  children: JSX.Element;
  hoverItem: JSX.Element;
}

interface HoverType {
  (props: HoverProps): JSX.Element;
}

export type { HoverType };
