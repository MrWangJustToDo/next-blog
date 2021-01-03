import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { childMessageLength, primaryMessageLength } from "config/message";
import { UseChildMessageType, UsePrimaryMessageType, UseInputType, MyInputELement } from "./@type";

let useChildMessage: UseChildMessageType;
let usePrimaryMessage: UsePrimaryMessageType;
let useInput: UseInputType;

useChildMessage = (props) => {
  const [more, setMore] = useState<boolean>(props.length > childMessageLength);
  const loadMore = useCallback(() => setMore(true), []);
  const messageProps = useMemo(() => {
    if (more) {
      return props.slice(0, childMessageLength);
    } else {
      return props;
    }
  }, [more, props, childMessageLength]);
  return { messageProps, more, loadMore };
};

usePrimaryMessage = (props) => {
  const allPage = Math.ceil(props.length / primaryMessageLength);
  const [currentPage, setCurrentPage] = useState(1);
  const increasePage = useCallback(() => setCurrentPage((lastPage) => lastPage + 1), []);
  const decreasePage = useCallback(() => setCurrentPage((lastPage) => lastPage - 1), []);
  const increaseAble = currentPage < allPage;
  const decreaseAble = currentPage > 1;
  const currentMessage = props.slice(currentPage - 1 * primaryMessageLength, currentPage * primaryMessageLength);
  return { currentPage, increasePage, decreasePage, increaseAble, decreaseAble, currentMessage };
};

function input<T extends MyInputELement>(init = "") {
  const [value, setValue] = useState<string>(init);
  const typeCallback = useCallback<(props: ChangeEvent<T>) => void>((e) => setValue(e.target.value), []);
  return { value, typeCallback };
}

useInput = input;

export { useChildMessage, usePrimaryMessage, useInput };
