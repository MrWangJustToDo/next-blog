import Image from "next/image";
import { momentTo } from "utils/time";
import { getClass } from "utils/class";
import { autoTransformImage } from "utils/data";
import { ChildMessageType } from "./@type";

import style from "./index.module.scss";

let Index: ChildMessageType;

Index = (props) => {
  const { modifyState, modifyDate, content, avatar, gender, username, fromIp, toIp } = props;
  return (
    <div className="media py-2">
      <Image src={autoTransformImage(avatar, gender)} className="rounded" alt="头像" width="40" height="40" />
      <div className="media-body ml-3">
        <h5 className="small">
          <span className={getClass("text-info px-2 rounded text-truncate align-middle", style.author)}>{username ? username : fromIp}</span>
          <span className="mx-1 align-middle">回复</span>
          <span className={getClass("text-info px-2 rounded text-truncate align-middle", style.author)}>{toIp}</span>
          <span className="float-right badge badge-primary">{modifyState ? "更新于：" : "回复于：" + momentTo(modifyDate)}</span>
        </h5>
        <p>{content}</p>
      </div>
    </div>
  );
};


export default Index;
