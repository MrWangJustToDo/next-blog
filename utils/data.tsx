import { AutoTransformDataType, GetCurrentAvatar } from "./@type";

let autoTransformData: AutoTransformDataType;
let getCurrentAvatar: GetCurrentAvatar;

autoTransformData = (data) => {
  if (data.code !== undefined && data.state && data.data) {
    return data.data;
  } else {
    return data;
  }
};

getCurrentAvatar = (avatar, gender) => {
  if (avatar && avatar.length > 0) {
    return avatar;
  } else {
    if (gender === undefined) {
      return process.env.NEXT_PUBLIC_MAN;
    }
    if (gender === 0) {
      return process.env.NEXT_PUBLIC_MAN;
    } else {
      return process.env.NEXT_PUBLIC_WOMAN;
    }
  }
};

export { autoTransformData, getCurrentAvatar };
