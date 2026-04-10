import { Form, Input, InputNumber } from "antd/lib";

const CreateLessonCommonFields = () => {
  return (
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Please enter lesson title" />
      </Form.Item>
      <Form.Item
        label="Serial"
        name="serial"
        rules={[{ required: true, message: "Serial number is required" }]}
        className="w-full"
      >
        <InputNumber
          className="w-full"
          placeholder="Please enter serial number"
        />
      </Form.Item>
    </>
  );
};

export default CreateLessonCommonFields;
