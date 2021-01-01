import { useHome } from "hook/useHome";
import MainLeftItem from "components/BlogItem";
import { Element } from "./@type";

let MainLeftContent: Element;

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
