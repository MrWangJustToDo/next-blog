// 显示获取到的用户信息
import Image from "next/image";
import LoadRender from "components/LoadRender";
import { apiName } from "config/api";
import { getUserProps, getUserState } from "config/hover";
import { getCurrentAvatar } from "utils/data";
import { getClass, flexAround, flexBetween, flexCenter } from "utils/class";
import { UserExProps, UserHoverItemType } from "./@type";

import style from "./index.module.scss";

let UserHoverItem: UserHoverItemType;

UserHoverItem = (props) => {
  const { avatar, gender, username, userId } = props;
  return (
    <div className="card border-0">
      <div className={getClass(flexAround, "card-body p-2")}>
        <div className={getClass("rounded-circle overflow-hidden", style.imgHover)}>
          <Image src={getCurrentAvatar(avatar, gender)} layout="responsive" width="100%" height="100%" alt={username} />
        </div>
        <div className="w-50">
          <i className="ri-user-line" />
          <span className="ml-2">{username || "oops !"}</span>
        </div>
      </div>
      <div className="card-body text-left py-2">
        <LoadRender<UserExProps> path={apiName.userEx} token query={{ userId }} loaded={Loaded} />
        {getUserProps(props).map(({ key, icon, value }) => (
          <div key={key}>
            <i className={icon} />
            <span className="ml-2">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

let Loaded = (data: UserExProps) => {
  return (
    <div className={getClass(flexBetween, "mb-2")}>
      {getUserState(data).map(({ key, icon, value }) => {
        return (
          <div className={getClass(flexCenter)} key={key}>
            <i className={icon} />
            <span className="ml-2">{value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default UserHoverItem;
