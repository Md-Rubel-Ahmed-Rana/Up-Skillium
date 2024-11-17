import { ICourse } from "@/types/course.type";
import MyClasseCard from "./MyClasseCard";

type Props = {
  courses: ICourse[];
};

const MyClassContainer = ({ courses }: Props) => {
  console.log(courses);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 px-3">
      {courses?.map((course) => (
        <MyClasseCard key={course?.id} course={course} />
      ))}
    </div>
  );
};

export default MyClassContainer;
