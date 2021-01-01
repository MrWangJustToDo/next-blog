import { useCallback, useState } from "react";
import { getClass } from "utils/class";
import HeadContainerList from "./headContainerList";
import HeadContainerButton from "./headContainerButton";

import style from "./index.module.scss";

const Header: () => JSX.Element = () => {
  const [state, setState] = useState(false);
  const hide = useCallback(() => setState(false), []);
  const tagState = useCallback(() => setState((last) => !last), []);
  return (
    <nav className={getClass(style.navShadow, "navbar navbar-expand-lg navbar-dark bg-dark py-lg-4")}>
      <div className="container-xl user-select-none">
        <div className="navbar-brand text-info font-weight-bold">Blog</div>
        <HeadContainerButton handler={tagState} />
        <HeadContainerList show={state} hide={hide} />
      </div>
    </nav>
  );
};

export default Header;
