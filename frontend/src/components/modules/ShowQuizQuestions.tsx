import { ILesson } from "@/types/lesson.type";
import { useEffect, useState } from "react";
import { Button } from "antd/lib";
import toast from "react-hot-toast";

type Props = {
  lesson: ILesson;
};

type ISelectedAnswers = {
  id: string;
  answer: string;
};

const ShowQuizQuestions = ({ lesson }: Props) => {
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

  const handleSubmitQuiz = () => {
    toast.success("Quiz submitted");
    console.log("Selected Answers:", selectedAnswers);
  };

  useEffect(() => {
    setQuestion(questions[currentIndex]);
    setSelectedOption(
      selectedAnswers.find((answer) => answer.id === question?.id)?.answer ||
        null
    );
  }, [currentIndex, questions, selectedAnswers, question?.id]);

  return (
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
          <Button onClick={handleSubmitQuiz} type="primary">
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            type="primary"
          >
            Go Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShowQuizQuestions;
