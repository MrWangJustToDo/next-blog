import { RefObject } from "react";

/* loginPassword */

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
