import { useCreateAssignmentOrInstructionLessonMutation } from "@/features/lesson";
import { ICreateQuizLesson } from "@/types/lesson.type";
import { Button, Form, Input, InputNumber } from "antd/lib";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ModuleDropdown from "./ModuleDropdown";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateAssignment = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const [createAssignment, { isLoading }] =
    useCreateAssignmentOrInstructionLessonMutation();

  const handleCreateAssignment = async (values: any) => {
    const assignment: ICreateQuizLesson = {
      ...values,
      type: "assignment",
      module: moduleId || values?.module,
    };
    try {
      const result: any = await createAssignment({ data: assignment });
      if (result?.data?.statusCode === 201) {
        toast.success(
          result?.data?.message || "Assignment created successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create assignment."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create assignment. Error: ${error?.message}`);
    }
  };

  return (
    <div className="w-full  lg:mt-3 pb-20 p-2">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Create Assignment
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateAssignment}
        className="lg:px-5 lg:pb-3 lg:shadow-md rounded-md"
      >
        <Form.Item
          label="Module"
          name="module"
          className="w-full"
          rules={[{ required: true, message: "Module is required" }]}
        >
          <ModuleDropdown form={form} />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          className="w-full"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Please enter lesson title" />
        </Form.Item>
        <Form.Item
          label="Serial"
          name="serial"
          rules={[{ required: true, message: "Serial number is required" }]}
          className="w-full"
        >
          <InputNumber
            className="w-full"
            placeholder="Please enter serial number"
          />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Content is required" }]}
        >
          <ReactQuill
            theme="snow"
            placeholder="Write your content here..."
            className="bg-white rounded-lg shadow-sm"
            onChange={(value) => form.setFieldValue("content", value)}
          />
        </Form.Item>
        <Form.Item className="mt-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full bg-blue-500 hover:bg-blue-600"
            iconPosition="end"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Quiz lesson"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAssignment;
