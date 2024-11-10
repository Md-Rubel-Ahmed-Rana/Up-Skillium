import CourseProgressLessonCountSkeleton from "./CourseProgressLessonCountSkeleton";
import LessonSearchSkeleton from "./LessonSearchSkeleton";

const ModuleListSkeleton = () => {
  return (
    <div className="border rounded-md">
      <CourseProgressLessonCountSkeleton />
      <LessonSearchSkeleton />
    </div>
  );
};

export default ModuleListSkeleton;
