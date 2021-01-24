import LoginContent from "containers/Login";
import { MyNextComponent } from "./_app";
import { animateFadein, flexCenter, getClass } from "utils/class";

let Login: MyNextComponent;

Login = () => {
  return (
    <div className={getClass("container-md h-100", animateFadein, flexCenter)}>
      <LoginContent />
    </div>
  );
};

Login.container = false;

Login.title = "登录";

export default Login;
