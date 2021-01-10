/* headContainerButton */
interface HeadContainerTagNavBtnType {
  (props: { handler: () => void }): JSX.Element;
}

export type { HeadContainerTagNavBtnType };

/* headContainerItem */
interface HeadContainerProps {
  value?: string;
  icon?: string;
  hrefTo?: string;
}

interface HeadContainerItemType {
  (props: HeadContainerProps): JSX.Element;
}

export type { HeadContainerItemType };

/* headContainerList */
interface HeadContainerListType {
  (props: { show: boolean }): JSX.Element;
}

export type { HeadContainerListType };
