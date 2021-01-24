import { ClientActionType, CreateAction } from "./@type";

let clientAction: ClientActionType;
let setDataAction_client: CreateAction;
let setDataSucess_client: CreateAction;
let setDataFail_client: CreateAction;

clientAction = {
  SETDATAACTION: (name) => `setDataAction_client_${name}`,
  SETDATASUCESS: (name) => `setDataSucess_client_${name}`,
  SETDATAFAIL: (name) => `setDataFail_client_${name}`,
};

setDataAction_client = (name) => {
  return { type: clientAction.SETDATAACTION(name) };
};

setDataSucess_client = (name, data) => {
  return { type: clientAction.SETDATASUCESS(name), data };
};

setDataFail_client = (name, e) => {
  return { type: clientAction.SETDATAFAIL(name), e };
};

export { clientAction, setDataAction_client, setDataSucess_client, setDataFail_client };
