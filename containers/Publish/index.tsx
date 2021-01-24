import PublishHead from "./publishHead";
import PublishEditor from "./publishEditor";

let Index = () => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="mx-4 pb-5">
          <form>
            <PublishHead />
            <PublishEditor />
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
