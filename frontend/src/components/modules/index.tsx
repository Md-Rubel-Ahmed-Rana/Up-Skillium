import { useState } from "react";
import LessonContainer from "./LessonContainer";
import ModuleList from "./ModuleList";
import { ILesson } from "@/types/lesson.type";

const ModulesClasses = () => {
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);
  return (
    <div className="flex justify-between gap-5 mt-5 min-h-screen p-2">
      <div className="w-4/12 hidden lg:block">
        <ModuleList
          setCurrentLesson={setCurrentLesson}
          currentLesson={currentLesson}
        />
      </div>
      <div className="lg:w-8/12 w-full">
        <LessonContainer lesson={currentLesson} />
      </div>
    </div>
  );
};

export default ModulesClasses;
