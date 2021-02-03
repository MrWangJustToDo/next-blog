import { useBool } from "hook/useData";
import { getClass } from "utils/class";
import { CheckBoxType } from "./@type";

import styleCss from "./index.module.scss";

let CheckBox: CheckBoxType;

CheckBox = ({ fieldName, className = "", style }) => {
  const { bool, switchBoolState } = useBool();
  return (
    <div className={getClass(className)} style={style}>
      <div className={getClass(styleCss.checkbox, bool ? styleCss.checked : "")} onClick={switchBoolState} />
      <input name={fieldName} type="checkbox" style={{ display: "none" }} checked={bool} readOnly />
    </div>
  );
};

export default CheckBox;
