import { Method } from "axios";
import { apiName } from "config/api";
import { AnyAction } from "redux";
import { QueryProps } from "utils/@type";

/* index */
interface LoadRenderProps<T> {
  method?: Method;
  path?: string;
  apiPath?: apiName;
  query?: QueryProps;
  token?: boolean;
  requestData?: object;
  initialData?: T;
  needUpdate?: boolean;
  needinitialData?: boolean;
  fetcher?: (...args: any) => any;
  loaded: (props: T) => JSX.Element;
  loading?: (props: LoadingProps) => JSX.Element;
  loadError?: (props: any) => JSX.Element;
  placeholder?: { width?: string; height?: string; [props: string]: string };
  revalidateOnMount?: boolean;
}

interface LoadRenderType {
  <T>(props: LoadRenderProps<T>): JSX.Element;
}

interface GetCurrentInitialDataProps<T> {
  initialData?: T;
  needinitialData?: boolean;
  apiPath?: apiName;
}

interface GetCurrentInitialDataType {
  <T>(props: GetCurrentInitialDataProps<T>): { initialData?: T; dispatch: (props: AnyAction) => void };
}

/* withUpdateStore */
interface WithUpdateStoreProps<T> {
  dispatch: (props: AnyAction) => void;
  needUpdate?: boolean;
  apiPath?: apiName;
  currentState?: T;
  data: T;
  children: JSX.Element;
}

interface WithUpdateStoreType {
  <T>(props: WithUpdateStoreProps<T>): JSX.Element;
}

export type { LoadRenderType, GetCurrentInitialDataType, WithUpdateStoreType };

/* loading */
interface LoadingProps {
  className?: string;
  placeholder?: { width?: string; height?: string; [props: string]: string };
}

/* loadingError */
interface LoadingErrorType {
  (error: string): JSX.Element;
}

export type { LoadingErrorType };
