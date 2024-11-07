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

const ModulesClasses = () => {
  const [lessonId, setLessonId] = useState<string>("");
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { query } = useRouter();
  const courseId = query?.id as string;
  const { data: courseData } = useGetCourseProgressQuery({
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
    <div className="flex justify-between gap-5 mt-5 min-h-screen p-2">
      <div className="w-4/12 hidden lg:block">
        <ModuleList
          setLessonId={setLessonId}
          lessonId={lessonId}
          course={course}
        />
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
