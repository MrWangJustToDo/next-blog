import Image from "next/image";
import UserHover from "components/UserHover";
import LoadRender from "components/LoadRender";
import { momentTo } from "utils/time";
import { getClass } from "utils/class";
import { getApiPath } from "utils/path";
import { autoTransformImage } from "utils/data";
import { apiName } from "config/api";
import { BlogContentPrimary } from "./@type";

import style from "./index.module.scss";

let Index: BlogContentPrimary;

Index = (props) => {
  const { modifyState, modifyDate, userId, content } = props;
  return (
    <div className="media py-2">
      <LoadRender
        path={getApiPath(apiName.user)}
        query={{ userId }}
        loaded={(data) => (
          <UserHover {...data}>
            <Image src={autoTransformImage(data.avatar, data.gender)} className="rounded" alt="头像" width="40" height="40" />
          </UserHover>
        )}
      />
      <div className="media-body ml-3">
        <h5 className="small">
          <span className={getClass("text-info px-2 rounded", style.author)}>笔者 :</span>
          <span className="float-right badge badge-primary">{modifyState ? "更新于：" : "回复于：" + momentTo(modifyDate)}</span>
        </h5>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Index;
