import { useState } from "react";
import LessonContainer from "./LessonContainer";
import ModuleList from "./ModuleList";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import { useGetCourseProgressQuery } from "@/features/studentProgress";
import {
  ICourseProgress,
  ILessonProgress,
  IModuleProgress,
} from "@/types/studentProgress.type";
import ModuleListSkeleton from "@/skeletons/moduleListSkeleton";

const ModulesClasses = () => {
  const [lessonId, setLessonId] = useState<string>("");
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { query } = useRouter();
  const courseId = query?.id as string;
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

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between lg:gap-5 gap-20 mt-5 min-h-screen p-2">
      <div className="w-full lg:w-4/12">
        {!isLoading ? (
          <ModuleListSkeleton />
        ) : (
          <ModuleList
            setLessonId={setLessonId}
            lessonId={lessonId}
            course={course}
          />
        )}
      </div>
      <div className="lg:w-8/12 w-full">
        <LessonContainer
          lessonId={lessonId || course?.lastCompletedLesson?.id}
          setLessonId={setLessonId}
          lessons={lessons}
        />
      </div>
    </div>
  );
};

export default ModulesClasses;
