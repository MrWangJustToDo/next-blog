import { useHome } from "hook/useHome";
import { flexBetween, getClass } from "utils/class";
import { Element } from "./@type";

let MainLeftHead: Element;

MainLeftHead = () => {
  let { allPage } = useHome();
  return (
    <h5 className={getClass("card-header bg-transparent text-info", flexBetween)}>
      <span>博客</span>
      <div className="text-black-50">
        共<span className="text-info px-1">{allPage}</span>页
      </div>
    </h5>
  );
};

export default MainLeftHead;
