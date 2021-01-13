import { State } from "store";
import { RefObject } from "react";
import { AnyAction } from "redux";
import { apiName } from "config/api";
import { AutoRequestType } from "utils/@type";
import { ToastProps } from "components/Toast/@type";
import { ReplayProps } from "components/Replay/@type";
import { LoadingBarProps } from "components/LoadingBar/@type";
import { ChildMessageProps, PrimaryMessageProps } from "components/BlogMessage/@type";

interface BlogContentProps {
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
  (): { currentHeader: string; changeCurrentHeader: (headItem: string) => void };
}

export type { UseHeaderItemType };

/* useBool */
interface UseBoolResult {
  bool: boolean;
  switchBool: () => void;
  switchBoolThrottle: () => void;
  switchBoolThrottleState: () => void;
  show: () => void;
  showThrottle: () => void;
  showThrottleState: () => void;
  hide: () => void;
  hideDebounce: () => void;
  hideDebounceState: () => void;
}
interface UseBoolType {
  (init?: boolean): UseBoolResult;
}

export type { UseBoolType };

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
  actionState?: boolean; // 当前需要执行的状态，在事件监听回调中用于判断是否还需要绑定监听，在定时器中用于判断本次action是否需要执行
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

export type { UseAutoActionHandlerType, UseAutoSetHeaderHeightType, UseAutoLoadCheckcodeImgProps, UseAutoLoadCheckcodeImgType, UseAutoShowAndHideType };

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
