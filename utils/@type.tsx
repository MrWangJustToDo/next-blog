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
type data = { code: number; state: string; data: object | object[] } | any;

interface AutoTransformDataType {
  (props: data): any;
}

interface AutoTransformImageType {
  (avatar: string, gender: number): string;
}

export type { AutoTransformDataType, AutoTransformImageType };

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
interface Request {
  method?: string;
  path?: string | apiName;
  query?: object;
  token?: boolean | string;
  data?: object;
}

interface AutoRequestType {
  (props: Request): (path: string, token?: any) => Promise<object>;
}

interface AutoRequestExType {
  (props?: Request): Promise<object> | AutoRequestExType;
}

export type { AutoRequestType, AutoRequestExType };

/* path */
interface TransformStringUrl {
  (path: string, query?: object): string;
}
interface TransformObjectUrl {
  (props: { path: string; query?: object }): string;
}
interface GetApiPathType {
  (props: apiName): string;
}
interface GetRelativeApiPathType {
  (name: apiName, query?: object): string;
}

export type { TransformStringUrl, TransformObjectUrl, GetApiPathType, GetRelativeApiPathType };

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
  <T extends HTMLElement>(element: T | undefined, action: (ele: T) => void | any): void | any;
}

export type { ActionHandlerType };

/* image */
interface LoadImgType {
  (imgUrl: apiName, strUrl: apiName, imgElement: HTMLImageElement): Promise<HTMLImageElement | void>;
}

export type { LoadImgType };
