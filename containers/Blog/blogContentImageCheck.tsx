import { useCallback, useEffect, useRef, useState } from "react";
import loadImg from "utils/image";
import { actionHandler } from "utils/element";
import { apiName } from "config/api";
import { useFailToast, useSucessToast } from "hook/useToast";
import { BlogContentImageCheckType } from "./@type";
import { flexCenter, getClass } from "utils/class";

let Index: BlogContentImageCheckType;

Index = ({ request, closeHandler }) => {
  console.log(closeHandler);
  const ref = useRef<HTMLImageElement>();
  const pushFail = useFailToast();
  const pushSucess = useSucessToast();
  const [checkCode, setCheckCode] = useState<string>("");
  const type = useCallback((e) => setCheckCode(e.target.value), []);
  useEffect(() => {
    const reload = () => actionHandler<HTMLImageElement>(ref.current, (ele) => loadImg(apiName.captcha, apiName.captchaStr, ele));
    reload();
    actionHandler<HTMLImageElement>(ref.current, (ele) => ele.addEventListener("click", reload));
    return () => actionHandler<HTMLImageElement>(ref.current, (ele) => ele.removeEventListener("click", reload));
  }, []);
  const submit = useCallback(
    () =>
      request({ data: { checkCode } })
        .then(({ code, e }) => {
          if (code === 0) {
            pushSucess("提交成功");
            closeHandler();
          } else {
            pushFail(`提交失败，${e}`);
          }
        })
        .catch((e) => {
          pushFail(`提交失败，${e}`);
        }),
    [request, checkCode, pushFail, pushSucess, closeHandler]
  );
  return (
    <div className={getClass("row", flexCenter)}>
      <label htmlFor="putcheck" className="col-2 col-form-label text-center text-truncate" title="验证码">
        验证码:
      </label>
      <img ref={ref} className="col-4 col-md-3 border rounded" height="38" alt="验证码" />
      <div className="col-4">
        <input className="form-control" id="putcheck" value={checkCode} onChange={type} />
      </div>
      <button className="btn btn-sm btn-outline-info" onClick={submit}>
        提交
      </button>
    </div>
  );
};

export default Index;
