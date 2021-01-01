import { mainRight } from "config/hoom";

interface Element {
  (): JSX.Element;
}

export type { Element };

/* mainRightCommend */
interface MainRightCommendType {
  (props: { index: mainRight }): JSX.Element;
}

export type { MainRightCommendType };

/* mainRightCommendItem */
interface MainRightCommendItemType {
  (props: { blogId: string; blogTitle: string }): JSX.Element;
}

export type { MainRightCommendItemType };

/* mainRightTag */
interface MainRightTagType {
  (props: { index: mainRight }): JSX.Element;
}

export type { MainRightTagType };

/* mainRightTagItem */
interface MainRightTagItemType {
  (props: { tagName: string; tagCount: number; changeCurrentTag: (props: string) => void }): JSX.Element;
}

export type { MainRightTagItemType };

/* mainRightType */

interface MainRightTypeType {
  (props: { index: mainRight }): JSX.Element;
}

export type { MainRightTypeType };

/* mainRightTypeItem */
interface MainRightTypeItemType {
  (props: { typeName: string; typeCount: number; changeCurrentType: (props: string) => void }): JSX.Element;
}

export type { MainRightTypeItemType };
