import { useGetLoggedInUserQuery } from "@/features/auth";
import { useMarkLessonAsCompletedMutation } from "@/features/myCourse";
import { ILesson } from "@/types/lesson.type";
import { IUser } from "@/types/user.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import Swal from "sweetalert2";
import LessonIcon from "./LessonIcon";

type Props = {
  lesson: ILesson;
  index: number;
  nextLesson: ILesson;
  lastCompletedLesson: ILesson;
  completedLessons: string[];
};

const LessonItem: React.FC<Props> = ({
  lesson,
  index,
  lastCompletedLesson,
  completedLessons,
  nextLesson,
}) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [lessonMarkComplete] = useMarkLessonAsCompletedMutation();
  const { query, push } = useRouter();
  const courseId = query?.courseId as string;
  const currentLessonId =
    (query?.lessonId as string) || lastCompletedLesson?.id;

  const handleChangeLesson = () => {
    if (!lesson?.id || !nextLesson?.id) {
      return;
    }

    if (!completedLessons.includes(lesson.id) && lesson.id !== nextLesson.id) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Murubbi Murubbi 😂, Ohhm Ohhm Ohhm 🤚",
        text: "You are trying to jump to a random lesson. You need to complete the previous lesson",
      });
      return;
    } else {
      const routePath = `/classes/course/${courseId}/module/${
        lesson?.module
      }/lesson/${lesson?.id}/${makeLessonTitleAsParamsUrl(lesson?.title)}`;
      push(routePath);
      markLessonAsCompleted();
    }
  };

  const markLessonAsCompleted = async () => {
    try {
      await lessonMarkComplete({
        userId: user?.id,
        courseId,
        lessonId: lesson?.id,
      });
    } catch (error: any) {
      toast.error(
        `Failed to mark lesson as complete. Retrying: ${error?.message}`
      );
      await lessonMarkComplete({
        userId: user?.id,
        courseId,
        lessonId: lesson?.id,
      });
    }
  };

  return (
    <div
      onClick={handleChangeLesson}
      className={`${
        currentLessonId === lesson?.id
          ? "bg-blue-500 text-white hover:bg-blue-700"
          : ""
      }  flex items-center justify-between border p-2 rounded-md cursor-pointer group`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{index + 1}.</span>
        <LessonIcon type={lesson?.type} lessonId={lesson?.id} />
        <span
          className={`${
            currentLessonId === lesson?.id
              ? "group-hover:text-white "
              : "group-hover:text-blue-400"
          }`}
        >
          {lesson?.title}
        </span>
      </div>
      {completedLessons.includes(lesson?.id) ? (
        <IoCheckmarkCircle
          className={`text-2xl ${
            currentLessonId === lesson?.id ? "text-white" : "text-green-400"
          }`}
        />
      ) : (
        <MdLockOutline
          className={`text-2xl ${
            currentLessonId === lesson?.id ? "text-white" : "text-red-400"
          }`}
        />
      )}
    </div>
  );
};

export default LessonItem;
