/* eslint-disable react-hooks/exhaustive-deps */
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetModulesByCourseIdQuery } from "@/features/module";
import { useGetMySingleCourseQuery } from "@/features/myCourse";
import ModuleListSkeleton from "@/skeletons/moduleListSkeleton";
import { ILesson } from "@/types/lesson.type";
import { IModule } from "@/types/module.type";
import { IMyCourse } from "@/types/myCourse.type";
import { IUser } from "@/types/user.type";
import { Collapse, CollapseProps } from "antd/lib";
import { useRouter } from "next/router";
import LessonCount from "./LessonCount";
import LessonItem from "./LessonItem";
import LessonSearch from "./LessonSearch";
import ShowCourseCompletedProgress from "./ShowCourseCompletedProgress";

const ModuleListContainer = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data: mySingleCourseData } = useGetMySingleCourseQuery({
    userId: user?.id,
    courseId,
  });
  const myCourse = mySingleCourseData?.data as IMyCourse;

  const { data: modulesData, isLoading } = useGetModulesByCourseIdQuery({
    courseId,
  });

  const modules = modulesData?.data?.modules as IModule[];

  const lessons: ILesson[] = [];

  modules?.forEach((module) => {
    module?.lessons?.forEach((lesson) => {
      lessons.push(lesson);
    });
  });

  const moduleList: CollapseProps["items"] = modules?.map((module, index) => ({
    key: module?.id,
    label: (
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">
          Module-{index + 1} : {module?.title}
        </h4>
        <span>{module?.lessons?.length}</span>
      </div>
    ),
    children: (
      <div className="flex flex-col gap-2">
        {module?.lessons?.map((lesson, index) => (
          <LessonItem
            key={lesson?.id}
            lesson={lesson}
            index={index}
            lastCompletedLesson={myCourse?.lastCompletedLesson}
            completedLessons={myCourse?.completedLessons}
            nextLesson={myCourse?.nextLesson}
          />
        ))}
      </div>
    ),
  }));

  return (
    <>
      {isLoading ? (
        <ModuleListSkeleton />
      ) : (
        <div className="h-[90%] border rounded-lg overflow-y-auto">
          <div className="flex justify-between bg-green-600 text-white items-center px-2 py-3">
            <ShowCourseCompletedProgress
              percentage={myCourse?.completionPercentage}
            />
            <LessonCount
              totalLessons={lessons?.length || 0}
              completedLessons={myCourse?.completedLessons?.length || 0}
            />
          </div>
          <LessonSearch lessons={lessons} />
          <Collapse
            items={moduleList}
            defaultActiveKey={[myCourse?.lastCompletedLesson?.module]}
          />
        </div>
      )}
    </>
  );
};

export default ModuleListContainer;
