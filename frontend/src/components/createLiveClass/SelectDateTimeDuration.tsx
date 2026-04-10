import { DatePicker, Form } from "antd/lib";

const { RangePicker } = DatePicker;

const SelectDateTimeDuration = () => {
  return (
    <Form.Item
      name={"dateRange"}
      label="Start and End Time"
      rules={[
        {
          required: true,
          message: "Please select the date and time range!",
        },
      ]}
    >
      <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" className="w-full" />
    </Form.Item>
  );
};

export default SelectDateTimeDuration;
