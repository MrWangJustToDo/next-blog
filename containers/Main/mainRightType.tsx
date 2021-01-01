import MainRightHead from "components/CardHead";
import MainRightTypeItem from "./mainRightTypeItem";
import { mainRightHeader } from "config/hoom";
import { apiName } from "config/api";
import { getApiPath } from "utils/path";
import LoadRender from "components/LoadRender";
import useType from "hook/useType";
import { MainRightTypeType } from "./@type";

let MainRightType: MainRightTypeType;

MainRightType = ({ index }) => {
  const { icon, content, hrefTo } = mainRightHeader[index];
  const { type, changeCurrentType } = useType();
  return (
    <div className="card mt-4 mt-md-0">
      <MainRightHead icon={icon} content={content} hrefTo={hrefTo} />
      <div className="card-body">
        <div className="list-group">
          <LoadRender
            path={getApiPath(apiName.type)}
            initialData={type}
            loaded={(data) =>
              data.map(({ typeId, typeContent, typeCount }) => (
                <MainRightTypeItem key={typeId} typeName={typeContent} typeCount={typeCount} changeCurrentType={changeCurrentType} />
              ))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainRightType;