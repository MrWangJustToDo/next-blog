/* index */
interface TagType {
  (props: { tagContent: string; tagCount: number; className?: string; hoverAble?: boolean }): JSX.Element;
}

export type { TagType };
