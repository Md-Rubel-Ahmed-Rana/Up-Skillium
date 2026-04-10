import { useGetSingleLessonWithQuizCorrectAnswerQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { Skeleton } from "antd/lib";
import { useRouter } from "next/router";
import AssignmentLessonUpdate from "./AssignmentLessonUpdate";
import InstructionLessonUpdate from "./InstructionLessonUpdate";
import QuizLessonUpdate from "./QuizLessonUpdate";
import VideoLessonUpdate from "./VideoLessonUpdate";

const DashboardLessonUpdate = () => {
  const { query } = useRouter();
  const lessonId = query?.lessonId as string;
  const { data, isLoading } = useGetSingleLessonWithQuizCorrectAnswerQuery({
    lessonId,
  });
  const lesson = data?.data as ILesson;
  return (
    <div>
      {isLoading ? (
        <div className="mt-5 flex flex-col justify-center items-center gap-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <>
          <h1 className="text-lg lg:text-xl font-semibold my-3">
            Update lesson: {lesson?.title}
          </h1>
          <div className="flex flex-col-reverse lg:flex-row gap-2">
            <div className="w-full">
              {lesson?.type === "video" && (
                <VideoLessonUpdate lesson={lesson} />
              )}
              {lesson?.type === "assignment" && (
                <AssignmentLessonUpdate lesson={lesson} />
              )}
              {lesson?.type === "instruction" && (
                <InstructionLessonUpdate lesson={lesson} />
              )}
              {lesson?.type === "quiz" && <QuizLessonUpdate lesson={lesson} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLessonUpdate;
