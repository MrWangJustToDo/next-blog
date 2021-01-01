import { State } from "store";
import { RefObject } from "react";
import { AnyAction } from "redux";
import { ToastProps } from "components/Toast/@type";
import { LoadingBarProps } from "components/LoadingBar/@type";

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

/* useState */
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
  (init: ToastProps[]): { state: ToastProps[]; push: UseToastPushType };
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
  once?: boolean; // 总会执行一次，有listener时无效
  delayTime?: number; // 定时器自动执行
  addListener?: (props: () => void) => void; // 事件监听自动执行
  removeListener?: (props: () => void) => void;
}
interface UseAutoActionHandlerType {
  (props: UseAutoActionHandlerProps): void;
}

interface UseAutoFlushHandlerProps {
  delayTime: number;
  flushAction: () => void;
}
interface UseAutoFlushHandlerType {
  <T>(props: UseAutoFlushHandlerProps): T;
}

interface UseAutoSetHeaderHeightType {
  <T extends HTMLElement>(breakPoint?: number): { ref: RefObject<T>; height: number };
}

export type { UseAutoActionHandlerType, UseAutoFlushHandlerType, UseAutoSetHeaderHeightType };

/* useAnimate */
interface UseShowAndHideAnimateProps {
  key: string;
  state: boolean;
  showClassName?: string;
  hideClassName?: string;
}
interface UseShowAndHideAnimateType {
  <T extends HTMLElement>(props: UseShowAndHideAnimateProps): { ref: RefObject<T> };
}

export type { UseShowAndHideAnimateType };
