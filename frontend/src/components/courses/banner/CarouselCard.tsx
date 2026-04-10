import { ICourse } from "@/types/course.type";
import Link from "next/link";
import AvailableCategories from "./AvailableCategories";
import Header from "./Header";

type Props = {
  categories: string[];
  course: ICourse;
};

const CarouselCard = ({ categories, course }: Props) => {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0  bg-gradient-to-b from-black/40 to-black/70 z-10"></div>
      <img
        src={course?.image}
        alt={course?.title || "banner image"}
        className="object-cover h-screen lg:h-full w-full"
      />
      <div className="absolute inset-0 h-full top-[15%] z-20 text-white text-center p-2">
        <div className="w-full flex flex-col justify-center items-center">
          <Header />
          <AvailableCategories categories={categories} course={course} />
          <Link
            href={`/courses/details/${course?.id}?courseId=${
              course?.id
            }&courseTitle=${course.title}&category=${
              course?.category
            }&description=${
              course?.description
            }&tags=${course?.tags?.toString()}`}
            className="lg:text-3xl font-semibold"
          >
            {course?.title || ""}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
