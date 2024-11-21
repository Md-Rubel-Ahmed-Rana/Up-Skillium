import { UploadOutlined } from "@ant-design/icons/lib";
import { Button, Form, Input, InputNumber, Upload } from "antd/lib";
import { useRouter } from "next/router";

const AssignmentOrInstructionForm = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const type = query?.type as "video" | "quiz" | "assignment" | "instruction";

  const handleSubmitLesson = async (values: any) => {
    const formData = new FormData();
    const newLesson: any = {
      title: values?.title,
      serial: values?.serial,
      module: moduleId,
      type: type,
      videoLength: values?.videoLength,
      video: values?.video[0]?.originFileObj,
    };
    for (const key in newLesson) {
      const value = newLesson[key];

      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    }
    console.log(newLesson);
  };

  return (
    <div className="w-full max-w-xl mx-auto border shadow-md p-5 rounded-md">
      <h2 className="text-xl font-extrabold text-center">
        Create {type} lesson
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitLesson}
        className="space-y-6"
      >
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
          className="w-full"
          rules={[{ required: true, message: "Serial number is required" }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Please enter serial number"
          />
        </Form.Item>
        <Form.Item
          label="Video length (Minutes)"
          name="videoLength"
          className="w-full"
          rules={[{ required: true, message: "Video length is required" }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Please enter video length"
          />
        </Form.Item>
        <Form.Item
          label="Lesson video"
          name="video"
          valuePropName="fileList"
          className="w-full"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload video" }]}
        >
          <Upload
            accept="video/*"
            maxCount={1}
            listType="picture-card"
            className="w-full"
            beforeUpload={() => false}
          >
            <UploadOutlined className="text-3xl text-blue-500" />
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full bg-blue-500 hover:bg-blue-600"
            iconPosition="end"
          >
            Create lesson
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignmentOrInstructionForm;
