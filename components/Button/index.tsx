import { SimpleElement } from "containers/Main/@type";
import { useBool } from "hook/useData";
import { useCallback } from "react";
import { getClass } from "utils/class";
import { ButtonType } from "./@type";

let Button: ButtonType;

let Loading: SimpleElement;

Button = ({ request, type = "button", disable = false, value = "确定", initState = true, className = "", style = {} }) => {
  const { bool, show, hide } = useBool({ init: initState });
  const requestCallback = useCallback(() => {
    hide();
    request().then(show).catch(show);
  }, []);
  return (
    <button
      className={getClass("btn position-relative", className)}
      disabled={!bool || disable}
      style={style}
      onClick={requestCallback}
      title={bool ? value : "loading"}
      type={type}
    >
      <span style={{ color: bool ? "inherit" : "transparent" }}>{value}</span>
      {!bool && <Loading />}
    </button>
  );
};

Loading = () => (
  <div className="position-absolute absolute-center">
    <div className="spinner-border spinner-border-sm" />
  </div>
);

export default Button;
