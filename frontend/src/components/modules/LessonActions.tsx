import { ILessonProgress } from "@/types/studentProgress.type";
import { Button } from "antd/lib";

type Props = {
  lessons: ILessonProgress[];
  setLessonId: (lessonId: string) => void;
  lessonId: string;
};

const LessonActions = ({ lessons, lessonId, setLessonId }: Props) => {
  const handlePreviousLesson = () => {
    const previousLessonIndex = lessons.findIndex(
      (ls) => ls?.lesson?.id === lessonId
    );
    const previousLesson = lessons[previousLessonIndex - 1];
    setLessonId(previousLesson?.lesson?.id);
  };
  const handleNextLesson = () => {
    const currentLessonIndex = lessons.findIndex(
      (ls) => ls?.lesson?.id === lessonId
    );
    const nextLesson = lessons[currentLessonIndex + 1];
    setLessonId(nextLesson?.lesson?.id);
  };

  return (
    <div className="flex items-center lg:justify-end justify-between gap-2 mt-3">
      <Button onClick={handlePreviousLesson}>Previous</Button>
      <Button onClick={handleNextLesson} className="px-8" type="primary">
        Next
      </Button>
    </div>
  );
};

export default LessonActions;
