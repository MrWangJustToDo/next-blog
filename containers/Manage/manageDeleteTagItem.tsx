import { Tag as TagItem } from "components/Tag";
import { getClass } from "utils/class";
import { ManageDeleteTagItemType } from "./@type";

import style from "./index.module.scss";

let ManageDeleteTagItem: ManageDeleteTagItemType;

ManageDeleteTagItem = ({ tagId, tagContent, tagCount }) => {
  return (
    <div className="m-2 position-relative">
      <TagItem hoverAble={false} key={tagId} tagContent={tagContent} tagCount={tagCount} />
      <i className={getClass("position-absolute ri-close-circle-fill", style.closeIcon)} style={{ left: "calc(100% - 6px)", bottom: "calc(100% - 7px)" }} />
    </div>
  );
};

export default ManageDeleteTagItem;
