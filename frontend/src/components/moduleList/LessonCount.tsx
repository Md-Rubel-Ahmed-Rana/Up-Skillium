type Props = {
  totalLessons: number;
  completedLessons: number;
};

const LessonCount = ({ totalLessons, completedLessons }: Props) => {
  return (
    <h2 className="text-sm font-semibold">
      Completed lessons: {completedLessons}/{totalLessons}
    </h2>
  );
};

export default LessonCount;
