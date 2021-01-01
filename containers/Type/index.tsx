import TypeHead from "./typeHead";
import TypeContent from "./typeContent";
import TypeFoot from "./typeFoot";
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
      <TypeHead />
      <div className="card m-4">
        <LoadRender
          path={getApiPath(apiName.home)}
          initialData={blogs}
          loaded={(data) => {
            return (
              <>
                <TypeContent blogs={data} />
                <TypeFoot blogs={data} />
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default Index;
