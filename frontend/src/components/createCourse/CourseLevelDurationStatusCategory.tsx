import { Form, Input, Select } from "antd/lib";
import CourseCategory from "./CourseCategory";

const CourseLevelDurationStatusCategory = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <CourseCategory />
      <Form.Item
        label="Level"
        name="level"
        rules={[{ required: true, message: "Please select the course level" }]}
      >
        <Select placeholder="Select level" className="w-full">
          <Select.Option value="beginner">Beginner</Select.Option>
          <Select.Option value="intermediate">Intermediate</Select.Option>
          <Select.Option value="advanced">Advanced</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Duration"
        name="duration"
        rules={[
          { required: true, message: "Please enter the course duration" },
        ]}
      >
        <Input placeholder="e.g., 10 hours" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select the course status" }]}
      >
        <Select placeholder="Select status" className="w-full">
          <Select.Option value="draft">Draft</Select.Option>
          <Select.Option value="published">Published</Select.Option>
          <Select.Option value="archived">Archived</Select.Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default CourseLevelDurationStatusCategory;
