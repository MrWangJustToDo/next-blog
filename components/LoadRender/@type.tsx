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

interface AutoUpdateStateProps<T> {
  dispatch: (props: AnyAction) => void;
  needUpdate?: boolean;
  apiPath?: apiName;
  initialData?: T;
  currentData: T;
}

interface AutoUpdateStateType {
  <T>(props: AutoUpdateStateProps<T>): void;
}

export type { LoadRenderProps, LoadRenderType, GetCurrentInitialDataType, AutoUpdateStateType };

/* loading */
interface LoadingProps {
  className?: string;
  _style?: { width?: string; height?: string; [props: string]: string };
}

/* loadingError */
interface LoadingErrorType {
  (error: string): JSX.Element;
}

export type { LoadingErrorType };
