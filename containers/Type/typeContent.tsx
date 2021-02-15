import LoadRender from "components/LoadRender";
import { WithReadBlogItem as TypeContentItem } from "components/BlogItem";
import { PrimaryMessage } from "components/BlogMessage";
import useType from "hook/useType";
import { apiName } from "config/api";
import { getClass } from "utils/class";
import { TypeContentType } from "./@type";

import style from "./index.module.scss";
import { PrimaryMessageProps } from "components/BlogMessage/@type";

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
          <div className={getClass("col-lg-4 border-left py-2", style.autoHide)}>
            <LoadRender<PrimaryMessageProps[]>
              path={apiName.primaryMessage}
              method="post"
              requestData={{ blogId: props.blogId }}
              loaded={(data) => (
                <>
                  {data.map((props) => (
                    <PrimaryMessage key={props.modifyDate} {...props} withReplay={false} withChildren={false} withHover={false} />
                  ))}
                </>
              )}
            />
          </div>
        </div>
      ))}
    </ul>
  );
};

export default TypeContent;
