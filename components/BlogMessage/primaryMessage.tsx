import Image from "next/image";
import { useCallback } from "react";
import UserHover from "components/UserHover";
import { momentTo } from "utils/time";
import { getClass } from "utils/class";
import { autoTransformImage } from "utils/data";
import { PrimaryMessageType } from "./@type";

import style from "./index.module.scss";

let Index: PrimaryMessageType;

Index = (props) => {
  const {
    modifyState,
    modifyDate,
    content,
    avatar,
    gender,
    username,
    ip,
    children,
    replayHandler,
    withReplay = true,
    withChildren = true,
  } = props;
  const replayCallback = useCallback(() => replayHandler(props), []);
  return (
    <div className="media py-2">
      <UserHover {...props}>
        <Image src={autoTransformImage(avatar, gender)} className="rounded" alt="头像" width="38" height="38" />
      </UserHover>
      <div className="media-body ml-2 ml-md-3">
        <h5 className="small">
          <span className={getClass("text-info px-2 rounded text-truncate align-middle", style.author)}>{username ? username : ip} :</span>
          <span className="float-right badge badge-primary align-middle">
            {modifyState ? "更新于：" : "回复于：" + momentTo(modifyDate)}
          </span>
        </h5>
        <p className="mb-0 mb-md-3">{content}</p>
        {withReplay && (
          <button className={getClass("btn btn-outline-info", style.replay)} onClick={replayCallback}>
            replay
          </button>
        )}
        {withChildren && children}
      </div>
    </div>
  );
};

export default Index;
