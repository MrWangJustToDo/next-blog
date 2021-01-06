interface PrimaryMessageProps {
  blogId: string;
  commentId: number;
  userId?: string;
  ip: string;
  content: string;
  createDate: string;
  modifyState: number;
  modifyDate: string;
  childIds: string;
  childCount: number;

  // 用户相关
  avatar?: string;
  username?: string;
  address?: string;
  email?: string;
  gender?: number;
  qq?: string;
  children: JSX.Element;

  withReplay?: boolean;
  withChildren?: boolean;

  replayHandler: (props: PrimaryMessageProps) => void;
}

interface PrimaryMessageType {
  (props: PrimaryMessageProps): JSX.Element;
}

interface ChildMessageProps {
  primaryCommentId: number;
  commentId: number;
  fromIp: string;
  fromUserId: string;
  toIp: string;
  toUserId: string;
  content: string;
  createDate: string;
  modifyState: number;
  modifyDate: string;

  // 用户相关
  avatar?: string;
  username?: string;
  address?: string;
  email?: string;
  gender?: number;
  qq?: string;
  toUserName?: string;
  children: JSX.Element;

  withReplay?: boolean;
  withChildren?: boolean;

  replayHandler: (props: ChildMessageProps) => void;
}

interface ChildMessageType {
  (props: ChildMessageProps): JSX.Element;
}

export type { PrimaryMessageType, ChildMessageType, PrimaryMessageProps, ChildMessageProps };
