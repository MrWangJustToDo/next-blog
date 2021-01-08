// 操作dom元素相关的工具
import { ActionHandlerType } from "./@type";

let actionHandler: ActionHandlerType;

actionHandler = (element, action) => {
  if (element) {
    return action(element);
  } else {
    console.warn("element not exist to action");
  }
};

export { actionHandler };
