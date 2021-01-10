import { ChildMessageProps, PrimaryMessageProps } from "components/BlogMessage/@type";
import { BlogContentProps } from "hook/@type";
import { RefObject } from "react";
import { AutoRequestType } from "utils/@type";

interface WithImgRef {
  imgRef: RefObject<HTMLImageElement>;
}

interface BlogContentType {
  (props: BlogContentProps): JSX.Element;
}

export type { BlogContentType };

/* blogContentImg */
interface BlogContentImgType {
  (props: { src: string }): JSX.Element;
}

export type { BlogContentImgType };

/* blogContentMessage */
interface BlogContentMessageType {
  (props: { blogId: string }): JSX.Element;
}

export type { BlogContentMessageType };

/* blogContentPrimaryMessage */
interface BlogContentPrimaryMessageType {
  (props: { messages: PrimaryMessageProps[] }): JSX.Element;
}
interface BlogContentPrimaryMessageWithReplayType {
  (props: { messages: PrimaryMessageProps[]; replay: (props: PrimaryMessageProps) => void }): JSX.Element;
}

export type { BlogContentPrimaryMessageType, BlogContentPrimaryMessageWithReplayType };

/* blogContentChildMessage */
interface BlogContentChildMessageType {
  (props: { messages: ChildMessageProps[] }): JSX.Element;
}
interface BlogContentChildMessageWithReplayType {
  (props: { messages: ChildMessageProps[]; replay: (props: ChildMessageProps) => void }): JSX.Element;
}

export type { BlogContentChildMessageType, BlogContentChildMessageWithReplayType };

/* blogContentCheckcode */
interface BlogContentCheckcodeModuleProps {
  request: AutoRequestType;
  closeHandler: () => void;
}
interface BlogContentCheckcodeModuleType {
  (props: BlogContentCheckcodeModuleProps): JSX.Element;
}
interface BlogContentCheckcodeModuleWithImagType {
  (props: BlogContentCheckcodeModuleProps & WithImgRef): JSX.Element;
}

export type { BlogContentCheckcodeModuleType, BlogContentCheckcodeModuleWithImagType };

/* blogContentMessagePut */
interface BlogContentMessagePutType {
  (props: { blogId: string }): JSX.Element;
}

export type { BlogContentMessagePutType };

/* blogContentReplayModule */

interface BlogContentReplayModuleProps {
  request: AutoRequestType;
  closeHandler: () => void;
}
interface BlogContentReplayModuleType {
  (props: BlogContentReplayModuleProps): JSX.Element;
}
interface BlogContentReplayModuleWithImagType {
  (props: BlogContentReplayModuleProps & WithImgRef): JSX.Element;
}

export type { BlogContentReplayModuleType, BlogContentReplayModuleWithImagType };
