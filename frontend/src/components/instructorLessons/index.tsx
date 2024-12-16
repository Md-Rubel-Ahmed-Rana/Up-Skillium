import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllLessonsByInstructorQuery } from "@/features/lesson";
import { IGetLesson } from "@/types/lesson.type";
import { IUser } from "@/types/user.type";
import LessonTable from "../lessons";

const InstructorLessons = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetAllLessonsByInstructorQuery({
    instructorId: user?.id,
  });
  const lessons = data?.data as IGetLesson[];
  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">All Lessons</h2>
      <LessonTable isLoading={isLoading} lessons={lessons} />
    </div>
  );
};

export default InstructorLessons;
