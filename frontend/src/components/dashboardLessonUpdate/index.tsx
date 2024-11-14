import { useGetSingleLessonQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { useRouter } from "next/router";
import AssignmentLessonUpdate from "./AssignmentLessonUpdate";
import InstructionLessonUpdate from "./InstructionLessonUpdate";
import LessonListContainer from "./LessonListContainer";
import QuizLessonUpdate from "./QuizLessonUpdate";
import VideoLessonUpdate from "./VideoLessonUpdate";

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
          <h2 className="text-lg lg:text-2xl font-bold text-center">
            Lesson loading...
          </h2>
        </div>
      ) : (
        <>
          <h1 className="text-lg lg:text-2xl font-semibold text-center my-4">
            Update lesson: {lesson?.title}
          </h1>
          <div className="flex flex-col-reverse lg:flex-row gap-2">
            <div className="lg:w-2/3 w-full">
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
            <div className="lg:w-1/3 w-full lg:pb-40">
              <LessonListContainer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLessonUpdate;
