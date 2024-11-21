import { useUpdateQuizMutation } from "@/features/quiz";
import { IGetQuizQuestion } from "@/types/quiz.type";
import { Button, Form, Input, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  quiz: IGetQuizQuestion;
};

const QuizUpdateModal = ({ quiz }: Props) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateQuiz, { isLoading }] = useUpdateQuizMutation();

  const handleEditQuiz = async (values: IGetQuizQuestion) => {
    const updatedData: IGetQuizQuestion = {
      ...quiz,
      question: values?.question,
      correctAnswer: values?.correctAnswer,
      options: values?.options,
    };
    try {
      const result: any = await updateQuiz({
        quizId: updatedData?.id,
        updatedQuiz: updatedData,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Quiz updated successfully!");
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update quiz."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update quiz. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Edit Quiz"
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditQuiz}
          className="space-y-6"
          initialValues={quiz}
        >
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: "Question is required" }]}
          >
            <Input name="question" value={quiz?.question} />
          </Form.Item>
          <Form.Item
            label="Correct answer"
            name="correctAnswer"
            rules={[{ required: true, message: "Correct answer is required" }]}
          >
            <Input name="correctAnswer" value={quiz?.correctAnswer} />
          </Form.Item>

          <Form.Item
            label="Options"
            name="options"
            rules={[{ required: true, message: "Options are required" }]}
          >
            {quiz?.options?.map((option, index) => (
              <Input key={index} value={option} />
            ))}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-blue-500 hover:bg-blue-600"
              iconPosition="end"
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default QuizUpdateModal;
