import Input from "components/Input";
import Button from "components/Button";
import LoadRender from "components/LoadRender";
import { Tag as TagItem } from "components/Tag";
import { addModule } from "config/manage";
import { ManageAddModuleType } from "./@type";
import { TagProps } from "containers/Publish/@type";
import { useState } from "react";
import { apiName } from "config/api";
import { getClass } from "utils/class";

import style from "./index.module.scss";

let ManageAddModule: ManageAddModuleType;

ManageAddModule = ({ request, judgeApiName, fieldname }) => {
  const [bool, setBool] = useState<boolean>(true);
  return (
    <div className="overflow-hidden p-2">
      <div className="text-info my-2">添加</div>
      <div className="clearfix">
        <Input name={fieldname} option={addModule.input} judgeApiName={judgeApiName} changeState={setBool} />
        <Button className="float-right btn-info btn-sm mt-2" request={request.run} value="添加" disable={!bool} />
      </div>
      <hr />
      <div className="text-info my-2">管理</div>
      {/* <LoadRender<TagProps[]>
        path={apiName.tag}
        loaded={(data) => (
          <div className="d-flex p-1 flex-wrap justify-content-around" style={{ maxWidth: "420px" }}>
            {data.map(({ tagId, tagContent, tagCount }) => (
              <div className="m-2 position-relative">
                <TagItem hoverAble={false} key={tagId} tagContent={tagContent} tagCount={tagCount} />
                <i
                  className={getClass("position-absolute ri-close-circle-fill", style.closeIcon)}
                  style={{ left: "calc(100% - 6px)", bottom: "calc(100% - 7px)" }}
                />
              </div>
            ))}
          </div>
        )}
      /> */}
    </div>
  );
};

export default ManageAddModule;
