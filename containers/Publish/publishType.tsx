import Drop from "components/Drop";
import LoadRender from "components/LoadRender";
import { apiName } from "config/api";
import { TypeProps } from "hook/@type";
import { DropItemProps } from "components/Drop/@type";
import { SimpleElement } from "containers/Main/@type";

let PublishType: SimpleElement;

PublishType = () => {
  return (
    <div className="input-group col">
      <div className="input-group-prepend text-center">
        <span
          className="d-inline-block input-group-text bg-transparent border-info text-info position-relative font-weight-bold"
          style={{ zIndex: 12, minWidth: "60px" }}
        >
          分类
        </span>
      </div>
      <LoadRender<TypeProps[]>
        needinitialData
        apiPath={apiName.type}
        loaded={(res) => {
          const data: DropItemProps<string>[] = res.map(({ typeContent, typeId }) => {
            return { name: typeContent, value: typeId };
          });
          return <Drop<string> fieldName="typeId" className="form-control" placeHolder="添加分类" data={data} />;
        }}
      />
    </div>
  );
};

export default PublishType;
