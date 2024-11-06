import { ILesson } from "@/types/lesson.type";
import LessonVideoPlayer from "./LessonVideoPlayer";
import ShowAssignment from "./ShowAssignment";
import ShowQuizQuestions from "./ShowQuizQuestions";
import ShowInstruction from "./ShowInstruction";
import LessonActions from "./LessonActions";
import { useGetSingleLessonQuery } from "@/features/lesson";

type Props = {
  lessonId: string;
};

const LessonContainer = ({ lessonId }: Props) => {
  const { data } = useGetSingleLessonQuery({ lessonId: lessonId });
  const lesson = data?.data as ILesson;
  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-semibold mb-3">{lesson?.title}</h2>
      {lesson?.type === "video" && (
        <LessonVideoPlayer videoUrl={lesson?.videoUrl} />
      )}
      {lesson?.type === "assignment" && <ShowAssignment lesson={lesson} />}
      {lesson?.type === "quiz" && <ShowQuizQuestions lesson={lesson} />}
      {lesson?.type === "instruction" && <ShowInstruction lesson={lesson} />}
      <LessonActions lesson={lesson as ILesson} />
    </div>
  );
};

export default LessonContainer;
