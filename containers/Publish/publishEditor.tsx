import dynamic from "next/dynamic";
import { useEditor } from "hook/useBlog";
import { getClass } from "utils/class";
import { markNOLineNumber } from "utils/markdown";
import "react-markdown-editor-lite/lib/index.css";

import style from "./index.module.scss";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

let Index = () => {
  useEditor("#editor_md");
  return (
    <div className={getClass("mb-3", style.editor)}>
      <MdEditor
        id={"editor"}
        config={{ canView: { fullScreen: false } }}
        renderHTML={(text) => markNOLineNumber.render(text)}
        style={{ minHeight: "90vh", borderRadius: "3px" }}
      />
    </div>
  );
};

export default Index;
