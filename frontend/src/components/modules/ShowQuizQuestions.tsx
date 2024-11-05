import { ILesson } from "@/types/lesson.type";
import { useEffect, useState } from "react";
import { Button } from "antd/lib";
import toast from "react-hot-toast";

type Props = {
  lesson: ILesson;
};

const ShowQuizQuestions = ({ lesson }: Props) => {
  const questions = lesson?.quizQuestions;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [question, setQuestion] = useState(questions[currentIndex]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmitQuiz = () => {
    toast.success("Quiz submitted");
  };

  useEffect(() => {
    setQuestion(questions[currentIndex]);
  }, [currentIndex, questions]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-left py-2 px-4 border rounded-lg ${
              selectedOption === option
                ? "bg-blue-500 text-white border-blue-500"
                : "border-gray-300 hover:bg-blue-100"
            }`}
          >
            {option}
          </button>
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
