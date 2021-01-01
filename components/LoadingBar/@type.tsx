/* index */
interface LoadingBarProps {
  height?: number;
  present?: number;
  loading?: boolean;
}

interface LoadingBarType {
  (props: LoadingBarProps): JSX.Element;
}

export type { LoadingBarType, LoadingBarProps };

/* loadingBar */
interface BarProps extends LoadingBarProps {
  autoAdd: () => NodeJS.Timeout;
}

interface BarType {
  (props: BarProps): JSX.Element;
}

export type { BarType };
