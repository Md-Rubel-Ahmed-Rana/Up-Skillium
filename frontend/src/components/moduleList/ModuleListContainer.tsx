/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse, CollapseProps } from "antd/lib";
import {
  ICourseProgress,
  ILessonProgress,
  IModuleProgress,
} from "@/types/studentProgress.type";
import LessonItem from "./LessonItem";
import ShowCourseCompletedProgress from "./ShowCourseCompletedProgress";
import LessonCount from "./LessonCount";
import LessonSearch from "./LessonSearch";
import { useRouter } from "next/router";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetCourseProgressQuery } from "@/features/studentProgress";
import { IUser } from "@/types/user.type";
import ModuleListSkeleton from "@/skeletons/moduleListSkeleton";

const ModuleListContainer = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data: courseData, isLoading } = useGetCourseProgressQuery({
    userId: user?.id,
    courseId: courseId,
  });
  const course = courseData?.data as ICourseProgress;
  const modules = course?.modules as IModuleProgress[];
  const lessons: ILessonProgress[] = [];

  modules?.forEach((module) => {
    module?.lessons?.forEach((lesson) => {
      lessons.push(lesson);
    });
  });

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
          <LessonItem
            key={lesson?.lesson?.id}
            lesson={lesson}
            index={index}
            courseId={course?.course?.id}
            moduleId={module?.module?.id}
            lessons={lessons}
            lastCompletedLesson={course?.lastCompletedLesson}
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
              percentage={course?.completionPercentage}
            />
            <LessonCount modules={modules} />
          </div>
          <LessonSearch lessons={lessons} />
          <Collapse
            items={moduleList}
            defaultActiveKey={[course?.lastCompletedLesson?.module]}
          />
        </div>
      )}
    </>
  );
};

export default ModuleListContainer;
