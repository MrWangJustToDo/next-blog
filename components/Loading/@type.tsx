/* loading */
interface LoadingProps {
  className?: string;
  _style?: { width?: string; height?: string; [props: string]: string };
}

interface LoadingType {
  (props: LoadingProps): JSX.Element;
}

export type { LoadingType };
