import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllAssignmentByInstructorQuery } from "@/features/lesson";
import { IGetLesson as IAssignment } from "@/types/lesson.type";
import { IUser } from "@/types/user.type";
import AssignmentLessonTable from "../assignmentLessons";

const InstructorAssignmentLesson = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetAllAssignmentByInstructorQuery({
    instructorId: user?.id,
  });
  const assignments = data?.data as IAssignment[];
  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Assignments</h2>
      <AssignmentLessonTable assignments={assignments} isLoading={isLoading} />
    </div>
  );
};

export default InstructorAssignmentLesson;
