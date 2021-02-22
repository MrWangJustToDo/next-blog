import { RefObject } from "react";

/* publishEditor */
interface PublishEditorType {
  (props: { id: string }): JSX.Element;
}

export type { PublishEditorType };

/* publishImageModule */
interface PublishImageModuleProps {
  closeHandler: () => void;
  appendHandler: (url: string) => void;
}

interface PublishImageModuleType {
  (props: PublishImageModuleProps): JSX.Element;
}

export type { PublishImageModuleType };

/* publishTag */
interface TagProps {
  tagId?: string;
  tagState?: number;
  tagCount?: number;
  tagContent?: string;
}

export type { TagProps };
