import Image from "next/image";
import { getClass } from "utils/class";
import { BlogItemRightType } from "./@type";

import style from "./index.module.scss";

let BlogItemRight: BlogItemRightType;

BlogItemRight = ({ src }) => {
  return (
    <div className={getClass("col-lg-4 mb-4 my-lg-0")}>
      <div className={getClass(style.imgHover, "rounded overflow-hidden")}>
        <Image src={src} width="80%" height="50%" layout="responsive" alt="blog picture" />
      </div>
    </div>
  );
};

export default BlogItemRight;
