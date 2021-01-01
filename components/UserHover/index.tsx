import Hover from "components/Hover";
import HoverItem from "./hoverItem";
import { UserHoverType } from "./@type";

let UserHover: UserHoverType;

UserHover = (props) => {
  const { userId, children } = props;
  if (userId) {
    return (
      <Hover
        hoverItem={
          <div className="bg-white small rounded" style={{ lineHeight: "1.25em", width: "220px" }}>
            <HoverItem {...props} />
          </div>
        }
      >
        {children}
      </Hover>
    );
  } else {
    return children;
  }
};

export default UserHover;
