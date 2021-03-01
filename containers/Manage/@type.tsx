import { apiName } from "config/api";
import { TagProps } from "containers/Publish/@type";
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

/* manageDeleteTagItem */
interface ManageDeleteTagItemType {
  (props: TagProps): JSX.Element;
}

export type { ManageDeleteTagItemType };
