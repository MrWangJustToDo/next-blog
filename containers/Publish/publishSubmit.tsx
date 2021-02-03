let PublishSubmit = ({ submit }) => {
  return (
    <div className="form-row mb-5 mt-3 flex-row-reverse">
      <input className="btn btn-info mx-2 active" type="button" value="发布" onClick={submit} />
      <input className="btn btn-secondary mx-2" type="button" value="返回" />
    </div>
  );
};

export default PublishSubmit;
