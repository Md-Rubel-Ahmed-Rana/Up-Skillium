import LessonViewContainer from "@/components/lessonView";
import CourseModules from "@/components/moduleList";
import { useMediaQuery } from "react-responsive";

const CourseModuleLayout = () => {
  const isLargeDevice = useMediaQuery({ minWidth: "768px" });
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between gap-5  mt-5 min-h-screen p-2">
      <div style={{ maxWidth: isLargeDevice ? "35%" : "100%", width: "100%" }}>
        <CourseModules />
      </div>
      <div style={{ maxWidth: isLargeDevice ? "65%" : "100%", width: "100%" }}>
        <LessonViewContainer />
      </div>
    </div>
  );
};

export default CourseModuleLayout;
