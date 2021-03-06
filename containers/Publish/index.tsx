import { usePublish } from "hook/useBlog";
import { autoRequest } from "utils/fetcher";
import { editorId } from "config/publish";
import PublishHead from "./publishHead";
import PublishEditor from "./publishEditor";
import PublishTypeTag from "./publishType&Tag";
import PublishImage from "./publishImage";
import PublishState from "./publishState";
import PublishSubmit from "./publishSubmit";
import { SimpleElement } from "containers/Main/@type";

let Publish: SimpleElement;

Publish = () => {
  const request = autoRequest({ method: "post", token: true });
  const [ref, submit] = usePublish({ request, id: editorId });
  return (
    <div className="card mx-lg-4 border-0">
      <form ref={ref}>
        <PublishHead />
        <PublishEditor id={editorId} />
        <PublishTypeTag />
        <PublishImage />
        <PublishState />
        <PublishSubmit submit={submit} />
      </form>
    </div>
  );
};

export default Publish;
