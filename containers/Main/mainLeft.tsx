import MainLeftHead from "./mainLeftHead";
import MainLeftFoot from "./mainLeftFoot";
import MainLeftContent from "./mainLeftContent";
import { Element } from "./@type";

let MainLeft: Element;

MainLeft = () => {
  return (
    <div className="col-md-8 user-select-none">
      <div className="card">
        <MainLeftHead />
        <MainLeftContent />
        <MainLeftFoot />
      </div>
    </div>
  );
};

export default MainLeft;
