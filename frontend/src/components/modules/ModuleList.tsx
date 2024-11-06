import { useRouter } from "next/router";
import { Collapse, CollapseProps } from "antd/lib";
import Lesson from "./Lesson";
import { IUser } from "@/types/user.type";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetCourseProgressQuery } from "@/features/studentProgress";
import { ICourseProgress, IModuleProgress } from "@/types/studentProgress.type";
import ShowCourseCompletedProgress from "./ShowCourseCompletedProgress";
import LessonCount from "./LessonCount";

type Props = {
  setLessonId: (lessonId: string) => void;
  lessonId: string;
};

const ModuleList = ({ lessonId, setLessonId }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { query } = useRouter();
  const courseId = query?.id as string;
  const { data: courseData } = useGetCourseProgressQuery({
    userId: user?.id,
    courseId: courseId,
  });

  const course = courseData?.data as ICourseProgress;

  const modules = courseData?.data?.modules as IModuleProgress[];

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
