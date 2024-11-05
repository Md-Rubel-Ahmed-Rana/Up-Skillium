import { useGetModulesByCourseIdQuery } from "@/features/module";
import { IModule } from "@/types/module.type";
import { useRouter } from "next/router";
import { Collapse, CollapseProps } from "antd/lib";
import Lesson from "./Lesson";
import { ILesson } from "@/types/lesson.type";

type Props = {
  setCurrentLesson: (lesson: ILesson) => void;
  currentLesson: ILesson | null;
};

const ModuleList = ({ setCurrentLesson, currentLesson }: Props) => {
  const { query } = useRouter();
  const courseId = query?.id as string;
  const { data } = useGetModulesByCourseIdQuery({ courseId });
  const modules = (data?.data?.modules as IModule[]) || [];

  const moduleList: CollapseProps["items"] = modules?.map((module, index) => ({
    key: module?.id,
    label: `Module-${index + 1} : ${module?.title}`,
    children: (
      <div className="flex flex-col gap-2">
        {module?.lessons?.map((lesson) => (
          <Lesson
            key={lesson?.id}
            lesson={lesson}
            setCurrentLesson={setCurrentLesson}
          />
        ))}
      </div>
    ),
  }));

  return (
    <div className="h-screen border rounded-lg overflow-y-auto">
      <Collapse
        items={moduleList}
        defaultActiveKey={[currentLesson?.module as string]}
      />
    </div>
  );
};

export default ModuleList;
