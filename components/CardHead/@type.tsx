interface CardHeadProps {
  icon: string;
  content: string;
  hrefTo: string;
}

interface CardHeadType {
  (props: CardHeadProps): JSX.Element;
}

export type { CardHeadType };
