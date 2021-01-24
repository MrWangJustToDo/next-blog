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
// type ResultProps = ApiRequestResult<T> | any;
interface AutoTransformDataType {
  <T>(props: ApiRequestResult<T> | any): any;
}
interface GetCurrentAvatar {
  (avatar: string, gender: number): string;
}
interface FormChild extends Element {
  name?: string;
  type?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
}
interface FormSerializeType {
  (element: HTMLFormElement): { [props: string]: string };
}

export type { AutoTransformDataType, GetCurrentAvatar, FormChild, FormSerializeType };

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
interface ApiRequestResult<T> {
  code: number;
  data: T | T[];
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

/* action */
interface ActionHandlerType {
  <T>(element: T | undefined, action: (ele: T) => void | any, otherAction?: () => void): void | any;
}

interface JudgeActioProps<T> {
  element: T;
  judge: boolean | (() => boolean);
  successClassname: string;
  successMessage: string;
  failClassname: string;
  failMessage: string;
  successCallback?: () => void;
  failCallback?: () => void;
}

interface JudgeActionType {
  <T extends HTMLElement>(props: JudgeActioProps<T>): void;
}

export type { ActionHandlerType, JudgeActioProps, JudgeActionType };

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
