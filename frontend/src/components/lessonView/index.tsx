import { useGetLoggedInUserQuery } from "@/features/auth";

import { useGetModulesByCourseIdQuery } from "@/features/module";
import { useGetMySingleCourseQuery } from "@/features/myCourse";
import { ILesson } from "@/types/lesson.type";
import { IModule } from "@/types/module.type";
import { IMyCourse } from "@/types/myCourse.type";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import LessonContainer from "./lesson/LessonContainer";

const LessonViewContainer = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;

  const { data: mySingleCourseData } = useGetMySingleCourseQuery({
    userId: user?.id,
    courseId,
  });
  const myCourse = mySingleCourseData?.data as IMyCourse;

  const { data: modulesData } = useGetModulesByCourseIdQuery({
    courseId,
  });

  const modules = modulesData?.data?.modules as IModule[];

  const lessons: ILesson[] = [];

  modules?.forEach((module) => {
    module?.lessons?.forEach((lesson) => {
      lessons.push(lesson);
    });
  });

  return (
    <div>
      <LessonContainer
        lessons={lessons}
        completedLessons={myCourse?.completedLessons}
      />
    </div>
  );
};

export default LessonViewContainer;
