import Drop from "components/Drop";
import Button from "components/Button";
import LoadRender from "components/LoadRender";
import { apiName } from "config/api";
import { TypeProps } from "hook/@type";
import { TagProps } from "containers/Publish/@type";
import { DropItemProps } from "components/Drop/@type";
import { SimpleElement } from "containers/Main/@type";
import { autoRequest } from "utils/fetcher";
import { useSearch } from "hook/useManage";

let ManageSearch: SimpleElement;

ManageSearch = () => {
  const request = autoRequest({ method: "post", token: true });
  const [ref, search] = useSearch({ request });
  return (
    <div className="card">
      <form className="form-inline p-3" ref={ref}>
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
        <Button className="btn-primary m-2" request={search} value={"搜索"} />
      </form>
    </div>
  );
};

export default ManageSearch;
