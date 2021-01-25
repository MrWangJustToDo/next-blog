import Drop from "components/Drop";
import { DropItemProps } from "components/Drop/@type";
import LoadRender from "components/LoadRender";
import { apiName } from "config/api";
import { TypeProps } from "hook/@type";

let Index = () => {
  return (
    <div className="input-group col">
      <div className="input-group-prepend text-center">
        <span
          className="d-inline-block input-group-text bg-transparent border-info text-info position-relative font-weight-bold"
          style={{ zIndex: 12, minWidth: "80px" }}
        >
          分类
        </span>
      </div>
      <LoadRender<TypeProps[]>
        path={apiName.type}
        loaded={(res) => {
          const data: DropItemProps<number>[] = res.map(({ typeContent, typeId }) => {
            return { name: typeContent, value: typeId };
          });
          return <Drop<number> filedName="blogType" className="form-control" placeHolder="分类" data={data} />;
        }}
      />
    </div>
  );
};

export default Index;
