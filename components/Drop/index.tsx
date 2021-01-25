import { useState } from "react";
import { useBool } from "hook/useBool";
import { flexCenter, getClass } from "utils/class";
import DropItem from "./dropItem";
import DropContainer from "./dropContainer";
import { DropType } from "./@type";

import style from "./index.module.scss";

let Drop: DropType;

Drop = <T extends {}>({ data = [], className = "", placeHolder = "请选择", filedName }) => {
  const [index, setIndex] = useState<number>(-1);
  const { bool, switchBoolThrottleState } = useBool();
  return (
    <div onClick={switchBoolThrottleState} className={getClass("position-relative text-info border user-select-none", flexCenter, style.drop, className)}>
      <input name={filedName} type="text" style={{ display: "none" }} value={index > -1 && data[index].value} readOnly />
      <div className="mr-2">{index > -1 ? (data[index].name ? data[index].name : data[index].value) : placeHolder}</div>
      <i className="ri-arrow-down-s-fill position-absolute" style={{ right: "12px" }} />
      <DropContainer bool={bool} length={data.length}>
        {data.map(({ name, value }, idx) => (
          <DropItem<T> key={value} value={value} name={name} clickHandler={setIndex} checkedIndex={index} index={idx} />
        ))}
      </DropContainer>
    </div>
  );
};

export default Drop;
