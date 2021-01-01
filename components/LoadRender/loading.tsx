// 默认loading时的状态
import { LoadingType } from "./@type";

let Loading: LoadingType;

Loading = ({ placeholder }) => {
  const placeholderStyle = {
    height: placeholder.height ? `${placeholder.height}px` : "auto",
    width: placeholder.width ? `${placeholder.width}px` : "auto",
  };
  return (
    <div className="container px-lg-5 px-sm-2" style={placeholderStyle}>
      <div className="my-lg-3 text-center">
        <div className="spinner-border text-info">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
