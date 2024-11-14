import { useGetSingleLessonQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { useRouter } from "next/router";
import VideoLessonUpdate from "./VideoLessonUpdate";
import AssignmentLessonUpdate from "./AssignmentLessonUpdate";
import InstructionLessonUpdate from "./InstructionLessonUpdate";
import QuizLessonUpdate from "./QuizLessonUpdate";

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
          <div>
            <div>
              {lesson?.type === "video" && (
                <VideoLessonUpdate lesson={lesson} />
              )}
              {lesson?.type === "assignment" && <AssignmentLessonUpdate />}
              {lesson?.type === "instruction" && <InstructionLessonUpdate />}
              {lesson?.type === "quiz" && <QuizLessonUpdate />}
            </div>
            <div>
              <h2>List lessons</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLessonUpdate;
