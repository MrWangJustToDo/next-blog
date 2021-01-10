import { ActionHandlerType } from "./@type";

let actionHandler: ActionHandlerType;

actionHandler = (element, action) => {
  if (element) {
    return action(element);
  }
};

export { actionHandler };
