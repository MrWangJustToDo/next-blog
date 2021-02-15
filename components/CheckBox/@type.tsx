interface CheckBoxProps {
  init?: boolean;
  type?: "radio" | "checkbox";
  style?: { [props: string]: string };
  className?: string;
  fieldName: string;
}

interface CheckBoxType {
  (props: CheckBoxProps): JSX.Element;
}

export type { CheckBoxType };
