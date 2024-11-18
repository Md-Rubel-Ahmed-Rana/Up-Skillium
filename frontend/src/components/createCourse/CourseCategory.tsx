import { Form, Select } from "antd/lib";

const CourseCategory = () => {
  return (
    <Form.Item
      label="Category"
      name="category"
      rules={[{ required: true, message: "Please select a category" }]}
    >
      <Select placeholder="Select category" className="w-full">
        <Select.Option value="webDevelopment">Web Development</Select.Option>
        <Select.Option value="graphicDesign">Graphic Design</Select.Option>
        <Select.Option value="digitalMarketing">
          Digital Marketing
        </Select.Option>
        {/* Add more categories as needed */}
      </Select>
    </Form.Item>
  );
};

export default CourseCategory;
