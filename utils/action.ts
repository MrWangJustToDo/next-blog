import { ActionHandlerType, JudgeActioProps, JudgeActionType, LoadingActionType, LoadingActionProps } from "./@type";

let actionHandler: ActionHandlerType;

let judgeAction: JudgeActionType;

let loadingAction: LoadingActionType;

actionHandler = (element, action, otherAction) => {
  if (element) {
    return action(element);
  } else if (otherAction) {
    return otherAction();
  } else {
    return Promise.resolve();
  }
};

judgeAction = async <T extends HTMLElement>({
  element,
  judge,
  successClassName,
  successMessage,
  failClassName,
  failMessage,
  successCallback,
  failCallback,
}: JudgeActioProps<T>) => {
  // judge & action
  const judgeResult = typeof judge === "function" ? await judge() : judge;
  // reset element
  actionHandler<HTMLCollection, void>(element.parentElement.children, (eles) => {
    Array.from(eles).forEach((ele) => ele.localName === "span" && ele.hasAttribute("toast") && ele.remove());
  });
  const span = document.createElement("span");
  span.setAttribute("toast", "true");
  if (judgeResult) {
    span.textContent = successMessage.current;
    const successClassNameArr = successClassName.split(" ");
    span.classList.add(...successClassNameArr);
    if (successCallback) {
      successCallback();
    }
  } else {
    if (typeof failMessage.current === "object") {
      span.textContent = failMessage.current.current;
    } else {
      span.textContent = failMessage.current;
    }
    const failClassNameArr = failClassName.split(" ");
    span.classList.add(...failClassNameArr);
    if (failCallback) {
      failCallback();
    }
  }
  actionHandler<Element, void>(element.parentElement, (ele) => ele.appendChild(span));
};

loadingAction = <T extends HTMLElement>({ element, loadingClassName }: LoadingActionProps<T>) => {
  actionHandler<HTMLCollection, void>(element.parentElement.children, (eles) => {
    Array.from(eles).forEach((ele) => ele.localName === "span" && ele.hasAttribute("toast") && ele.remove());
  });
  const span = document.createElement("span");
  span.setAttribute("toast", "true");
  const loadingClassNameArr = loadingClassName.split(" ");
  span.classList.add(...loadingClassNameArr);
  actionHandler<T, void>(element, (ele) => ele.parentElement.append(span));
};

export { actionHandler, judgeAction, loadingAction };
