import { useCreateAssignmentOrInstructionLessonMutation } from "@/features/lesson";
import { ICreateAssignmentOrInstructionLesson } from "@/types/lesson.type";
import { Button, Form, Input, InputNumber } from "antd/lib";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AssignmentOrInstructionForm = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const type = query?.type as "video" | "quiz" | "assignment" | "instruction";
  const [createLesson, { isLoading }] =
    useCreateAssignmentOrInstructionLessonMutation();

  const handleSubmitLesson = async (
    values: ICreateAssignmentOrInstructionLesson
  ) => {
    const newLesson: ICreateAssignmentOrInstructionLesson = {
      title: values?.title,
      serial: values?.serial,
      content: values?.content,
      module: moduleId,
      type: type,
    };
    await handleCreateLesson(newLesson);
  };

  const handleCreateLesson = async (
    lesson: ICreateAssignmentOrInstructionLesson
  ) => {
    try {
      const result: any = await createLesson({ type: type, data: lesson });
      if (result?.data?.statusCode === 201) {
        toast.success(result?.data?.message || "Lesson created successfully!");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create lesson."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create lesson. Error: ${error?.message}`);
    }
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
            onChange={(value) => form.setFieldValue("content", value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full bg-blue-500 hover:bg-blue-600"
            iconPosition="end"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create lesson"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignmentOrInstructionForm;
