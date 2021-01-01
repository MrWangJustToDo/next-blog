/* index */
interface FootPageProps {
  page: number;
  increaseAble: boolean;
  decreaseAble: boolean;
  increasePage: () => void;
  decreasePage: () => void;
  className?: string;
}
interface FootPageType {
  (props: FootPageProps): JSX.Element;
}

export type { FootPageType };
