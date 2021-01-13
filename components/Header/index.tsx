import { getClass } from "utils/class";
import { useBool } from "hook/useBool";
import HeadContainerList from "./headContainerList";
import HeadContainerButton from "./headContainerButton";


import style from "./index.module.scss";

const Header: () => JSX.Element = () => {
  const { bool, switchBoolThrottle } = useBool(false);
  return (
    <nav className={getClass(style.navShadow, "navbar navbar-expand-lg navbar-dark bg-dark py-lg-4")}>
      <div className="container-xl user-select-none">
        <div className="navbar-brand text-info font-weight-bold">Blog</div>
        <HeadContainerButton handler={switchBoolThrottle} />
        <HeadContainerList show={bool} />
      </div>
    </nav>
  );
};

export default Header;
