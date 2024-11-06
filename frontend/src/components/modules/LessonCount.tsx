import { IModuleProgress } from "@/types/studentProgress.type";

type Props = {
  modules: IModuleProgress[];
};

const LessonCount = ({ modules }: Props) => {
  let totalLessons = 0;
  let completedLessons = 0;

  modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      totalLessons += 1;
      if (lesson.isLessonCompleted) {
        completedLessons += 1;
      }
    });
  });

  return (
    <h2 className="text-md font-semibold">
      Lesson: {completedLessons}/{totalLessons}
    </h2>
  );
};

export default LessonCount;
