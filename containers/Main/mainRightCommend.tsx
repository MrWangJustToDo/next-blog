import MainRightHead from "components/CardHead";
import MainRightCommendItem from "./mainRightCommendItem";
import { mainRightHeader } from "config/hoom";
import { useCommend } from "hook/useHome";
import { MainRightCommendType } from "./@type";

let MainRightCommend: MainRightCommendType;

MainRightCommend = ({ index }) => {
  const { icon, content, hrefTo } = mainRightHeader[index];
  const { commendBlogs } = useCommend();
  return (
    <div className="card mt-4">
      <MainRightHead icon={icon} content={content} hrefTo={hrefTo} />
      <div className="list-group list-group-flush">
        {commendBlogs.map(({ blogId, blogTitle }) => (
          <MainRightCommendItem key={blogId} blogId={blogId} blogTitle={blogTitle} />
        ))}
      </div>
    </div>
  );
};

export default MainRightCommend;
