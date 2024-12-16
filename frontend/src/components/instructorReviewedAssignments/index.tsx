import { useGetInstructorCompleteAssignmentsQuery } from "@/features/assignmentSubmission";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { IUser } from "@/types/user.type";
import ReviewedAssignmentTable from "../reviewedAssignments";

const InstructorReviewedAssignments = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetInstructorCompleteAssignmentsQuery({
    instructorId: user?.id,
  });
  const assignments = data?.data as IAssignmentSubmission[];
  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Reviewed Assignments
      </h2>
      <ReviewedAssignmentTable
        assignments={assignments}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InstructorReviewedAssignments;
