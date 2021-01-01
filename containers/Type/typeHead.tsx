import useType from "hook/useType";
import TypeHeadItem from "./typeHeadItem";
import { flexBetween, getClass } from "utils/class";
import { Element } from "./@type";

let TypeHead: Element;

TypeHead = () => {
  const { type } = useType();
  return (
    <div className="card mx-4">
      <h5 className={getClass("card-header text-info user-select-none", flexBetween)}>
        <span className="small">分类</span>
        <div className="text-black-50 small">
          <span>共</span>
          <span className="text-info px-1">{type.length}</span>
          <span>个</span>
        </div>
      </h5>
      <div className="card-body">
        {type.length &&
          type.map(({ typeId, typeContent, typeCount }) => <TypeHeadItem key={typeId} typeContent={typeContent} typeCount={typeCount} />)}
      </div>
    </div>
  );
};

export default TypeHead;
