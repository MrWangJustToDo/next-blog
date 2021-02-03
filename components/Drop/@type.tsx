/* index */
type ValueType = string | number;

interface DropProps<T> {
  data?: Array<{ name?: string; value: T }>;
  multiple?: boolean;
  className?: string;
  fieldName: string;
  placeHolder?: string;
  maxHeight?: number;
  style?: { [props: string]: string };
}
interface DropType {
  <T extends ValueType>(props: DropProps<T>): JSX.Element;
}

export type { DropType, DropProps, ValueType };

/* dropItem */
interface DropItemProps<T> {
  value: T;
  name?: string;
  index?: number;
  checkedIndex?: number[];
  clickHandler?: (number) => void;
}
interface DropItemType {
  <T extends ValueType>(props: DropItemProps<T>): JSX.Element;
}

export type { DropItemProps, DropItemType };

/* dropContainer */
interface DropContainerType {
  (props: { length: number; bool: boolean; children: object; maxHeight?: number }): JSX.Element;
}

export type { DropContainerType };

/* dropSelectItem */
interface DropSelectItemProps<T> {
  idx: number;
  name?: string;
  multiple?: boolean;
  value: T;
  cacel: (number) => void;
}
interface DropSelectItemType {
  <T>(props: DropSelectItemProps<T>): JSX.Element;
}

export type { DropSelectItemType };
