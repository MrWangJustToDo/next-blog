import { toastState } from "config/toast";

interface ToastProps {
  title: string;
  content: string | JSX.Element;
  contentState?: toastState;
  currentTime?: Date;
  showState?: boolean;
  closeHandler?: () => void;
  autoCloseSecond?: number;
}

interface ToastType {
  (props: ToastProps): JSX.Element;
}

export type { ToastProps, ToastType };
