import { useGetLoggedInUserQuery } from "@/features/auth";
import {
  useGetSubmittedQuizResultQuery,
  useSubmitQuizMutation,
} from "@/features/quizSubmission";
import { ILesson } from "@/types/lesson.type";
import { IQuizSubmissionResult } from "@/types/quizSubmission.type";
import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShowQuizResult from "./ShowQuizResult";

type Props = {
  lesson: ILesson;
};

type ISelectedAnswers = {
  id: string;
  answer: string;
};

const ShowQuizQuestions = ({ lesson }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data } = useGetSubmittedQuizResultQuery({
    userId: user?.id,
    lessonId: lesson?.id,
  });
  const result = data?.data as IQuizSubmissionResult;
  const [submitQuiz, { isLoading }] = useSubmitQuizMutation();

  const questions = lesson?.quizQuestions;
  const [selectedAnswers, setSelectedAnswers] = useState<ISelectedAnswers[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState(questions[currentIndex]);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    const selectedAnswer = { id: question.id, answer: option };
    setSelectedAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.id === question.id
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = selectedAnswer;
        return updatedAnswers;
      } else {
        return [...prevAnswers, selectedAnswer];
      }
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      const res: any = await submitQuiz({
        userId: user?.id,
        lessonId: lesson?.id,
        data: selectedAnswers,
      });
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message || "Quiz submitted successfully!");
      } else {
        toast.error(
          res?.error?.message ||
            res?.error?.data?.message ||
            res?.data?.error?.message ||
            "Failed to submit quiz"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit quiz");
    }
  };

  useEffect(() => {
    setQuestion(questions[currentIndex]);
    setSelectedOption(
      selectedAnswers.find((answer) => answer.id === question?.id)?.answer ||
        null
    );
  }, [currentIndex, questions, selectedAnswers, question?.id]);

  return (
    <>
      {result ? (
        <ShowQuizResult result={result} />
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{question?.question}</h2>
          <div className="flex flex-col justify-start items-start space-y-3 text-center">
            {question?.options?.map((option, index) => (
              <Button
                key={index}
                type={`${selectedOption === option ? "primary" : "default"}`}
                onClick={() => handleSelectOption(option)}
                className={`w-full flex justify-start items-start`}
              >
                {option}
              </Button>
            ))}
          </div>
          <div className="text-right my-2 pt-4">
            {currentIndex === questions?.length - 1 ? (
              <Button
                disabled={!selectedOption || isLoading}
                onClick={handleSubmitQuiz}
                type="primary"
                loading={isLoading}
                iconPosition="end"
              >
                {isLoading ? "submitting..." : "Submit"}
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                type="primary"
                disabled={!selectedOption}
              >
                Go Next
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShowQuizQuestions;
