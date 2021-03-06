import { actionName } from "config/action";
import { setDataSucess_client } from "store/reducer/client/action";
import { AutoDispatchTockenHandler, AutoDispatchTockenHandlerProps } from "./@type";

let autoDispatchTockenHandler: AutoDispatchTockenHandler;

autoDispatchTockenHandler = (action) => {
  return async ({ store, req, res, ...etc }: AutoDispatchTockenHandlerProps) => {
    if (store.getState().client[actionName.currentToken].data !== req.session["apiToken"].token) {
      store.dispatch(setDataSucess_client(actionName.currentToken, req.session["apiToken"].token));
    }
    return await action({ store, req, res, ...etc });
  };
};

export { autoDispatchTockenHandler };
