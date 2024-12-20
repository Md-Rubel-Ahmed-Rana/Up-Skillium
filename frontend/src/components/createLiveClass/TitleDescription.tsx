import { Form, Input } from "antd/lib";

const { TextArea } = Input;

const TitleDescription = () => {
  return (
    <>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter the class title!" }]}
      >
        <Input placeholder="Enter class title" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please enter the class description!" },
        ]}
      >
        <TextArea rows={4} placeholder="Enter class description" />
      </Form.Item>
    </>
  );
};

export default TitleDescription;
