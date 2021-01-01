import Toast from "components/Toast";
import { useToastProps, ToastPushContext } from "hook/useToast";

let ToastManager = ({ children }) => {
  const { state, push } = useToastProps([]);
  return (
    <ToastPushContext.Provider value={push}>
      <div className="position-fixed" style={{ right: "10px", top: "15px", zIndex: 100 }}>
        {state.map((props) => (
          <Toast key={props.currentTime.getTime()} {...props} />
        ))}
      </div>
      {children}
    </ToastPushContext.Provider>
  );
};

export default ToastManager;
