import useType from "hook/useType";
import { useCallback } from "react";
import { getClass } from "utils/class";
import { TypeType } from "./@type";

let Type: TypeType;

let WithChangeType: TypeType;

Type = ({ typeCount, typeContent, className = "" }) => {
  return (
    <div className={getClass("btn btn-outline-info shadow-none btn-sm m-1", className)}>
      <span className="mr-2">{typeContent}</span>
      <span className="badge badge-info badge-pill">{typeCount}</span>
    </div>
  );
};

WithChangeType = ({ typeCount, typeContent, className }) => {
  const { changeCurrentType } = useType();
  const changeType = useCallback(() => changeCurrentType(typeContent), []);
  return (
    <div onClick={changeType}>
      <Type {...{ typeContent, typeCount, className }} />
    </div>
  );
};

export { Type, WithChangeType };
