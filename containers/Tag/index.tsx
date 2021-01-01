import TagHead from "./tagHead";
import TagFoot from "./tagFoot";
import TagContent from "./tagContent";
import LoadRender from "components/LoadRender";
import { useHome } from "hook/useHome";
import { apiName } from "config/api";
import { getApiPath } from "utils/path";
import { Element } from "./@type";

let Index: Element;

Index = () => {
  const { blogs } = useHome();
  return (
    <>
      <TagHead />
      <div className="card m-4">
        <LoadRender
          path={getApiPath(apiName.home)}
          initialData={blogs}
          loaded={(data) => {
            return (
              <>
                <TagContent blogs={data} />
                <TagFoot blogs={data} />
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default Index;
