import { ICreateLesson } from "@/types/lesson.type";
import { Button, Form, Input, InputNumber } from "antd/lib";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AssignmentOrInstructionForm = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const [content, setContent] = useState<string | null>(null);
  const moduleId = query?.moduleId as string;
  const type = query?.type as "video" | "quiz" | "assignment" | "instruction";

  const handleSubmitLesson = async (values: ICreateLesson) => {
    const newLesson: ICreateLesson = {
      title: values?.title,
      serial: values?.serial,
      content: values?.content,
      module: moduleId,
      type: type,
    };
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
          label="Content"
          name="content"
          rules={[{ required: true, message: "Lesson content is required" }]}
        >
          <ReactQuill
            theme="snow"
            placeholder="Write your lesson content here..."
            className="bg-white rounded-lg shadow-sm"
            onChange={(value) => setContent(value)}
            value={content as string}
          />
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
