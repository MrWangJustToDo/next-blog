import Drop from "components/Drop";
import { BlogOrigin } from "config/publish";

let Index = () => {
  return (
    <div className="input-group mb-3">
      <Drop<number> filedName={"blogOriginState"} className="col-1 border-info rounded-left" data={BlogOrigin} />
      <input type="text" id="title" className="form-control shadow-none col-11" placeholder="标题" name="blog-title" />
    </div>
  );
};

export default Index;
