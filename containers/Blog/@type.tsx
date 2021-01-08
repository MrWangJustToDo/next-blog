import { ChildMessageProps, PrimaryMessageProps } from "components/BlogMessage/@type";
import { BlogContentProps } from "hook/@type";
import { AutoRequestType } from "utils/@type";

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

export type { BlogContentPrimaryMessageType };

/* blogContentChildMessage */
interface BlogContentChildMessageType {
  (props: { messages: ChildMessageProps[] }): JSX.Element;
}

export type { BlogContentChildMessageType };

/* blogContentCheckcode */
interface BlogContentCheckcodeModuleType {
  (props: { request: AutoRequestType; closeHandler: () => void }): JSX.Element;
}

export type { BlogContentCheckcodeModuleType };

/* blogContentMessagePut */
interface BlogContentMessagePutType {
  (props: { blogId: string }): JSX.Element;
}

export type { BlogContentMessagePutType };

/* blogContentMessageReplayModule */
interface BlogContentMessageReplayModuleProps {
  request: AutoRequestType;
  closeHandler: () => void;
}
interface BlogContentMessageReplayModuleType {
  (props: BlogContentMessageReplayModuleProps): JSX.Element;
}

export type { BlogContentMessageReplayModuleType };
