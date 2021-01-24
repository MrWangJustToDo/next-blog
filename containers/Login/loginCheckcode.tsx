import { apiName } from "config/api";
import { useAutoLoadCheckcodeImg } from "hook/useAuto";
import { flexBetween, getClass } from "utils/class";
import { ForWardRefType } from "./@type";

let Index: ForWardRefType<HTMLDivElement>;

Index = ({ forWardRef }) => {
  const imgRef = useAutoLoadCheckcodeImg({ imgUrl: apiName.captcha, strUrl: apiName.captchaStr });
  return (
    <div ref={forWardRef} style={{ display: "none" }}>
      <div className="form-group row align-items-center overflow-hidden">
        <label htmlFor="checkcode" className="col-sm-3 col-form-label">
          验证码:
        </label>
        <div className={getClass("col-sm-9 px-0 mx-0 flex-wrap flex-md-nowrap", flexBetween)}>
          <img className="col-sm-4 border rounded my-2 my-md-0" height="34" ref={imgRef} />
          <input type="text" className="form-control shadow-none col-sm-7 rounded" name="checkcode" id="checkcode" />
        </div>
      </div>
    </div>
  );
};

export default Index;
