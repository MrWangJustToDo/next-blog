import { useHome } from "hook/useHome";
import MainLeftItem from "components/BlogItem";
import { SimpleElement } from "./@type";

let MainLeftContent: SimpleElement;

MainLeftContent = () => {
  const { currentPageBlogs } = useHome();
  return (
    <>
      {currentPageBlogs.map((props) => (
        <MainLeftItem key={props.blogId} {...props} />
      ))}
    </>
  );
};

export default MainLeftContent;
