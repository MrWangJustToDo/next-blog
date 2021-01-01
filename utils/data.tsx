import { AutoTransformDataType, AutoTransformImageType } from "./@type";

let autoTransformData: AutoTransformDataType;
let autoTransformImage: AutoTransformImageType;
autoTransformData = (data) => {
  if (data.code === 0 && data.state && data.data) {
    return data.data;
  } else {
    return data;
  }
};

autoTransformImage = (avatar, gender) => {
  if (avatar && avatar.length > 0) {
    return avatar;
  } else {
    if (gender === 0) {
      return process.env.NEXT_PUBLIC_MAN;
    } else {
      return process.env.NEXT_PUBLIC_WOMAN;
    }
  }
};

export { autoTransformData, autoTransformImage };
