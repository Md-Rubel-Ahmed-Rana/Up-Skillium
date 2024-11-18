import { Form, Input } from "antd/lib";

const CourseTitleDescription = () => {
  return (
    <>
      <Form.Item
        label="Course Title"
        name="title"
        rules={[{ required: true, message: "Please enter the course title" }]}
      >
        <Input placeholder="Enter course title" />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Course Description"
        name="description"
        rules={[
          { required: true, message: "Please enter the course description" },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Enter course description" />
      </Form.Item>
    </>
  );
};

export default CourseTitleDescription;
