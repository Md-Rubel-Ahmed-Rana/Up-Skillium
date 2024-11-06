import { useState } from "react";
import LessonContainer from "./LessonContainer";
import ModuleList from "./ModuleList";

const ModulesClasses = () => {
  const [lessonId, setLessonId] = useState<string>("");
  return (
    <div className="flex justify-between gap-5 mt-5 min-h-screen p-2">
      <div className="w-4/12 hidden lg:block">
        <ModuleList setLessonId={setLessonId} lessonId={lessonId} />
      </div>
      <div className="lg:w-8/12 w-full">
        <LessonContainer lessonId={lessonId} />
      </div>
    </div>
  );
};

export default ModulesClasses;
