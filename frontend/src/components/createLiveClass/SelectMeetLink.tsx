import { Checkbox, Form, FormInstance, Input } from "antd/lib";
import { useState } from "react";

type Props = {
  form: FormInstance;
};

const SelectMeetLink = ({ form }: Props) => {
  const [isAutoCreate, setIsAutoCreate] = useState(false);

  const handleCheckboxChange = (e: any) => {
    const isChecked = e.target.checked;
    setIsAutoCreate(isChecked);
  };

  return (
    <Form.Item
      name="meetingLink"
      label={
        <div className="flex gap-5 items-center">
          <h2>Meeting Link</h2>
          <p className="font-bold">Or</p>
          <Checkbox onChange={handleCheckboxChange}>
            Create automatically
          </Checkbox>
        </div>
      }
    >
      {!isAutoCreate ? (
        <Input type="url" placeholder="Enter meeting link" />
      ) : (
        <p className="font-semibold">Meet link will be created automatically</p>
      )}
    </Form.Item>
  );
};

export default SelectMeetLink;
