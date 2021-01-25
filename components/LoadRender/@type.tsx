import { apiName } from "config/api";
import { QueryProps } from "utils/@type";

/* index */
interface LoadRenderProps<T> {
  method?: string;
  path: apiName | string;
  query?: QueryProps;
  requestData?: object;
  token?: boolean;
  loading?: (props: LoadingProps) => JSX.Element;
  loaded: (props: T) => JSX.Element;
  loadError?: (props: any) => JSX.Element;
  fetcher?: (...args: any) => any;
  placeholder?: { width?: string; height?: string };
  initialData?: T;
  revalidateOnMount?: boolean;
}

interface LoadRenderType {
  <T>(props: LoadRenderProps<T>): JSX.Element;
}

export type { LoadRenderType };

/* loading */
interface LoadingProps {
  placeholder?: { width?: string; height?: string };
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
