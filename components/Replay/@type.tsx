interface ReplayProps {
  head: JSX.Element | string;
  body: (closeHandler: () => void) => JSX.Element;
  foot?: JSX.Element;
  className?: string;
  showState?: boolean;
  closeHandler?: () => void;
}

interface ReplayType {
  (props: ReplayProps): JSX.Element;
}

export type { ReplayType, ReplayProps };
