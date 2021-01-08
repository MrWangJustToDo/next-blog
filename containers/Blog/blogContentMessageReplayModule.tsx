import { apiName } from "config/api";
import { useAutoLoadCheckcodeImg } from "hook/useAuto";
import { useInput, useReplayModuleToSubmit } from "hook/useMessage";
import { BlogContentMessageReplayModuleType } from "./@type";

let Index: BlogContentMessageReplayModuleType;

Index = ({ request, closeHandler }) => {
  const [code, typeCode] = useInput<HTMLInputElement>();
  const [value, typeCallback] = useInput<HTMLTextAreaElement>();
  const ref = useAutoLoadCheckcodeImg({ imgUrl: apiName.captcha, strUrl: apiName.captchaStr });
  const submit = useReplayModuleToSubmit({ request, closeHandler, checkCode: code, content: value });
  return (
    <>
      <textarea className="w-100 my-2 border rounded" placeholder="请输入留言" style={{ minHeight: "100px" }} value={value} onChange={typeCallback} />
      <div className="row">
        <label htmlFor="putcheck" className="col-2 col-form-label text-center text-truncate" title="验证码">
          验证码:
        </label>
        <img ref={ref} className="col-4 col-md-3 border rounded" height="38" alt="验证码" />
        <div className="col-4">
          <input className="form-control" id="putcheck" value={code} onChange={typeCode} />
        </div>
        <button className="btn btn-sm btn-primary" disabled={!!!value.length || !!!code.length} onClick={submit}>
          新留言
        </button>
      </div>
    </>
  );
};

export default Index;
