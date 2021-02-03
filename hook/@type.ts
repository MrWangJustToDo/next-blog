import { State } from "store";
import { RefObject } from "react";
import { AnyAction } from "redux";
import { apiName } from "config/api";
import { LoginProps } from "config/@type";
import { AutoRequestType } from "utils/@type";
import { ToastProps } from "components/Toast/@type";
import { ReplayProps } from "components/Replay/@type";
import { LoadingBarProps } from "components/LoadingBar/@type";
import { ChildMessageProps, PrimaryMessageProps } from "components/BlogMessage/@type";

interface UserProps {
  ip?: string;
  userId?: string;
  username?: string;
  password?: string;
  nickname?: string;
  address?: string;
  email?: string;
  gender?: number;
  avatar?: string;
  qq?: string;
}

interface TypeProps {
  typeId?: number;
  typeCount?: number;
  typeContent?: string;
}

interface TagProps {
  tagId?: number[];
  tagCount?: number;
  tagContent?: string[];
}

interface BlogProps {
  authorId?: string;
  blogId?: string;
  blogState?: number;
  blogOriginState?: number;
  blogCreateYear?: string;
  blogCreateDate?: string;
  blogModifyState?: number;
  blogModifyDate?: string;
  blogAssentCount?: number;
  blogCollectCount?: number;
  blogReadCount?: number;
  blogImgLink?: string;
  blogPreview?: string;
  blogContent?: string;
  blogTitle?: string;
  blogPriseState?: number;
  blogCommentState?: number;
}

type BlogContentProps = UserProps & BlogProps & TypeProps & TagProps;

export type { UserProps, TypeProps, TagProps, BlogProps, BlogContentProps };

/* useBase */
interface UseCurrentStateType {
  (): { state: State; dispatch: (props: AnyAction) => void };
}

export type { UseCurrentStateType };

/* useHeader */
interface UseHeaderItemType {
  (): { currentHeader: string; changeCurrentHeader: (headItem: string) => void };
}

export type { UseHeaderItemType };

/* useData */
interface UseBoolResult {
  bool: boolean;
  switchBool: () => void;
  switchBoolThrottle: () => void;
  switchBoolState: () => void;
  show: () => void;
  showThrottle: () => void;
  showState: () => void;
  hide: () => void;
  hideDebounce: () => void;
  hideDebounceState: () => void;
  hideDebounceNoState: () => void;
}
interface UseBoolType {
  (props?: { init?: boolean; stateChangeTimeStep?: number }): UseBoolResult;
}
interface UseArrayType {
  <T>(init: T[]): [T[], (val: T) => void, (val: T) => void, (val: T) => void, (val: T) => void];
}

export type { UseBoolType, UseArrayType };

/* useLoadingBar */
interface UseLoadReturn {
  start: () => void;
  end: () => void;
  state: LoadingBarProps;
  autoAdd: () => NodeJS.Timeout;
}
interface UseLoadType {
  (props: LoadingBarProps): UseLoadReturn;
}

export type { UseLoadType };

/* useHome */
interface UseHomeType {
  (): {
    blogs: Array<BlogContentProps>;
    allPage: number;
    currentPage: number;
    currentPageBlogs: Array<BlogContentProps>;
    increaseAble: boolean;
    decreaseAble: boolean;
    increasePage: () => void;
    decreasePage: () => void;
  };
}
interface UseCommendType {
  (): { commendBlogs: BlogContentProps[] };
}

export type { UseHomeType, UseCommendType };

/* useType */
interface Type {
  typeId: number;
  typeContent: string;
  typeCount: number;
}
interface UseTypeResult {
  type: Type[];
  currentType: string;
  changeCurrentType: (nextTag: string) => void;
  allPage: number;
  currentPage: number;
  currentPageBlogs: BlogContentProps[];
  increaseAble: boolean;
  decreaseAble: boolean;
  increasePage: () => void;
  decreasePage: () => void;
}
interface UseTypeType {
  (blogs?: BlogContentProps[]): UseTypeResult;
}

export type { UseTypeType };

