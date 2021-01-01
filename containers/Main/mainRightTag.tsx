import MainRightHead from "components/CardHead";
import MainRightTagItem from "./mainRightTagItem";
import { mainRightHeader } from "config/hoom";
import { apiName } from "config/api";
import { getApiPath } from "utils/path";
import LoadRender from "components/LoadRender";
import useTag from "hook/useTag";
import { MainRightTagType } from "./@type";

let MainRightTag: MainRightTagType;

MainRightTag = ({ index }) => {
  const { icon, content, hrefTo } = mainRightHeader[index];
  const { tag, changeCurrentTag } = useTag();
  return (
    <div className="card mt-4">
      <MainRightHead icon={icon} content={content} hrefTo={hrefTo} />
      <div className="card-body">
        <LoadRender
          path={getApiPath(apiName.tag)}
          initialData={tag}
          loaded={(data) =>
            data.map(({ tagId, tagContent, tagCount }) => (
              <MainRightTagItem key={tagId} tagName={tagContent} tagCount={tagCount} changeCurrentTag={changeCurrentTag} />
            ))
          }
        />
      </div>
    </div>
  );
};

export default MainRightTag;