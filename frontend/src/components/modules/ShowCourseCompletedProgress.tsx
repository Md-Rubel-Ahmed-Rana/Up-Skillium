type Props = {
  percentage: number;
};

const ShowCourseCompletedProgress = ({ percentage }: Props) => {
  return (
    <h2 className="text-sm font-semibold">Course completed: {percentage}%</h2>
  );
};

export default ShowCourseCompletedProgress;
