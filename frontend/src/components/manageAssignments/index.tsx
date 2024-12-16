import { useGetAllAssignmentsQuery } from "@/features/assignment";
import { IGetLesson as IAssignment } from "@/types/lesson.type";
import AssignmentLessonTable from "../assignmentLessons";

const ManageAssignments = () => {
  const { data, isLoading } = useGetAllAssignmentsQuery({});
  const assignments = data?.data as IAssignment[];

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Manage Assignments
      </h2>
      <AssignmentLessonTable assignments={assignments} isLoading={isLoading} />
    </div>
  );
};

export default ManageAssignments;
