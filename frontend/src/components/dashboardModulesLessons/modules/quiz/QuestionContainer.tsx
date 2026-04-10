import { ILesson } from "@/types/lesson.type";
import { IQuizQuestion } from "@/types/quiz.type";
import { FiEdit, FiTrash } from "react-icons/fi";

type Props = {
  lesson: ILesson;
};

const QuestionContainer = ({ lesson }: Props) => {
  const questions = lesson?.quizQuestions as IQuizQuestion[];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        Quiz Questions ({questions.length})
      </h3>
      {questions.map((question, index) => (
        <div
          key={question?.id}
          className="border rounded-md shadow-sm p-4 hover:bg-gray-50 transition duration-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">
              {index + 1}. {question?.question}
            </h4>
            <div className="flex gap-2">
              <button
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={() => alert(`Edit question: ${question?.question}`)}
              >
                <FiEdit size={16} />
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={() => alert(`Delete question: ${question?.question}`)}
              >
                <FiTrash size={16} />
              </button>
            </div>
          </div>
          <div className="ml-6">
            <h5 className="font-medium mb-2">Options:</h5>
            <ul className="list-disc pl-5 text-gray-700">
              {question?.options.map((option, optIndex) => (
                <li key={optIndex} className="mb-1">
                  {option}
                  {option === question?.correctAnswer && (
                    <span className="ml-2 text-green-600 font-bold">
                      (Correct Answer)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionContainer;
