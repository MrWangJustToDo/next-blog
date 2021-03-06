import { getClass, flexCenter } from "utils/class";
import FootContainerYiYan from "./footContainerYiYan";
import FootContainerCardMe from "./footContainerCardMe";
import FootContainerRecommend from "./footContainerRecommend";
import FootContainerConnectionMe from "./footContainerContactMe";
import { SimpleElement } from "containers/Main/@type";

import style from "./index.module.scss";

let Footer: SimpleElement;

Footer = () => {
  return (
    <footer className={getClass(style.footFont, "bg-dark text-center user-select-none")}>
      <div className="container-md">
        <div className="row py-2 py-lg-4">
          <FootContainerCardMe />
          <FootContainerConnectionMe />
          <FootContainerRecommend />
          <FootContainerYiYan />
        </div>
      </div>
      <div className="container-md">
        <div className={getClass("border-top border-secondary text-secondary text-monospace py-2 py-lg-4", flexCenter)}>
          <div>Copyright</div>
          <i className="ri-copyright-fill mx-2"></i>
          <div>2020-2021 MrWang</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
