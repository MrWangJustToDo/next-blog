import { apiName } from "config/api";
import { AutoRequestType } from "utils/@type";

/* manageAddModule */
interface ManageAddModuleProps {
  fieldname: string;
  judgeApiName: apiName;
  request: AutoRequestType;
}

interface ManageAddModuleType {
  (props: ManageAddModuleProps): JSX.Element;
}

export type { ManageAddModuleType };
