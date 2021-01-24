import { ForWardRefType } from "./@type";

let Index: ForWardRefType<HTMLInputElement>;

Index = ({ forWardRef }) => {
  return (
    <div className="form-group row align-items-center position-relative">
      <label htmlFor="password" className="col-sm-3 col-form-label">
        密码:
      </label>
      <div className="position-relative col-sm-9 p-0">
        <input ref={forWardRef} type="password" className="form-control" name="password" id="password" placeholder="请输入密码" />
      </div>
    </div>
  );
};

export default Index;
