import { BlogContentProps } from "hook/@type";

/* archiveContent */
interface ArchiveContentType {
  (props: { year: string; blogProps: BlogContentProps[] }): JSX.Element;
}

export type { ArchiveContentType };
