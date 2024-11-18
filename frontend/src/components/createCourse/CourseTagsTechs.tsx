import { Form, Select } from "antd/lib";

const CourseTagsTechs = () => {
  return (
    <>
      <Form.Item
        label="Tags (Separate by comma)"
        name="tags"
        rules={[{ required: true, message: "Please add at least one tag" }]}
      >
        <Select
          mode="tags"
          placeholder="Add tags"
          className="w-full"
          tokenSeparators={[","]}
        />
      </Form.Item>

      {/* Technologies */}
      <Form.Item
        label="Technologies (Separate by comma)"
        name="technologies"
        rules={[
          {
            required: true,
            message: "Please specify at least one technology",
          },
        ]}
      >
        <Select
          mode="tags"
          placeholder="Add technologies"
          className="w-full"
          tokenSeparators={[","]}
        />
      </Form.Item>
    </>
  );
};

export default CourseTagsTechs;
