import { Tag } from "components/Tag";
import { apiName } from "config/api";
import LoadRender from "components/LoadRender";
import { TagProps } from "containers/Publish/@type";
import { SimpleElement } from "containers/Main/@type";

let ManageTag: SimpleElement;

ManageTag = () => {
  return (
    <div className="card-body">
      <LoadRender<TagProps[]>
        path={apiName.tag}
        loaded={(data) => {
          return (
            <>
              {data.map(({ tagCount, tagContent, tagId }) => (
                <div key={tagId} className="d-inline-block m-1">
                  <Tag {...{ tagContent, tagCount }} />
                </div>
              ))}
            </>
          );
        }}
      />
    </div>
  );
};

export default ManageTag;
