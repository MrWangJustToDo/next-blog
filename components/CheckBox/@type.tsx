interface CheckBoxProps {
  className?: string;
  style?: { [props: string]: string };
  fieldName: string;
  init?: boolean;
}

interface CheckBoxType {
  (props: CheckBoxProps): JSX.Element;
}

export type { CheckBoxType };
