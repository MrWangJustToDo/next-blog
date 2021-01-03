// 操作dom元素相关的工具
import { ActionHandlerType } from "./@type";

let actionHandler: ActionHandlerType;

function handler(element, action) {
  if (element) {
    action(element);
  }
}

actionHandler = handler;

export { actionHandler };
