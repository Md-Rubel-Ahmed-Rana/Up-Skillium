import { useCreateQuizLessonMutation } from "@/features/lesson";
import { ICreateQuizLesson } from "@/types/lesson.type";
import { Button, Form, Input, InputNumber } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import CreateQuizQuestions from "./CreateQuizQuestions";

const CreateQuizLesson = () => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const moduleId = query?.moduleId as string;
  const [createLesson, { isLoading }] = useCreateQuizLessonMutation();

  const handleSubmitLesson = async (values: any) => {
    const quizLesson: ICreateQuizLesson = {
      ...values,
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
            "Failed to create quiz lesson."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create quiz lesson. Error: ${error?.message}`);
    }
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

export default CreateQuizLesson;
