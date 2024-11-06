import { useRouter } from "next/router";
import { Collapse, CollapseProps } from "antd/lib";
import Lesson from "./Lesson";
import { ILesson } from "@/types/lesson.type";
import { IUser } from "@/types/user.type";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetCourseProgressQuery } from "@/features/studentProgress";
import { ICourseProgress, IModuleProgress } from "@/types/studentProgress.type";
import ShowCourseCompletedProgress from "./ShowCourseCompletedProgress";
import LessonCount from "./LessonCount";

type Props = {
  setCurrentLesson: (lesson: ILesson) => void;
  currentLesson: ILesson | null;
};

const ModuleList = ({ setCurrentLesson, currentLesson }: Props) => {
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
    label: `Module-${index + 1} : ${module?.module?.title}`,
    children: (
      <div className="flex flex-col gap-2">
        {module?.lessons?.map((lesson) => (
          <Lesson
            key={lesson?.lesson?.id}
            lesson={lesson}
            setCurrentLesson={setCurrentLesson}
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
      <Collapse
        items={moduleList}
        defaultActiveKey={[currentLesson?.module as string]}
      />
    </div>
  );
};

export default ModuleList;
