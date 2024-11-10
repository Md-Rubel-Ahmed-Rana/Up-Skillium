import LessonViewContainer from "@/components/lessonView";
import CourseModules from "@/components/moduleList";

const CourseModuleLayout = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between lg:gap-5 gap-20 mt-5 min-h-screen p-2">
      <div className="w-full lg:w-4/12">
        <CourseModules />
      </div>
      <div className="lg:w-8/12 w-full">
        <LessonViewContainer />
      </div>
    </div>
  );
};

export default CourseModuleLayout;
