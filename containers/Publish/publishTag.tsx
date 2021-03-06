import { apiName } from "config/api";
import Drop from "components/Drop";
import LoadRender from "components/LoadRender";
import { DropItemProps } from "components/Drop/@type";
import { SimpleElement } from "containers/Main/@type";
import { TagProps } from "./@type";

let PublishTag: SimpleElement;

PublishTag = () => {
  return (
    <div className="input-group col">
      <div className="input-group-prepend text-center">
        <span
          className="d-inline-block input-group-text bg-transparent border-info text-info position-relative font-weight-bold"
          style={{ zIndex: 12, minWidth: "60px" }}
        >
          标签
        </span>
      </div>
      <LoadRender<TagProps[]>
        needinitialData
        apiPath={apiName.tag}
        loaded={(res) => {
          const data: DropItemProps<string>[] = res.map(({ tagContent, tagId }) => {
            return { name: tagContent, value: tagId };
          });
          return <Drop<string> fieldName="tagId" className="form-control" placeHolder="添加标签" data={data} multiple />;
        }}
      />
    </div>
  );
};

export default PublishTag;
