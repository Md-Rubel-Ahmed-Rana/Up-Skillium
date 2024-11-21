import { Button, Form, Input, InputNumber } from "antd/lib";
import { useRouter } from "next/router";
import CreateQuizQuestions from "./CreateQuizQuestions";

const CreateQuizLesson = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;

  const handleSubmitLesson = async (values: any) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-2xl mx-auto border shadow-md p-5 rounded-md">
      <h2 className="text-xl font-extrabold text-center">Create quiz lesson</h2>

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
          label="Description"
          name="content"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input placeholder="Please enter lesson title" />
        </Form.Item>
        <CreateQuizQuestions form={form} />
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

export default CreateQuizLesson;
