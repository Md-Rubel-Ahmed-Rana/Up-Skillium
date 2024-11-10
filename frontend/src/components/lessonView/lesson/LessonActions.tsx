import { ILessonProgress } from "@/types/studentProgress.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { Button } from "antd/lib";
import { useRouter } from "next/router";

type Props = {
  lessons: ILessonProgress[];
};

const LessonActions = ({ lessons }: Props) => {
  const { query, push } = useRouter();
  const lessonId = query?.lessonId as string;
  const courseId = query?.courseId as string;
  const handlePreviousLesson = () => {
    const previousLessonIndex = lessons.findIndex(
      (ls) => ls?.lesson?.id === lessonId
    );
    const previousLesson = lessons[previousLessonIndex - 1];
    push(
      `/classes/${courseId}?lessonId=${
        previousLesson?.lesson?.id
      }&lessonTitle=${makeLessonTitleAsParamsUrl(
        previousLesson?.lesson?.title
      )}`
    );
  };
  const handleNextLesson = () => {
    const currentLessonIndex = lessons.findIndex(
      (ls) => ls?.lesson?.id === lessonId
    );
    const nextLesson = lessons[currentLessonIndex + 1];
    push(
      `/classes/${courseId}?lessonId=${
        nextLesson?.lesson?.id
      }&lessonTitle=${makeLessonTitleAsParamsUrl(nextLesson?.lesson?.title)}`
    );
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
