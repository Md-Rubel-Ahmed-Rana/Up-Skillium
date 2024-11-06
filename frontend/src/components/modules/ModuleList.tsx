import { Collapse, CollapseProps } from "antd/lib";
import Lesson from "./Lesson";
import { ICourseProgress, IModuleProgress } from "@/types/studentProgress.type";
import ShowCourseCompletedProgress from "./ShowCourseCompletedProgress";
import LessonCount from "./LessonCount";

type Props = {
  setLessonId: (lessonId: string) => void;
  lessonId: string;
  course: ICourseProgress;
};

const ModuleList = ({ lessonId, setLessonId, course }: Props) => {
  const modules = course?.modules as IModuleProgress[];

  const moduleList: CollapseProps["items"] = modules?.map((module, index) => ({
    key: module?.module?.id,
    label: (
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">
          Module-{index + 1} : {module?.module?.title}
        </h4>
        <span>{module?.lessons?.length}</span>
      </div>
    ),
    children: (
      <div className="flex flex-col gap-2">
        {module?.lessons?.map((lesson, index) => (
          <Lesson
            key={lesson?.lesson?.id}
            lesson={lesson}
            setLessonId={setLessonId}
            index={index}
          />
        ))}
      </div>
    ),
  }));

  return (
    <div className="h-[90%] border rounded-lg overflow-y-auto">
      <div className="flex justify-between bg-green-600 text-white items-center p-2">
        <ShowCourseCompletedProgress
          percentage={course?.completionPercentage}
        />
        <LessonCount modules={modules} />
      </div>
      <Collapse items={moduleList} defaultActiveKey={[lessonId]} />
    </div>
  );
};

export default ModuleList;
