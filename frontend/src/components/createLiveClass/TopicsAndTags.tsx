import { Form, Select } from "antd/lib";
const { Option } = Select;

const TopicsAndTags = () => {
  return (
    <>
      <Form.Item
        name="topics"
        label={`Topics (comma separated)`}
        rules={[
          { required: true, message: "Please select at least one topic!" },
        ]}
      >
        <Select
          mode="tags"
          placeholder="Enter or select topics"
          className="w-full"
          tokenSeparators={[","]}
        >
          <Option value="React">React</Option>
          <Option value="JavaScript">JavaScript</Option>
          <Option value="CSS">CSS</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="tags"
        label={`Tags (comma separated)`}
        rules={[{ required: true, message: "Please select at least one tag!" }]}
      >
        <Select
          mode="tags"
          placeholder="Enter or select tags"
          className="w-full"
          tokenSeparators={[","]}
        >
          <Option value="Live">Live</Option>
          <Option value="Education">Education</Option>
          <Option value="Web Development">Web Development</Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default TopicsAndTags;