/* useTag */
interface Tag {
  tagId: number;
  tagContent: string;
  tagCount: number;
}
interface UseTagResult {
  tag: Tag[];
  currentTag: string;
  changeCurrentTag: (nextTag: string) => void;
  allPage: number;
  currentPage: number;
  currentPageBlogs: BlogContentProps[];
  increaseAble: boolean;
  decreaseAble: boolean;
  increasePage: () => void;
  decreasePage: () => void;
}
interface UseTagType {
  (blogs?: BlogContentProps[]): UseTagResult;
}

export type { UseTagType };

/* useToast */
interface UseToastPushType {
  (props: ToastProps): void;
}
interface UseToastPropsType {
  (init: ToastProps[]): { toast: ToastProps[]; push: UseToastPushType };
}
interface UseContentToastType {
  (): (content: string) => void;
}

export type { UseToastPropsType, UseToastPushType, UseContentToastType };

/* useAuto */
interface UseAutoActionHandlerProps<T> {
  action: (e?: T) => void;
  actionState?: boolean; // 当前需要执行的状态，在事件监听回调中用于判断是否还需要绑定监听，在定时器中用于判断本次action是否需要执行
  timmer?: boolean; // 是否使用定时器
  once?: boolean; // 执行一次，for timmer
  delayTime?: number; // 定时器执行时间间隔
  rightNow?: boolean; // 立即执行，for listner
  addListener?: (props: (e?: T) => void) => void; // 添加事件监听
  removeListener?: (props: (e?: T) => void) => void; // 移除事件监听
}
interface UseAutoActionHandlerType {
  <T extends Event>(props: UseAutoActionHandlerProps<T>, ...deps: any[]): void;
}
interface UseAutoSetHeaderHeightType {
  <T extends HTMLElement>(breakPoint?: number): { ref: RefObject<T>; height: number };
}
interface UseAutoLoadCheckcodeImgProps {
  imgUrl: apiName;
  strUrl: apiName;
}
interface UseAutoLoadCheckcodeImgType {
  <T extends HTMLImageElement>(props: UseAutoLoadCheckcodeImgProps): RefObject<T>;
}
interface UseAutoShowAndHideType {
  <T extends HTMLElement>(breakPoint: number): RefObject<T>;
}
interface UseAutoSetHeightProps {
  maxHeight?: number;
  deps?: any[];
}
interface UseAutoSetHeightType {
  <T extends HTMLElement>(props: UseAutoSetHeightProps): [RefObject<T>, number];
}

export type {
  UseAutoActionHandlerProps,
  UseAutoActionHandlerType,
  UseAutoSetHeaderHeightType,
  UseAutoLoadCheckcodeImgProps,
  UseAutoLoadCheckcodeImgType,
  UseAutoShowAndHideType,
  UseAutoSetHeightProps,
  UseAutoSetHeightType,
};

/* useAnimate */
interface UseShowAndHideAnimateProps<T> {
  state: boolean;
  key?: string;
  ref?: RefObject<T>;
  showClassName?: string;
  hideClassName?: string;
}
interface UseShowAndHideAnimateType {
  <T extends HTMLElement>(props: UseShowAndHideAnimateProps<T>): { ref: RefObject<T> };
}

export type { UseShowAndHideAnimateProps, UseShowAndHideAnimateType };

/* useReplay */
interface UseReplayOpenType {
  (props: ReplayProps): void;
}
interface UseReplayPropsType {
  (): { replay: ReplayProps; open: UseReplayOpenType };
}

export type { UseReplayOpenType, UseReplayPropsType };

