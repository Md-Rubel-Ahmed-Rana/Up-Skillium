import { useGetInstructorPendingAssignmentsQuery } from "@/features/assignmentSubmission";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { IUser } from "@/types/user.type";
import PendingAssignmentTable from "../pendingAssignment";

const InstructorPendingAssignments = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetInstructorPendingAssignmentsQuery({
    instructorId: user?.id,
  });
  const assignments = data?.data as IAssignmentSubmission[];
  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Pending Assignments
      </h2>
      <PendingAssignmentTable assignments={assignments} isLoading={isLoading} />
    </div>
  );
};

export default InstructorPendingAssignments;
