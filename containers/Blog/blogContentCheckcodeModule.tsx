import { apiName } from "config/api";
import { flexCenter, getClass } from "utils/class";
import { useCheckcodeToSubmit, useInput } from "hook/useMessage";
import { useAutoLoadCheckcodeImg } from "hook/useAuto";
import { BlogContentImageCheckType } from "./@type";

let Index: BlogContentImageCheckType;

Index = ({ request, closeHandler }) => {
  const [value, typeCallback] = useInput<HTMLInputElement>();
  const img = useAutoLoadCheckcodeImg(apiName.captcha, apiName.captchaStr);
  const { ref, submit } = useCheckcodeToSubmit<HTMLInputElement>({ request, closeHandler });
  return (
    <div className={getClass("row", flexCenter)}>
      <label htmlFor="putcheck" className="col-2 col-form-label text-center text-truncate" title="验证码">
        验证码:
      </label>
      <img ref={img} className="col-4 col-md-3 border rounded" height="38" alt="验证码" />
      <div className="col-4">
        <input className="form-control" id="putcheck" ref={ref} value={value} onChange={typeCallback} />
      </div>
      <button className="btn btn-sm btn-outline-info" onClick={submit} disabled={!!!value.length}>
        提交
      </button>
    </div>
  );
};

export default Index;
