import Input from "components/Input";
import Button from "components/Button";
import { addModule } from "config/manage";
import { ManageAddModuleType } from "./@type";

let ManageAddModule: ManageAddModuleType;

ManageAddModule = ({ request, judgeApiName, fieldname }) => {
  return (
    <div className="card-body overflow-hidden">
      <Input name={fieldname} option={addModule.input} judgeApiName={judgeApiName} />
      <Button className="float-right btn-info btn-sm mt-2" request={request} value="提交" />
    </div>
  );
};

export default ManageAddModule;
