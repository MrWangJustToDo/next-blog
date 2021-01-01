import Hover from "../Hover";
import HoverItem from "./hoverItem";
import { UserHoverType } from "./@type";

let UserHover: UserHoverType;

UserHover = (props) => {
  return (
    <Hover
      hoverItem={
        <div className="bg-white small rounded" style={{ lineHeight: "1.25em", width: "220px" }}>
          <HoverItem {...props} />
        </div>
      }
    >
      {props.children}
    </Hover>
  );
};

export default UserHover;
