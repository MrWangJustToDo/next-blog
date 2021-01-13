import TagHead from "./tagHead";
import TagFoot from "./tagFoot";
import TagContent from "./tagContent";
import LoadRender from "components/LoadRender";
import { useHome } from "hook/useHome";
import { apiName } from "config/api";
import { Element } from "./@type";

let Index: Element;

Index = () => {
  const { blogs } = useHome();
  return (
    <>
      <TagHead />
      <div className="card mx-lg-4 mt-4">
        <LoadRender
          path={apiName.home}
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
