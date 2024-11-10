import { ILesson } from "@/types/lesson.type";
import { useGetSingleLessonQuery } from "@/features/lesson";
import SingleLessonSkeleton from "@/skeletons/singleLessonSkeleton";
import { useRouter } from "next/router";
import { ILessonProgress } from "@/types/studentProgress.type";
import LessonActions from "./LessonActions";
import LessonVideoPlayer from "./LessonVideoPlayer";
import ShowAssignment from "../assignment";
import ShowQuizQuestions from "../quiz";
import ShowInstruction from "../instruction";
import NoLessonFoundError from "./NoLessonFoundError";

type Props = {
  currentLesson: ILessonProgress;
  lessons: ILessonProgress[];
};

const LessonContainer = ({ currentLesson, lessons }: Props) => {
  const { query } = useRouter();
  const lessonId = query?.lessonId as string;

  const { data, isLoading, refetch } = useGetSingleLessonQuery({
    lessonId,
  });
  const lesson = data?.data as ILesson;

  return (
    <>
      {isLoading ? (
        <SingleLessonSkeleton />
      ) : (
        <>
          {!lesson?.id && <NoLessonFoundError refetch={refetch} />}
          <div className="min-h-screen">
            <h2 className="text-2xl font-semibold mb-3">{lesson?.title}</h2>
            {lesson?.type === "video" && (
              <LessonVideoPlayer videoUrl={lesson?.videoUrl} />
            )}
            {lesson?.type === "assignment" && (
              <ShowAssignment
                lesson={lesson}
                isAssignmentSubmitted={
                  currentLesson?.isAssignmentSubmitted as boolean
                }
              />
            )}
            {lesson?.type === "quiz" && (
              <ShowQuizQuestions
                lesson={lesson}
                isQuizSubmitted={currentLesson?.isQuizSubmitted as boolean}
              />
            )}
            {lesson?.type === "instruction" && (
              <ShowInstruction lesson={lesson} />
            )}
            <LessonActions lessons={lessons} />
          </div>
        </>
      )}
    </>
  );
};

export default LessonContainer;
