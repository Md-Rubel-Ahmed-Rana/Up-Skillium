import React from "react";
import { MdLockOutline } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import LessonIcon from "./LessonIcon";
import useLessonHandler from "@/hooks/useLessonHandler";
import { ILessonDetails, ILessonProgress } from "@/types/studentProgress.type";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";

type Props = {
  lesson: ILessonProgress;
  setLessonId: (lessonId: string) => void;
  index: number;
  courseId: string;
  lessonId: string;
  lessons: ILessonProgress[];
  moduleId: string;
  lastCompletedLesson: ILessonDetails;
};

const Lesson: React.FC<Props> = ({
  lesson,
  setLessonId,
  lessonId,
  index,
  courseId,
  moduleId,
  lessons,
  lastCompletedLesson,
}) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const { handleChangeLesson } = useLessonHandler({
    lessons,
    lessonId,
    courseId,
    moduleId,
    user,
    setLessonId,
    lastCompletedLesson,
  });

  const currentLessonId = lessonId || lastCompletedLesson?.id;

  return (
    <div
      onClick={() => handleChangeLesson(lesson)}
      className={`${
        currentLessonId === lesson?.lesson?.id
          ? "bg-blue-500 text-white hover:bg-blue-700"
          : ""
      }  flex items-center justify-between border p-2 rounded-md cursor-pointer group`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{index + 1}.</span>
        <LessonIcon
          type={lesson?.lesson?.type}
          currentLessonId={currentLessonId}
          lessonId={lesson?.lesson?.id}
        />
        <span
          className={`${
            currentLessonId === lesson?.lesson?.id
              ? "group-hover:text-white "
              : "group-hover:text-blue-400"
          }`}
        >
          {lesson?.lesson?.title}
        </span>
      </div>
      {lesson?.isLessonCompleted ? (
        <IoCheckmarkCircle
          className={`text-2xl ${
            currentLessonId === lesson?.lesson?.id
              ? "text-white"
              : "text-green-400"
          }`}
        />
      ) : (
        <MdLockOutline
          className={`text-2xl ${
            currentLessonId === lesson?.lesson?.id
              ? "text-white"
              : "text-red-400"
          }`}
        />
      )}
    </div>
  );
};

export default Lesson;