/* useMessage */
interface UseChildMessageType {
  (props: ChildMessageProps[]): { messageProps: ChildMessageProps[]; more: boolean; loadMore: () => void };
}
interface UsePrimaryMessageResult {
  currentPage: number;
  increasePage: () => void;
  decreasePage: () => void;
  increaseAble: boolean;
  decreaseAble: boolean;
  currentMessage: PrimaryMessageProps[];
}
interface UsePrimaryMessageType {
  (props: PrimaryMessageProps[]): UsePrimaryMessageResult;
}
type MyInputELement = HTMLInputElement | HTMLTextAreaElement;
interface UseJudgeInputValueType {
  <T extends MyInputELement>(ref: RefObject<T>): boolean;
}
interface UsePutToCheckcodeModuleProps {
  request: AutoRequestType;
  body: (request: AutoRequestType) => (closeHandler: () => void) => JSX.Element;
  className: string;
}
interface UsePutToCheckcodeModuleType {
  <T extends MyInputELement>(props: UsePutToCheckcodeModuleProps): {
    ref: RefObject<T>;
    canSubmit: boolean;
    submit: () => void;
  };
}
interface UseCheckcodeModuleToSubmitProps {
  request: AutoRequestType;
  closeHandler: () => void;
}
interface UseCheckcodeModuleToSubmitType {
  <T extends MyInputELement>(props: UseCheckcodeModuleToSubmitProps): {
    ref: RefObject<T>;
    canSubmit: boolean;
    submit: () => void;
  };
}
interface UseMessageToReplayModuleProps<T> {
  request: AutoRequestType;
  body: (request: AutoRequestType) => (props: T) => (closeHandler: () => void) => JSX.Element;
  className: string;
}
interface UseMessageToReplayModuleType {
  <T>(props: UseMessageToReplayModuleProps<T>): (props: T) => void;
}
interface UseReplayModuleToSubmitProps {
  request: AutoRequestType;
  closeHandler: () => void;
}
interface UseReplayModuleToSubmitType {
  <T extends MyInputELement, F extends MyInputELement>(props: UseReplayModuleToSubmitProps): {
    input1: RefObject<T>;
    input2: RefObject<F>;
    submit: () => void;
    canSubmit: boolean;
  };
}

export type {
  UseChildMessageType,
  UsePrimaryMessageType,
  MyInputELement,
  UseJudgeInputValueType,
  UsePutToCheckcodeModuleProps,
  UsePutToCheckcodeModuleType,
  UseCheckcodeModuleToSubmitProps,
  UseCheckcodeModuleToSubmitType,
  UseMessageToReplayModuleProps,
  UseMessageToReplayModuleType,
  UseReplayModuleToSubmitProps,
  UseReplayModuleToSubmitType,
};

/* useArchive */
interface ArchiveProps {
  (year: string): BlogContentProps[];
}
interface UseArchiveType {
  (): { value: ArchiveProps | {}; canLoad: boolean; loadMore: () => void; allCount: number };
}
interface UseAutoLoadArchiveType {
  (props: { canLoad: boolean; loadMore: () => void; breakPoint: number }): void;
}

export type { ArchiveProps, UseArchiveType, UseAutoLoadArchiveType };

/* useBlog */
interface UseBlogMenuType {
  (className: string): boolean;
}
interface UseAutoScrollType {
  <T extends HTMLElement>(): RefObject<T>;
}
interface UseLinkToImgType {
  <T extends HTMLElement>(): RefObject<T>;
}
interface UseEditorType {
  (id: string): void;
}
interface UsePublishProps {
  id: string;
  request: AutoRequestType;
}
interface UsePublishType {
  (props: UsePublishProps): [RefObject<HTMLFormElement>, () => void];
}

export type { UseBlogMenuType, UseAutoScrollType, UseLinkToImgType, UseEditorType, UsePublishProps, UsePublishType };

/* useUser */
interface UseAutoLoginType {
  (): void;
}
interface UseCurrentUserType {
  (): UserProps;
}
interface UseLoginInputProps {
  option: LoginProps;
  successClassname: string;
  failClassname: string;
}
interface UseLoginInputType {
  <T extends HTMLInputElement>(props: UseLoginInputProps): [RefObject<T>, boolean];
}
interface UseLoginType {
  (): RefObject<HTMLFormElement>;
}
interface UseLogoutType {
  (): () => void;
}

export type { UseAutoLoginType, UseCurrentUserType, UseLoginInputProps, UseLoginInputType, UseLoginType, UseLogoutType };
