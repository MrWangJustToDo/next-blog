import { AutoTransformDataType, FormChild, FormSerializeType, GetCurrentAvatar } from "./@type";

let autoTransformData: AutoTransformDataType;
let getCurrentAvatar: GetCurrentAvatar;
let formSerialize: FormSerializeType;

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
      return process.env.NEXT_PUBLIC_WOMEN;
    }
  }
};

formSerialize = (element: HTMLFormElement) => {
  const re = {};
  const arr = ["button", "file", "reset", "submit"];
  if (element.localName === "form") {
    const inputs = Array.from<FormChild>(element.elements);
    inputs.forEach((item) => {
      if (item.name && item.type) {
        if (!arr.includes(item.type)) {
          if (item.type === "radio") {
            if ((item as HTMLInputElement).checked) {
              re[item.name] = item.value;
            }
          } else if (item.type === "checkbox") {
            if ((item as HTMLInputElement).checked) {
              if (item.name in re) {
                re[item.name].push(item.value);
              } else {
                re[item.name] = [item.value];
              }
            }
          } else if (item.localName === "select") {
            const selectItems = (item as HTMLSelectElement).selectedOptions;
            if ((item as HTMLSelectElement).multiple) {
              re[item.name] = [];
              Array.from(selectItems).forEach((selectItem) => {
                if (!selectItem.disabled) {
                  re[item.name].push(selectItem.value);
                }
              });
            } else {
              Array.from(selectItems).forEach((selectItem) => {
                if (!selectItem.disabled) {
                  re[item.name] = selectItem.value;
                }
              });
            }
          } else {
            if (!item.disabled) {
              re[item.name] = item.value;
            }
          }
        }
      }
    });
  } else {
    throw new Error("FormSerialize parameter type error");
  }
  return re;
};

export { autoTransformData, getCurrentAvatar, formSerialize };
