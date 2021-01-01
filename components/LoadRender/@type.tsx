/* index */
interface LoadRenderProps {
  method?: string;
  path: string;
  query?: object;
  requestData?: object;
  token?: boolean;
  loading?: (props: LoadingProps) => JSX.Element;
  loaded: (props: any) => JSX.Element;
  loadError?: (props: any) => JSX.Element;
  fetcher?: (...args: any) => any;
  placeholder?: { width?: string; height?: string };
  initialData?: any;
  revalidateOnMount?: boolean;
}

interface LoadRenderType {
  (props: LoadRenderProps): JSX.Element;
}

export type { LoadRenderType };

/* loading */
interface LoadingProps {
  placeholder: { width?: string; height?: string };
}

interface LoadingType {
  (props: LoadingProps): JSX.Element;
}

export type { LoadingType };

/* loadingError */
interface LoadingErrorType {
  (error: string): JSX.Element;
}

export type { LoadingErrorType };
