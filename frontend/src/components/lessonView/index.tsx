import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetCourseProgressQuery } from "@/features/studentProgress";
import {
  ICourseProgress,
  ILessonProgress,
  IModuleProgress,
} from "@/types/studentProgress.type";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import LessonContainer from "./lesson/LessonContainer";

const LessonViewContainer = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const lessonId = query?.lessonId as string;
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
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
  const findCurrentLesson = lessons.find((ls) => ls?.lesson?.id === lessonId);

  return (
    <div>
      <LessonContainer
        currentLesson={findCurrentLesson as ILessonProgress}
        lessons={lessons as ILessonProgress[]}
      />
    </div>
  );
};

export default LessonViewContainer;
