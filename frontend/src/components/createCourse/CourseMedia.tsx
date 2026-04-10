import { UploadOutlined } from "@ant-design/icons/lib";
import { Button, Form, Upload } from "antd/lib";

const CourseMedia = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
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
          <Button className="w-full" icon={<UploadOutlined />}>
            Upload Image
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Introductory Video"
        name="introductoryVideo"
        valuePropName="fileList"
        className="w-full"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[
          { required: true, message: "Please upload an introductory video" },
        ]}
      >
        <Upload
          accept="video/*"
          maxCount={1}
          listType="picture"
          className="w-full"
          beforeUpload={() => false}
        >
          <Button className="w-full" icon={<UploadOutlined />}>
            Upload Video
          </Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default CourseMedia;
