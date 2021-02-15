import { useJudgeInput } from "hook/useManage";
import { useEffect } from "react";
import { getClass } from "utils/class";
import { InputEleType } from "./@type";

import style from "./index.module.scss";

let Input: InputEleType;

Input = ({
  type,
  name,
  option,
  placeHolder,
  changeState,
  judgeApiName,
  outerClassName = "",
  innerClassName = "",
  failClassName,
  successCalsssName,
  loadingClassName,
}) => {
  const [ref, bool] = useJudgeInput({
    option,
    judgeApiName,
    successClassName: successCalsssName || style.success,
    failClassName: failClassName || style.fail,
    loadingClassName: loadingClassName || getClass("spinner-border spinner-border-sm text-info", style.loading),
  });
  useEffect(() => {
    if (changeState) {
      changeState(bool);
    }
  }, [changeState, bool]);
  return (
    <div className={getClass("position-relative", outerClassName)}>
      <input ref={ref} className={getClass("form-control", innerClassName)} name={name} type={type || "text"} placeholder={placeHolder} />
    </div>
  );
};

export default Input;
