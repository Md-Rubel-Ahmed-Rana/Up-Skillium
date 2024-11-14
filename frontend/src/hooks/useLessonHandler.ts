import { ILessonDetails, ILessonProgress } from "@/types/studentProgress.type";
import { useLessonMarkAsCompleteMutation } from "@/features/studentProgress";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";

type LessonHandlerProps = {
  lessons: ILessonProgress[];
  courseId: string;
  moduleId: string;
  user: IUser;
  lastCompletedLesson: ILessonDetails;
};

const useLessonHandler = ({
  lessons,
  moduleId,
  user,
  lastCompletedLesson,
}: LessonHandlerProps) => {
  const [lessonMarkAsComplete] = useLessonMarkAsCompleteMutation();
  const { query, push } = useRouter();
  const lessonId = query?.lessonId as string;
  const courseId = query?.courseId as string;

  const handleChangeLesson = async (lesson: ILessonProgress) => {
    const currentLessonIndex = lessons.findIndex(
      (ls) => ls?.lesson?.id === lessonId
    );
    const nextLessonIndex = currentLessonIndex + 1;
    const targetLessonIndex = lessons.findIndex(
      (ls) => ls?.lesson?.id === lesson?.lesson?.id
    );
    const targetLesson = lessons.find(
      (ls) => ls?.lesson?.id === lesson?.lesson?.id
    );
    const lastCompletedLessonIndex = lessons.findIndex(
      (ls) => ls?.lesson?.id === lastCompletedLesson?.id
    );

    const routePath = `/classes/course/${courseId}/module/${moduleId}/lesson/${
      lesson?.lesson?.id
    }/${makeLessonTitleAsParamsUrl(lesson?.lesson?.title)}`;

    if (
      targetLessonIndex <= currentLessonIndex ||
      targetLesson?.isLessonCompleted
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

  const handleMarkNextLessonAsComplete = async (lesson: ILessonProgress) => {
    try {
      await lessonMarkAsComplete({
        userId: user?.id,
        courseId: courseId,
        moduleId: moduleId,
        lessonId: lesson?.lesson?.id,
      });
    } catch (error: any) {
      toast.error(
        `Failed to mark lesson as complete. Retrying: ${error?.message}`
      );
      await lessonMarkAsComplete({
        userId: user?.id,
        courseId: courseId,
        moduleId: moduleId,
        lessonId: lesson?.lesson?.id,
      });
    }
  };

  return { handleChangeLesson };
};

export default useLessonHandler;
