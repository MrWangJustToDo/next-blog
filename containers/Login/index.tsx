import Link from "next/link";
import LoginUsername from "./loginUsername";
import LoginPassword from "./loginPassword";
import LoginCheckcode from "./loginCheckcode";
import LoginSubmit from "./loginSubmit";
import { useLogin, useLoginInput } from "hook/useUser";
import { useShowAndHideAnimate } from "hook/useAnimate";
import { login } from "config/user";
import { flexCenter, getClass } from "utils/class";

import style from "./index.module.scss";

let Index = () => {
  const formRef = useLogin();
  const [usernameRef, usernameState] = useLoginInput({ option: login.username, successClassname: style.success, failClassname: style.fail });
  const [passwordRef, passwordState] = useLoginInput({ option: login.password, successClassname: style.success, failClassname: style.fail });
  const { ref } = useShowAndHideAnimate<HTMLDivElement>({ state: usernameState && passwordState });
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
        <LoginCheckcode forWardRef={ref} />
        <LoginSubmit enabled={usernameState && passwordState} />
      </form>
    </div>
  );
};

export default Index;
