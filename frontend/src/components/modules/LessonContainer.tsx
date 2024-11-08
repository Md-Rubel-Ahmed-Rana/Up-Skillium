import { ILesson } from "@/types/lesson.type";
import LessonVideoPlayer from "./LessonVideoPlayer";
import ShowAssignment from "./ShowAssignment";
import ShowQuizQuestions from "./ShowQuizQuestions";
import ShowInstruction from "./ShowInstruction";
import LessonActions from "./LessonActions";
import { useGetSingleLessonQuery } from "@/features/lesson";
import { ILessonProgress } from "@/types/studentProgress.type";

type Props = {
  lessonId: string;
  setLessonId: (lessonId: string) => void;
  lessons: ILessonProgress[];
};

const LessonContainer = ({ lessonId, setLessonId, lessons }: Props) => {
  const { data } = useGetSingleLessonQuery({ lessonId: lessonId });
  const lesson = data?.data as ILesson;
  const findCurrentLesson = lessons.find((ls) => ls?.lesson?.id === lessonId);
  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-semibold mb-3">{lesson?.title}</h2>
      {lesson?.type === "video" && (
        <LessonVideoPlayer videoUrl={lesson?.videoUrl} />
      )}
      {lesson?.type === "assignment" && <ShowAssignment lesson={lesson} />}
      {lesson?.type === "quiz" && (
        <ShowQuizQuestions
          lesson={lesson}
          isQuizSubmitted={findCurrentLesson?.isQuizSubmitted as boolean}
        />
      )}
      {lesson?.type === "instruction" && <ShowInstruction lesson={lesson} />}
      <LessonActions
        lessonId={lessonId}
        setLessonId={setLessonId}
        lessons={lessons}
      />
    </div>
  );
};

export default LessonContainer;
