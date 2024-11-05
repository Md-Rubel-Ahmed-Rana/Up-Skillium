import { ILesson } from "@/types/lesson.type";
import LessonVideoPlayer from "./LessonVideoPlayer";
import ShowAssignment from "./ShowAssignment";
import ShowQuizQuestions from "./ShowQuizQuestions";
import ShowInstruction from "./ShowInstruction";
import LessonActions from "./LessonActions";

type Props = {
  lesson: ILesson | null;
};

const LessonContainer = ({ lesson }: Props) => {
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
