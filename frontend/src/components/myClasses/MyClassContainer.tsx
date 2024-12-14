import { ICourse } from "@/types/course.type";
import MyClassCard from "./MyClassCard";

type Props = {
  courses: ICourse[];
};

const MyClassContainer = ({ courses }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 pb-20">
      {courses?.map((course) => (
        <MyClassCard key={course?.id} course={course} />
      ))}
    </div>
  );
};

export default MyClassContainer;
