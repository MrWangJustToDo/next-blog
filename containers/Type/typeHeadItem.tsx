import useType from "hook/useType";
import { useCallback } from "react";
import { getClass } from "utils/class";
import { TypeHeadItemType } from "./@type";

let TypeHeadItem: TypeHeadItemType;

TypeHeadItem = ({ typeContent, typeCount }) => {
  const { currentType, changeCurrentType } = useType();
  const changeType = useCallback(() => changeCurrentType(typeContent), [typeContent]);
  return (
    <button className={getClass("btn btn-outline-info shadow-none btn-sm m-1", currentType === typeContent ? "active" : "")}>
      <span onClick={changeType}>{typeContent}</span>
      <span className="ml-3 align-middle small">{typeCount}</span>
    </button>
  );
};

export default TypeHeadItem;
