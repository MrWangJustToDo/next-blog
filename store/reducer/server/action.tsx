import { ServerActionType, CreateAction } from "./@type";

let serverAction: ServerActionType;
let getDataAction_Server: CreateAction;
let getDataSucess_Server: CreateAction;
let getDataFail_Server: CreateAction;

// server action dispatch
serverAction = {
  GETDATAACTION: (name) => `getDataAction_server_${name}`,
  GETDATASUCESS: (name) => `getDataSucess_server_${name}`,
  GETDATAFAIL: (name) => `getDataFail_server_${name}`,
};

getDataAction_Server = (name) => {
  return { type: serverAction.GETDATAACTION(name) };
};

getDataSucess_Server = (name, data, res) => {
  return { type: serverAction.GETDATASUCESS(name), data, ...res };
};

getDataFail_Server = (name, e, res) => {
  return { type: serverAction.GETDATAFAIL(name), e, ...res };
};

export { serverAction, getDataAction_Server, getDataSucess_Server, getDataFail_Server };
