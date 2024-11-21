import { useDeleteQuizMutation } from "@/features/quiz";
import { IGetQuizQuestion } from "@/types/quiz.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  quiz: IGetQuizQuestion;
};

const QuizDeleteModal = ({ quiz }: Props) => {
  const [open, setOpen] = useState(false);
  const [updateQuiz, { isLoading }] = useDeleteQuizMutation();

  const handleDeleteQuiz = async () => {
    try {
      const result: any = await updateQuiz({
        quizId: quiz?.id,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Quiz updated successfully!");
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete quiz."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete quiz. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button danger type="primary" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Delete Quiz"
        okText="Delete"
        onOk={handleDeleteQuiz}
        okButtonProps={{
          disabled: isLoading,
          loading: isLoading,
          iconPosition: "end",
        }}
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
      >
        <p className="text-gray-600 text-md my-5 font-semibold">
          Are you sure you want to delete the quiz : {quiz?.question}?
        </p>
      </Modal>
    </>
  );
};

export default QuizDeleteModal;
