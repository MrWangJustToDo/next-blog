import { RefObject } from "react";

interface ForWardRefType<T> {
  (props: { forWardRef: RefObject<T> }): JSX.Element;
}

export type { ForWardRefType };

interface SubmitType {
  (props: { enabled: boolean }): JSX.Element;
}

export type { SubmitType };

/* loginCheckcode */

interface LoginCheckCodeType {
  (props: { show: boolean }): JSX.Element;
}

export type { LoginCheckCodeType };

/* input */
interface LoginInputType {
  (props: { setState: (props: boolean) => void }): JSX.Element;
}

export type { LoginInputType };
