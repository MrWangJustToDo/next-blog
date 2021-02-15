import Input from "components/Input";
import Button from "components/Button";
import { addModule } from "config/manage";

let ManageAddModule = ({ request, judgeApiName }) => {
  return (
    <div className="card-body overflow-hidden">
      <Input name='dd' option={addModule.input} judgeApiName={judgeApiName} />
      <Button className="float-right btn-info btn-sm mt-2" request={request} value="提交" />
    </div>
  );
};

export default ManageAddModule;
