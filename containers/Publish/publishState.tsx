import Drop from "components/Drop";
import CheckBox from "components/CheckBox";
import { blogState } from "config/publish";
import { SimpleElement } from "containers/Main/@type";

let PublishState: SimpleElement;

PublishState = () => {
  return (
    <>
      {blogState.map(({ fieldName, name, value }, idx) => {
        if (Array.isArray(value)) {
          return (
            <div key={idx} className="form-check form-check-inline mr-4">
              <span className="mr-lg-2 mr-1">{name}</span>
              <Drop fieldName={fieldName} data={value} className="rounded" style={{ minWidth: "120px" }} />
            </div>
          );
        } else {
          return (
            <div key={idx} className="form-check form-check-inline mr-4">
              <span className="mr-lg-2 mr-1">{name ? name : value}</span>
              <CheckBox fieldName={fieldName} />
            </div>
          );
        }
      })}
    </>
  );
};

export default PublishState;
