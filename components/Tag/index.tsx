import useTag from "hook/useTag";
import { useCallback } from "react";
import { flexCenter, getClass } from "utils/class";
import { TagType } from "./@type";

import style from "./index.module.scss";

let Tag: TagType;

Tag = ({ tagContent, tagCount, className = "" }) => {
  const { changeCurrentTag } = useTag();
  const changeTag = useCallback(() => changeCurrentTag(tagContent), [changeCurrentTag]);
  return (
    <div
      title={tagContent}
      className={getClass(flexCenter, style.tagItem, "border rounded user-select-none", className)}
      onClick={changeTag}
    >
      <div className={getClass("bg-info", flexCenter, style.tagItem__left)}>
        <i className="ri-price-tag-line pl-1" />
        <span className="ml-2">{tagContent}</span>
      </div>
      <span className={getClass("ml-2 pr-1", style.tagItem__right)}>{tagCount}</span>
    </div>
  );
};

export default Tag;
