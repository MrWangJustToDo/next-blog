interface BlogMessageProps {
  blogId: string;
  commentId: number;
  userId: string;
  ip: string;
  content: string;
  createDate: string;
  modifyState: number;
  modifyDate: string;
  childCount: number;
}

interface BlogContentPrimary {
  (props: BlogMessageProps): JSX.Element;
}

interface MessageBodyType {
  (props: { content: string, className: string }): JSX.Element;
}

export type { BlogContentPrimary, MessageBodyType };
