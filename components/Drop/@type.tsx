/* index */
interface DropProps<T> {
  data?: Array<{ name?: string; value: T }>;
  className?: string;
  filedName: string;
  placeHolder?: string;
}
interface DropType {
  <T>(props: DropProps<T>): JSX.Element;
}

export type { DropType };

/* dropItem */
interface DropItemProps<T> {
  value: T;
  name?: string;
  index?: number;
  checkedIndex?: number;
  clickHandler?: (item: number) => void;
}
interface DropItemType {
  <T>(props: DropItemProps<T>): JSX.Element;
}

export type { DropItemProps, DropItemType };

/* dropContainer */
interface DropContainerType {
  (props: { length: number; bool: boolean; children: object }): JSX.Element;
}

export type { DropContainerType };
