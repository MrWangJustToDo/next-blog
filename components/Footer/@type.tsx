interface Element {
  (): JSX.Element;
}

export type { Element };

/* footContainerContactMe */
interface FootContainerContactMeProps {
  length?: number;
  [props: string]: any;
}

interface FootContainerContactMeType {
  (props: FootContainerContactMeProps): JSX.Element;
}

export type { FootContainerContactMeType };

/* footContainerContentItem */
interface FootContainerProps {
  column?: number;
  head?: string;
  content?: string;
  icon?: string;
  hrefTo?: string;
  title?: string;
  [propo: string]: any;
}

interface FootContainerContentItemType {
  (props: FootContainerProps): JSX.Element;
}

export type { FootContainerContentItemType };

/* footContainerRecommend */
interface FootContainerRecommendProps {
  length?: number;
  [props: string]: any;
}

interface FootContainerRecommendType {
  (props: FootContainerRecommendProps): JSX.Element;
}

export type { FootContainerRecommendType };

/* footContainerYiYan */
interface HitokotoData {
  hitokoto?: string;
  from_who?: string;
  from?: string;
}

interface YiYanComponent {
  ({ hitokoto, from_who, from }: HitokotoData): JSX.Element;
}

export type { YiYanComponent };
