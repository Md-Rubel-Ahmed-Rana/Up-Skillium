/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  course: any;
};

const CourseCard = ({ course }: Props) => {
  return (
    <div>
      <h2>{course?.title}</h2>
    </div>
  );
};

export default CourseCard;
