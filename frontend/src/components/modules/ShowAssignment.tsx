import { ILesson } from "@/types/lesson.type";
import { useState } from "react";
import AssignmentSubmitForm from "./AssignmentSubmitForm";

type Props = {
  lesson: ILesson;
};

const ShowAssignment = ({ lesson }: Props) => {
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {isSubmit ? (
        <AssignmentSubmitForm setIsSubmit={setIsSubmit} />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Assignment: {lesson?.title}
          </h1>
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Assignment Details:
            </h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: lesson?.content }}
            />
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsSubmit(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit Assignment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowAssignment;
