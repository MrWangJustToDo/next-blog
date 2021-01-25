import PublishHead from "./publishHead";
import PublishEditor from "./publishEditor";
import PublishType_Tag from "./publishType&Tag";
import PublishImage from "./publishImage";

let Index = () => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="mx-4 pb-5">
          <form>
            <PublishHead />
            <PublishEditor />
            <PublishType_Tag />
            <PublishImage />
            {/* <AdminBodyContainerPublishHead /> */}
            {/* <AdminBodyContainerPublishEditor /> */}
            {/* <AdminBodyContainerPublishType /> */}
            {/* <AdminBodyContainerPublishBtns /> */}
            {/* <AdminBodyContainerPublishSubmit /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
