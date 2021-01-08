import TypeContentItem from "components/BlogItem";
import LoadRender from "components/LoadRender";
import { PrimaryMessage } from "components/BlogMessage";
import { apiName } from "config/api";
import useType from "hook/useType";
import { getClass } from "utils/class";
import { TypeContentType } from "./@type";

import style from "./index.module.scss";

let TypeContent: TypeContentType;

TypeContent = ({ blogs }) => {
  const { currentPageBlogs } = useType(blogs);
  return (
    <ul className="p-0">
      {currentPageBlogs.map((props) => (
        <div key={props.blogId} className="d-flex">
          <div className="col-lg-8 px-0">
            <TypeContentItem {...props} />
          </div>
          <div className={getClass("col-lg-4 border-left", style.autoHide)}>
            <LoadRender
              path={apiName.primaryMessage}
              method="post"
              requestData={{ blogId: props.blogId }}
              loaded={(data) =>
                data.map((props) => (
                  <>
                    <PrimaryMessage key={Math.random().toString()} {...props} withReplay={false} withChildren={false} />
                    <PrimaryMessage key={Math.random().toString()} {...props} withReplay={false} withChildren={false} />
                    <PrimaryMessage key={Math.random().toString()} {...props} withReplay={false} withChildren={false} />
                    <PrimaryMessage key={Math.random().toString()} {...props} withReplay={false} withChildren={false} />
                    <PrimaryMessage key={Math.random().toString()} {...props} withReplay={false} withChildren={false} />
                    <PrimaryMessage key={Math.random().toString()} {...props} withReplay={false} withChildren={false} />
                    <PrimaryMessage key={Math.random().toString()} {...props} withReplay={false} withChildren={false} />
                  </>
                ))
              }
            />
          </div>
        </div>
      ))}
    </ul>
  );
};

export default TypeContent;
