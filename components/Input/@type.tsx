import { InputProps } from "config/@type";
import { apiName } from "config/api";

interface InputEleProps {
  type?: string;
  name?: string;
  option: InputProps;
  changeState?: (props: boolean) => void;
  placeHolder?: string;
  judgeApiName?: apiName;
  outerClassName?: string;
  innerClassName?: string;
  failClassName?: string;
  loadingClassName?: string;
  successCalsssName?: string;
}

interface InputEleType {
  (props: InputEleProps): JSX.Element;
}

export type { InputEleType };
