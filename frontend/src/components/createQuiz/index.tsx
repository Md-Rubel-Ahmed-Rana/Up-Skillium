import { useCreateQuizLessonMutation } from "@/features/lesson";
import { ICreateQuizLesson } from "@/types/lesson.type";
import { Button, Form, Input, InputNumber } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import CreateQuizQuestions from "./CreateQuizQuestions";
import ModuleDropdown from "./ModuleDropdown";

const CreateQuizLesson = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const [createLesson, { isLoading }] = useCreateQuizLessonMutation();

  const handleSubmitLesson = async (values: any) => {
    const quizLesson: ICreateQuizLesson = {
      ...values,
      type: "quiz",
      quizQuestions: values?.quizQuestions?.map((ques: any) => ({
        ...ques,
        module: moduleId,
      })),
    };
    await handleCreateQuizLesson(quizLesson);
  };

  const handleCreateQuizLesson = async (lesson: ICreateQuizLesson) => {
    try {
      const result: any = await createLesson({ data: lesson });
      if (result?.data?.statusCode === 201) {
        toast.success(
          result?.data?.message || "Quiz lesson created successfully!"
        );
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
    <div className="w-full  lg:mt-3 pb-20 p-2">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Create quiz lesson
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitLesson}
        className="lg:px-5 lg:pb-3 lg:shadow-md rounded-md"
      >
        <div className="flex flex-col lg:flex-row items-center lg:gap-5">
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
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:gap-5">
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
            label="Description"
            name="content"
            className="w-full"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input placeholder="Please enter lesson title" />
          </Form.Item>
        </div>

        <CreateQuizQuestions form={form} />
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

export default CreateQuizLesson;
