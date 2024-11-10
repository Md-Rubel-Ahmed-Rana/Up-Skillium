import { ILessonProgress } from "@/types/studentProgress.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { Button } from "antd";
import { useRouter } from "next/router";

type Props = {
  lessons: ILessonProgress[];
};

const LessonActions = ({ lessons }: Props) => {
  const { query, push } = useRouter();
  const lessonId = query?.lessonId as string;
  const courseId = query?.courseId as string;

  const currentLessonIndex = lessons?.findIndex(
    (ls) => ls?.lesson?.id === lessonId
  );

  const navigateToLesson = (lessonIndex: number) => {
    const lesson = lessons[lessonIndex];
    if (lesson) {
      const routePath = `/classes/course/${courseId}/module/${
        lesson.lesson.module
      }/lesson/${lesson.lesson.id}/${makeLessonTitleAsParamsUrl(
        lesson.lesson.title
      )}`;
      push(routePath);
    }
  };

  return (
    <div className="flex items-center lg:justify-end justify-between gap-2 mt-3">
      <Button
        onClick={() => navigateToLesson(currentLessonIndex - 1)}
        disabled={currentLessonIndex === 0}
      >
        Previous
      </Button>
      <Button
        onClick={() => navigateToLesson(currentLessonIndex + 1)}
        className="px-8"
        type="primary"
        disabled={currentLessonIndex === lessons.length - 1}
      >
        Next
      </Button>
    </div>
  );
};

export default LessonActions;
