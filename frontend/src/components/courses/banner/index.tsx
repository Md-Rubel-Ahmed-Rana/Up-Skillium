import { ICourse } from "@/types/course.type";
import { Carousel } from "antd/lib";
import CarouselCard from "./CarouselCard";

type Props = {
  courses: ICourse[];
};

const CoursesBanner: React.FC<Props> = ({ courses }) => {
  const availableCategories = Array.from(
    new Set(courses?.map((course) => course?.category))
  );

  return (
    <div className="relative lg:max-h-[80vh] lg:h-[100%] h-screen overflow-hidden">
      <Carousel
        arrows={false}
        dots={false}
        effect="fade"
        className="h-full overflow-hidden"
        autoplay
      >
        {courses?.map((course) => (
          <CarouselCard
            key={course?.id}
            course={course}
            categories={availableCategories}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CoursesBanner;
