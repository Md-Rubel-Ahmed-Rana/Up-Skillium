import { Checkbox, Form, Input } from "antd/lib";
import { useState } from "react";

const SelectMeetLink = () => {
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
      {isAutoCreate ? (
        <p className="font-semibold">Meet link will be created automatically</p>
      ) : (
        <Input type="url" placeholder="Enter meeting link" />
      )}
    </Form.Item>
  );
};

export default SelectMeetLink;
