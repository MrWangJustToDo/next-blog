import { apiName } from "config/api";

/* class */
type Arguments = string | string[] | (() => string)[] | (() => string) | (() => string[]);

interface TransformArray {
  (args: Arguments[]): string[];
}
interface GetClass {
  (...args: Arguments[]): string;
}
interface GetArray<T> {
  (): T[];
}
interface GetItem<T> {
  (): T;
}

export type { TransformArray, GetClass, GetArray, GetItem };

/* data */
type ResultProps = ApiRequestResult | any;
interface AutoTransformDataType {
  (props: ResultProps): any;
}
interface GetCurrentAvatar {
  (avatar: string, gender: number): string;
}

export type { AutoTransformDataType, GetCurrentAvatar };

/* delay */
interface Cancel {
  (key: string): void;
}
interface Delay {
  (time: number, action: Function, key?: string): Promise<any>;
}
interface TimeoutMap {
  [props: string]: Array<NodeJS.Timeout | void>;
}
interface ResolveMap {
  [props: string]: Array<Function>;
}
interface KeyMap {
  [props: string]: number;
}

export type { Cancel, Delay, TimeoutMap, ResolveMap, KeyMap };

/* fetcher */
interface RequestProps {
  method?: string;
  path?: string | apiName;
  query?: QueryProps;
  token?: boolean | string;
  data?: object;
}
interface ApiRequestResult {
  code: number;
  data: object | object[];
  state: string;
  res: any;
}
interface AutoRequestType {
  run?: <T>(path?: string, query?: QueryProps) => Promise<T>;
  (props?: RequestProps): AutoRequestType;
}

export type { AutoRequestType, ApiRequestResult };

/* path */
interface QueryProps {
  [props: string]: string;
}
interface TransformStringUrl {
  (path: string, query?: QueryProps): string;
}
interface TransformObjectUrl {
  (props: { path: string; query?: QueryProps }): string;
}
interface GetRelativeApiPathType {
  (name: apiName, query?: QueryProps): string;
}

export type { TransformStringUrl, TransformObjectUrl, GetRelativeApiPathType, QueryProps };

/* token */
interface GetToken {
  (token: string | boolean): string;
}

export type { GetToken };

/* moment */
interface TimeToString {
  (props: Date | string): string;
}

export type { TimeToString };

/* element */
interface ActionHandlerType {
  <T>(element: T | undefined, action: (ele: T) => void | any): void | any;
}

export type { ActionHandlerType };

/* image */
interface LoadImgProps {
  imgUrl: apiName;
  strUrl: apiName;
  imgElement: HTMLImageElement;
}
interface LoadImgType {
  (props: LoadImgProps): Promise<HTMLImageElement | void>;
}

export type { LoadImgType };

/* markdown */
interface AddIdForHeadsType {
  (className: string): void | boolean;
}

export type { AddIdForHeadsType };
