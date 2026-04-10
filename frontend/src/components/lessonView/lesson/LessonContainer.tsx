import { useGetSingleLessonQuery } from "@/features/lesson";
import SingleLessonSkeleton from "@/skeletons/singleLessonSkeleton";
import { ILesson } from "@/types/lesson.type";
import { useRouter } from "next/router";
import ShowAssignment from "../assignment";
import ShowInstruction from "../instruction";
import ShowQuizQuestions from "../quiz";
import LessonActions from "./LessonActions";
import LessonVideoPlayer from "./LessonVideoPlayer";
import NoLessonFoundError from "./NoLessonFoundError";

type Props = {
  lessons: ILesson[];
  completedLessons: string[];
};

const LessonContainer = ({ lessons, completedLessons }: Props) => {
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
              <ShowAssignment lesson={lesson} />
            )}
            {lesson?.type === "quiz" && <ShowQuizQuestions lesson={lesson} />}
            {lesson?.type === "instruction" && (
              <ShowInstruction lesson={lesson} />
            )}
            <LessonActions
              lessons={lessons}
              completedLessons={completedLessons}
            />
          </div>
        </>
      )}
    </>
  );
};

export default LessonContainer;
