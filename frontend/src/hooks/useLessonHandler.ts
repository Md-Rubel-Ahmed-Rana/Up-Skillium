/* eslint-disable @typescript-eslint/no-explicit-any */
// useLessonHandler.ts
import { ILessonDetails, ILessonProgress } from "@/types/studentProgress.type";
import { useLessonMarkAsCompleteMutation } from "@/features/studentProgress";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IUser } from "@/types/user.type";

type LessonHandlerProps = {
  lessons: ILessonProgress[];
  lessonId: string;
  courseId: string;
  moduleId: string;
  user: IUser;
  lastCompletedLesson: ILessonDetails;
  setLessonId: (lessonId: string) => void;
};

const useLessonHandler = ({
  lessons,
  lessonId,
  courseId,
  moduleId,
  user,
  setLessonId,
  lastCompletedLesson,
}: LessonHandlerProps) => {
  const [lessonMarkAsComplete] = useLessonMarkAsCompleteMutation();

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
    if (
      targetLessonIndex <= currentLessonIndex ||
      targetLesson?.isLessonCompleted
    ) {
      setLessonId(lesson?.lesson?.id);
    } else if (targetLessonIndex === nextLessonIndex) {
      setLessonId(lesson?.lesson?.id);
      await handleMarkNextLessonAsComplete(lesson);
    } else if (lastCompletedLessonIndex + 1 === targetLessonIndex) {
      setLessonId(lesson?.lesson?.id);
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
