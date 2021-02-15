import { AxiosRequestConfig, Method } from "axios";
import { apiName } from "config/api";
import { RefObject } from "react";

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
type ResultProps<T, F> = ApiRequestResult<T> & F;
interface AutoTransformDataType {
  <T, F extends { [props: string]: string }>(data: ResultProps<T, F>): T | T[] | F;
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

export type { ResultProps, AutoTransformDataType, GetCurrentAvatar, FormChild, FormSerializeType };

/* delay */
interface Cancel {
  (key: string): void;
}
interface Delay {
  <T>(time: number, action: () => T, key?: string): Promise<T | void>;
}
interface TimeoutMap {
  [props: string]: Array<NodeJS.Timeout | void>;
}
interface ResolveMap {
  [props: string]: Array<(() => void) | void>;
}
interface KeyMap {
  [props: string]: number;
}

export type { Cancel, Delay, TimeoutMap, ResolveMap, KeyMap };

/* fetcher */
interface RequestProps {
  method?: Method;
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
interface NeedCacheType {
  (path: string | apiName): boolean;
}
interface AutoRequestType {
  run?: <T>(path?: string, query?: QueryProps) => Promise<T>;
  (props?: RequestProps): AutoRequestType;
}

export type { AutoRequestType, ApiRequestResult, NeedCacheType };

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
  <T, F>(element: T | undefined, action: (ele: T) => F, otherAction?: () => F): Promise<void> | F;
}

interface JudgeActioProps<T> {
  element: T;
  judge: boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>);
  successClassName: string;
  successMessage: RefObject<string>;
  failClassName: string;
  failMessage: RefObject<{ current: string }>;
  successCallback?: () => void;
  failCallback?: () => void;
}

interface JudgeActionType {
  <T extends HTMLElement>(props: JudgeActioProps<T>): void;
}

interface LoadingActionProps<T> {
  element: T;
  loadingClassName: string;
}

interface LoadingActionType {
  <T extends HTMLElement>(props: LoadingActionProps<T>): void;
}

export type { ActionHandlerType, JudgeActioProps, JudgeActionType, LoadingActionProps, LoadingActionType };

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

/* request */
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Function;
}

interface RemovePendingType {
  (props: AxiosRequestConfig): void;
}

export type { PendingType, RemovePendingType };
