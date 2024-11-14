import { useGetSingleLessonQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { useRouter } from "next/router";
import VideoLessonUpdate from "./VideoLessonUpdate";
import AssignmentLessonUpdate from "./AssignmentLessonUpdate";
import InstructionLessonUpdate from "./InstructionLessonUpdate";
import QuizLessonUpdate from "./QuizLessonUpdate";
import LessonListContainer from "./LessonListContainer";

const DashboardLessonUpdate = () => {
  const { query } = useRouter();
  const lessonId = query?.lessonId as string;
  const { data, isLoading } = useGetSingleLessonQuery({
    lessonId,
  });
  const lesson = data?.data as ILesson;
  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <h2 className="text-2xl font-bold text-center">Lesson loading...</h2>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-center my-2">
            Update lesson: {lesson?.title}
          </h1>
          <div className="flex gap-2">
            <div className="w-2/3">
              {lesson?.type === "video" && (
                <VideoLessonUpdate lesson={lesson} />
              )}
              {lesson?.type === "assignment" && <AssignmentLessonUpdate />}
              {lesson?.type === "instruction" && <InstructionLessonUpdate />}
              {lesson?.type === "quiz" && <QuizLessonUpdate />}
            </div>
            <div className="w-1/3 pb-40">
              <LessonListContainer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLessonUpdate;
