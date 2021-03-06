import { useCallback } from "react";
import Link from "next/link";
import { Tag } from "components/Tag";
import { MainRightTagItemType } from "./@type";

let MainRightTagItem: MainRightTagItemType;

MainRightTagItem = ({ tagName, tagCount, changeCurrentTag }) => {
  const clickHandler = useCallback(() => changeCurrentTag(tagName), [tagName]);
  return (
    <Link href="/tag">
      <a className="text-reset d-inline-block text-decoration-none" onClick={clickHandler}>
        <Tag className="small" tagContent={tagName} tagCount={tagCount} />
      </a>
    </Link>
  );
};

export default MainRightTagItem;
