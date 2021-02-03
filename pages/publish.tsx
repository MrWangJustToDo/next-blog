import { animateFadein, getClass } from "utils/class";
import PublishContent from "containers/Publish";
import { MyNextComponent } from "./_app";

let Publish: MyNextComponent;

Publish = () => {
  return (
    <div className={getClass(animateFadein, "container-md my-5")}>
      <PublishContent />
    </div>
  );
};

Publish.title = "发布";

export default Publish;
