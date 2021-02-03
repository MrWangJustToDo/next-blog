import { SimpleElement } from "containers/Main/@type";

let PublishImage: SimpleElement;

PublishImage = () => {
  return (
    <div className="input-group mb-3 position-relative">
      <div className="input-group-prepend text-center">
        <span
          className="d-inline-block input-group-text bg-transparent border-info text-info position-relative font-weight-bold"
          style={{ zIndex: 12, minWidth: "60px" }}
        >
          首图
        </span>
      </div>
      <input type="text" name="blogImgLink" className="form-control shadow-none" placeholder="文章首图，不写自动添加" />
    </div>
  );
};

export default PublishImage;
