import { useGetSubmittedAssignmentQuery } from "@/features/assignmentSubmission";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { ILesson } from "@/types/lesson.type";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import AssignmentSubmitForm from "./AssignmentSubmitForm";
import ShowAssignmentResult from "./ShowAssignmentResult";

type Props = {
  lesson: ILesson;
};

const ShowAssignment = ({ lesson }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data } = useGetSubmittedAssignmentQuery({
    userId: user?.id,
    lessonId: lesson?.id,
  });
  const assignment = data?.data as IAssignmentSubmission;
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <>
      {assignment ? (
        <ShowAssignmentResult assignment={assignment} />
      ) : (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          {isSubmit ? (
            <AssignmentSubmitForm setIsSubmit={setIsSubmit} lesson={lesson} />
          ) : (
            <>
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
      )}
    </>
  );
};

export default ShowAssignment;
