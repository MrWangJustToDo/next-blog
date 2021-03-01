import { useEffect } from "react";
import isEqual from "lodash/isEqual";
import { getDataSucess_Server } from "store/reducer/server/action";
import { WithUpdateStoreType } from "./@type";

let WithUpdateStore: WithUpdateStoreType;

WithUpdateStore = ({ needUpdate, currentState, apiPath, data, dispatch, children }) => {
  useEffect(() => {
    if (needUpdate && apiPath && !isEqual(currentState, data)) {
      dispatch(getDataSucess_Server(apiPath, data));
    }
  }, [needUpdate, apiPath, currentState, data]);
  return <>{children}</>;
};
export default WithUpdateStore;
