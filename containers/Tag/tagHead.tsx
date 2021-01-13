import useTag from "hook/useTag";
import TagItem from "components/Tag";
import { flexBetween, getClass } from "utils/class";
import { Element } from "./@type";

import style from "./index.module.scss";

let TagHead: Element;

TagHead = () => {
  const { tag, currentTag } = useTag();
  return (
    <div className="card mx-lg-4">
      <h5 className={getClass("card-header text-info user-select-none", flexBetween)}>
        <span className="small">标签</span>
        <div className="text-black-50 small">
          <span>共</span>
          <span className="text-info px-1">{tag.length}</span>
          <span>个</span>
        </div>
      </h5>
      <div className="card-body d-flex">
        {tag.length &&
          tag.map(({ tagId, tagContent, tagCount }) => (
            <div key={tagId} className={getClass("m-2 rounded", currentTag === tagContent ? style.tagActive : "")}>
              <TagItem tagContent={tagContent} tagCount={tagCount} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TagHead;
