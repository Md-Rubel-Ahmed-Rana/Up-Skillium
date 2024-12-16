import { useGetAllLessonsQuery } from "@/features/lesson";
import { IGetLesson } from "@/types/lesson.type";
import LessonTable from "../lessons";

const ManageLessons = () => {
  const { data, isLoading } = useGetAllLessonsQuery({});
  const lessons = data?.data as IGetLesson[];

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Manage Lessons</h2>
      <LessonTable isLoading={isLoading} lessons={lessons} />
    </div>
  );
};

export default ManageLessons;
