import { ChildMessage } from "components/BlogMessage";
import { useChildMessage } from "hook/useMessage";
import { getClass } from "utils/class";
import { BlogContentChildMessageType } from "./@type";

import style from "./index.module.scss";

let Index: BlogContentChildMessageType;

Index = ({ messages }) => {
  const { messageProps, more, loadMore } = useChildMessage(messages);
  return (
    <>
      {messageProps.map((item, index) => (
        <ChildMessage key={item.commentId} {...item}>
          {index === messageProps.length - 1 && more && (
            <button className={getClass("btn btn-outline-info float-right", style.loadMore)} onClick={loadMore}>
              loadMore
            </button>
          )}
        </ChildMessage>
      ))}
    </>
  );
};

export default Index;
