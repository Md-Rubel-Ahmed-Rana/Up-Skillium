import { ILesson } from "@/types/lesson.type";
import QuestionContainer from "./QuestionContainer";
import { useState } from "react";

type Props = {
  lesson: ILesson;
};

const LessonQuiz = ({ lesson }: Props) => {
  const [showQuestions, setShowQuestions] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <h6 className="font-semibold">Content: </h6>
        <h6 className="font-semibold">
          Total Questions: {lesson?.quizQuestions?.length}
        </h6>
        <p>
          <button
            onClick={() => setShowQuestions((prev) => !prev)}
            className="px-2 py-1 rounded-md ring-1 font-semibold hover:bg-blue-300"
          >
            See Quizzes
          </button>
        </p>
      </div>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: lesson?.content }}
      />
      {showQuestions && <QuestionContainer lesson={lesson} />}
    </div>
  );
};

export default LessonQuiz;
