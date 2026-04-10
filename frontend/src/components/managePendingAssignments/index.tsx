import { useGetAllPendingAssignmentsQuery } from "@/features/assignmentSubmission";
import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import PendingAssignmentTable from "../pendingAssignment";

const ManagePendingAssignments = () => {
  const { data, isLoading } = useGetAllPendingAssignmentsQuery({});
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

export default ManagePendingAssignments;
