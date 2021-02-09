import Drop from "components/Drop";
import LoadRender from "components/LoadRender";
import { apiName } from "config/api";
import { TypeProps } from "hook/@type";
import { TagProps } from "containers/Publish/@type";
import { DropItemProps } from "components/Drop/@type";

let ManageSearch = () => {
  return (
    <div className="card mb-5">
      <form className="form-inline p-3">
        <input type="text" className="form-control m-2" placeholder="标题" name="title" />
        <LoadRender<TypeProps[]>
          path={apiName.type}
          loaded={(res) => {
            const data: DropItemProps<number>[] = res.map(({ typeContent, typeId }) => ({ name: typeContent, value: typeId }));
            return <Drop<number> fieldName="typeId" className="form-control m-2" placeHolder="选择分类" data={data} />;
          }}
        />
        <LoadRender<TagProps[]>
          path={apiName.tag}
          loaded={(res) => {
            const data: DropItemProps<number>[] = res.map(({ tagContent, tagId }) => ({ name: tagContent, value: tagId }));
            return <Drop<number> fieldName="tagId" className="form-control m-2" placeHolder="选择标签" data={data} multiple />;
          }}
        />
        <button type="button" className="btn btn-primary m-2">
          搜索
        </button>
      </form>
    </div>
  );
};

export default ManageSearch;
