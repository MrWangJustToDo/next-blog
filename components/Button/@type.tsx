import { AutoRequestType } from "utils/@type";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  value?: string;
  disable?: boolean;
  className?: string;
  initState?: boolean;
  request: () => Promise<void>;
  style?: { [props: string]: string };
}

interface ButtonType {
  (props: ButtonProps): JSX.Element;
}

export type { ButtonType };
