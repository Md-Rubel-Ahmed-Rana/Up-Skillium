import { useLessonMarkAsCompleteMutation } from "@/features/studentProgress";
import { ILesson } from "@/types/lesson.type";
import { ILessonDetails } from "@/types/studentProgress.type";
import { IUser } from "@/types/user.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

type LessonHandlerProps = {
  lessons: ILesson[];
  courseId: string;
  moduleId: string;
  user: IUser;
  lastCompletedLesson: ILessonDetails;
  completedLessons: string[];
};

const useLessonHandler = ({
  lessons,
  moduleId,
  user,
  lastCompletedLesson,
  completedLessons,
}: LessonHandlerProps) => {
  const [lessonMarkAsComplete] = useLessonMarkAsCompleteMutation();
  const { query, push } = useRouter();
  const lessonId = query?.lessonId as string;
  const courseId = query?.courseId as string;

  const handleChangeLesson = async (lesson: ILesson) => {
    const currentLessonIndex = lessons.findIndex((ls) => ls?.id === lessonId);
    const nextLessonIndex = currentLessonIndex + 1;
    const targetLessonIndex = lessons.findIndex((ls) => ls?.id === lesson?.id);
    const targetLesson = lessons.find((ls) => ls?.id === lesson?.id);
    const lastCompletedLessonIndex = lessons.findIndex(
      (ls) => ls?.id === lastCompletedLesson?.id
    );

    const routePath = `/classes/course/${courseId}/module/${moduleId}/lesson/${
      lesson?.id
    }/${makeLessonTitleAsParamsUrl(lesson?.title)}`;

    if (
      targetLessonIndex <= currentLessonIndex ||
      completedLessons.includes(targetLesson?.id as string)
    ) {
      push(routePath);
    } else if (targetLessonIndex === nextLessonIndex) {
      push(routePath);
      await handleMarkNextLessonAsComplete(lesson);
    } else if (lastCompletedLessonIndex + 1 === targetLessonIndex) {
      push(routePath);
      await handleMarkNextLessonAsComplete(lesson);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Murubbi Murubbi 😂, Ohhm Ohhm Ohhm 🤚",
        text: "You are trying to jump to a random lesson. You need to complete the previous lesson",
      });
    }
  };

  const handleMarkNextLessonAsComplete = async (lesson: ILesson) => {
    try {
      await lessonMarkAsComplete({
        userId: user?.id,
        courseId: courseId,
        moduleId: moduleId,
        lessonId: lesson?.id,
      });
    } catch (error: any) {
      toast.error(
        `Failed to mark lesson as complete. Retrying: ${error?.message}`
      );
      await lessonMarkAsComplete({
        userId: user?.id,
        courseId: courseId,
        moduleId: moduleId,
        lessonId: lesson?.id,
      });
    }
  };

  return { handleChangeLesson };
};

export default useLessonHandler;
