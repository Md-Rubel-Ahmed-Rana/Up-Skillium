import { useGetAllReviewedAssignmentsQuery } from "@/features/assignmentSubmission";
import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import ReviewedAssignmentTable from "../reviewedAssignments";

const ManageReviewedAssignments = () => {
  const { data, isLoading } = useGetAllReviewedAssignmentsQuery({});
  const assignments = data?.data as IAssignmentSubmission[];

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Reviewed Assignments
      </h2>
      <ReviewedAssignmentTable
        isLoading={isLoading}
        assignments={assignments}
      />
    </div>
  );
};

export default ManageReviewedAssignments;
