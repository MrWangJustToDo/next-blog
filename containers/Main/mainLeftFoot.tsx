import PageFoot from "components/PageFoot";
import { useHome } from "hook/useHome";
import { Element } from "./@type";

let MainLeftFoot: Element;

MainLeftFoot = () => {
  let { currentPage, increaseAble, decreaseAble, increasePage, decreasePage } = useHome();
  return (
    <PageFoot
      page={currentPage}
      increaseAble={increaseAble}
      decreaseAble={decreaseAble}
      increasePage={increasePage}
      decreasePage={decreasePage}
    />
  );
};

export default MainLeftFoot;
