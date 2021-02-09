import Link from "next/link";
import { login } from "config/user";
import LoginUsername from "./loginUsername";
import LoginPassword from "./loginPassword";
import LoginCheckcode from "./loginCheckcode";
import LoginSubmit from "./loginSubmit";
import { flexCenter, getClass } from "utils/class";
import { useLogin, useLoginInput } from "hook/useUser";
import { SimpleElement } from "containers/Main/@type";

import style from "./index.module.scss";

let Login: SimpleElement;

Login = () => {
  const formRef = useLogin();
  const [usernameRef, usernameState] = useLoginInput({ option: login.username, successClassname: style.success, failClassname: style.fail });
  const [passwordRef, passwordState] = useLoginInput({ option: login.password, successClassname: style.success, failClassname: style.fail });
  return (
    <div className={getClass("rounded my-4 my-lg-5 px-3 overflow-auto user-select-none", style.loginForm)}>
      <Link href="/">
        <a className={getClass("position-absolute text-info", flexCenter, style.back)}>
          <i className="ri-arrow-left-line" />
          <span className="ml-1 ml-md-2">返回首页</span>
        </a>
      </Link>
      <h3 className="my-4 text-center">登录</h3>
      <form className="px-lg-5 px-3 py-2" ref={formRef}>
        <LoginUsername forWardRef={usernameRef} />
        <LoginPassword forWardRef={passwordRef} />
        <LoginCheckcode show={usernameState && passwordState} />
        <LoginSubmit enabled={usernameState && passwordState} />
      </form>
    </div>
  );
};

export default Login;
