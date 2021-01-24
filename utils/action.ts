import { ActionHandlerType, JudgeActioProps, JudgeActionType } from "./@type";

let actionHandler: ActionHandlerType;

let judgeAction: JudgeActionType;

actionHandler = (element, action, otherAction) => {
  if (element) {
    return action(element);
  } else {
    if (otherAction) {
      otherAction();
    }
  }
};

judgeAction = <T extends HTMLElement>({
  element,
  judge,
  successClassname,
  successMessage,
  failClassname,
  failMessage,
  successCallback,
  failCallback,
}: JudgeActioProps<T>) => {
  // reset element
  actionHandler(element.parentElement.lastElementChild, (ele) => {
    if (ele.localName === "span") {
      ele.remove();
    }
  });
  // judge & action
  const judgeResult = typeof judge === "function" ? judge() : judge;
  const span = document.createElement("span");
  if (judgeResult) {
    span.textContent = successMessage;
    span.classList.add(successClassname);
    if (successCallback) {
      successCallback();
    }
  } else {
    span.textContent = failMessage;
    span.classList.add(failClassname);
    if (failCallback) {
      failCallback();
    }
  }
  actionHandler(element.parentElement, (ele) => ele.appendChild(span));
};

export { actionHandler, judgeAction };
