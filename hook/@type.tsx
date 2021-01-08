import { State } from "store";
import { ChangeEvent, RefObject } from "react";
import { AnyAction } from "redux";
import { ToastProps } from "components/Toast/@type";
import { LoadingBarProps } from "components/LoadingBar/@type";
import { ReplayProps } from "components/Replay/@type";
import { ChildMessageProps, PrimaryMessageProps } from "components/BlogMessage/@type";
import { apiName } from "config/api";
import { AutoRequestType } from "utils/@type";

interface BlogContentProps {
  authorId?: string;
  blogId?: string;
  blogState?: number;
  blogOriginState?: number;
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
  avatar?: string;
  typeId?: number;
  typeContent?: string;
  tagId?: number[];
  tagContent?: string[];
  userId?: string;
  username?: string;
  nickname?: string;
  address?: string;
  email?: string;
  gender?: number;
  qq?: string;
}

export type { BlogContentProps };

/* useBase */
interface UseCurrentStateType {
  (): { state: State; dispatch: (props: AnyAction) => void };
}

export type { UseCurrentStateType };

/* useHeader */
interface UseHeaderItemType {
  (appendHandler?: () => void): { currentHeader: string; changeCurrentHeader: (headItem: string) => void };
}

export type { UseHeaderItemType };

/* useHoverItem */
interface UseHoverItemType {
  (init?: boolean): { showState: boolean; show: () => void; hide: () => void };
}

export type { UseHoverItemType };

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
interface UseAutoActionHandlerProps {
  action: () => void;
  actionState?: boolean;
  timmer?: boolean; // 是否使用定时器
  once?: boolean; // 执行一次，for timmer
  delayTime?: number; // 定时器执行时间间隔
  addListener?: (props: () => void) => void; // 事件监听自动执行
  removeListener?: (props: () => void) => void;
  rightNow?: boolean; // 立即执行，for listner
}
interface UseAutoActionHandlerType {
  (props: UseAutoActionHandlerProps): void;
}
interface UseAutoFlushHandlerProps {
  delayTime: number;
  flushAction: <T>() => T;
}
interface UseAutoFlushHandlerType {
  <T>(props: UseAutoFlushHandlerProps): T;
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

export type {
  UseAutoActionHandlerType,
  UseAutoFlushHandlerProps,
  UseAutoFlushHandlerType,
  UseAutoSetHeaderHeightType,
  UseAutoLoadCheckcodeImgProps,
  UseAutoLoadCheckcodeImgType,
};

/* useAnimate */
interface UseShowAndHideAnimateProps {
  state: boolean;
  key?: string;
  showClassName?: string;
  hideClassName?: string;
}
interface UseShowAndHideAnimateType {
  <T extends HTMLElement>(props: UseShowAndHideAnimateProps): { ref: RefObject<T> };
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
interface UseInputType {
  <T extends MyInputELement>(init?: string): [string, (e: ChangeEvent<T>) => void];
}
interface UsePutToCheckcodeModuleProps {
  request: AutoRequestType;
  body: (request: AutoRequestType) => (closeHandler: () => void) => JSX.Element;
  className: string;
}
interface UsePutToCheckcodeModuleType {
  <T extends MyInputELement>(props: UsePutToCheckcodeModuleProps): {
    ref: RefObject<T>;
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
  checkCode: string;
  content: string;
}
interface UseReplayModuleToSubmitType {
  (props: UseReplayModuleToSubmitProps): () => void;
}

export type {
  UseChildMessageType,
  UsePrimaryMessageType,
  UseInputType,
  MyInputELement,
  UsePutToCheckcodeModuleProps,
  UsePutToCheckcodeModuleType,
  UseCheckcodeModuleToSubmitProps,
  UseCheckcodeModuleToSubmitType,
  UseMessageToReplayModuleProps,
  UseMessageToReplayModuleType,
  UseReplayModuleToSubmitProps,
  UseReplayModuleToSubmitType,
};
