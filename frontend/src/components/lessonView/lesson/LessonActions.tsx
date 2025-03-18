import { useGetLoggedInUserQuery } from "@/features/auth";
import { useMarkLessonAsCompletedMutation } from "@/features/myCourse";
import { ILesson } from "@/types/lesson.type";
import { IUser } from "@/types/user.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { Button } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {
  lessons: ILesson[];
  completedLessons: string[];
};

const LessonActions = ({ lessons, completedLessons }: Props) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [lessonMarkComplete] = useMarkLessonAsCompletedMutation();
  const { query, push } = useRouter();
  const lessonId = query?.lessonId as string;
  const courseId = query?.courseId as string;

  const currentLessonIndex = lessons?.findIndex((ls) => ls?.id === lessonId);

  const navigateToLesson = (lessonIndex: number) => {
    const lesson = lessons[lessonIndex];
    if (lesson) {
      const routePath = `/classes/course/${courseId}/module/${
        lesson.module
      }/lesson/${lesson.id}/${makeLessonTitleAsParamsUrl(lesson.title)}`;
      push(routePath);

      if (!completedLessons.includes(lesson?.id)) {
        markLessonAsCompleted(lesson?.id);
      }
    }
  };

  const markLessonAsCompleted = async (lessonId: string) => {
    try {
      await lessonMarkComplete({
        userId: user?.id,
        courseId,
        lessonId: lessonId,
      });
    } catch (error: any) {
      toast.error(
        `Failed to mark lesson as complete. Retrying: ${error?.message}`
      );
      await lessonMarkComplete({
        userId: user?.id,
        courseId,
        lessonId: lessonId,
      });
    }
  };

  return (
    <div className="flex items-center lg:justify-end justify-between gap-2 mt-3">
      <Button
        onClick={() => navigateToLesson(currentLessonIndex - 1)}
        disabled={currentLessonIndex === 0}
      >
        Previous
      </Button>
      <Button
        onClick={() => navigateToLesson(currentLessonIndex + 1)}
        className="px-8"
        type="primary"
        disabled={currentLessonIndex === lessons.length - 1}
      >
        Next
      </Button>
    </div>
  );
};

export default LessonActions;
