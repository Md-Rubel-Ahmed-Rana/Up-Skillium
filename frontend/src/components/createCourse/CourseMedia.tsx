import { UploadOutlined } from "@ant-design/icons/lib";
import { Button, Form, Input, Upload } from "antd/lib";

const CourseMedia = () => {
  return (
    <div className="flex flex-col gap-5">
      <Form.Item
        label="Course Image"
        name="image"
        valuePropName="fileList"
        className="w-full"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload a course image" }]}
      >
        <Upload
          accept="image/*"
          maxCount={1}
          listType="picture"
          className="w-full"
          beforeUpload={() => false}
        >
          <Button
            className="w-full"
            icon={<UploadOutlined className="w-full" />}
          >
            Upload Image
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Introductory Video"
        name="introductoryVideo"
        className="w-full"
        rules={[
          {
            required: true,
            message: "Please enter the introductory video URL",
          },
        ]}
      >
        <Input placeholder="Enter video URL (e.g., YouTube link)" />
      </Form.Item>
    </div>
  );
};

export default CourseMedia;
