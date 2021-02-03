import { ForWardRefType } from "./@type";

let LoginUsername: ForWardRefType<HTMLInputElement>;

LoginUsername = ({ forWardRef }) => {
  return (
    <div className="form-group row align-items-center position-relative">
      <label htmlFor="username" className="col-sm-3 col-form-label">
        姓名:
      </label>
      <div className="position-relative col-sm-9 p-0">
        <input ref={forWardRef} type="text" className="form-control" name="username" id="username" placeholder="请输入用户名" />
      </div>
    </div>
  );
};

export default LoginUsername;
