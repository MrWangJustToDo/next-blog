interface OverlayProps {
  head: JSX.Element | string;
  body: ((closeHandler: () => void) => JSX.Element) | JSX.Element;
  foot?: JSX.Element;
  className?: string;
  showState?: boolean;
  closeHandler?: () => void;
}

interface OverlayType {
  (props: OverlayProps): JSX.Element;
}

export type { OverlayType, OverlayProps };
