import CourseProgressLessonCountSkeleton from "./CourseProgressLessonCountSkeleton";
import LessonListSkeleton from "./LessonListSkeleton";
import LessonSearchSkeleton from "./LessonSearchSkeleton";
import ModuleSkeleton from "./ModuleSkeleton";

const ModuleListSkeleton = () => {
  return (
    <div className="border rounded-md h-screen overflow-y-auto">
      <CourseProgressLessonCountSkeleton />
      <LessonSearchSkeleton />
      <ModuleSkeleton />
      <LessonListSkeleton />
      <ModuleSkeleton />
      <LessonListSkeleton />
      <ModuleSkeleton />
      <LessonListSkeleton />
    </div>
  );
};

export default ModuleListSkeleton;
