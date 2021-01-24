let Index = () => {
  return (
    <div className="input-group mb-3">
      <select name="blog-tag" className="form-control text-info shadow-none font-weight-bold col-1 border-info" style={{ zIndex: 10, minWidth: "80px" }}>
        <option value="原创">原创</option>
        <option value="转载">转载</option>
        <option value="翻译">翻译</option>
      </select>
      <input type="text" id="title" className="form-control shadow-none col-11" placeholder="标题" name="blog-title" />
    </div>
  );
};

export default Index;
