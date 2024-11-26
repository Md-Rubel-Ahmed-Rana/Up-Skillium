import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import makeCategoryAsUrl from "@/utils/makeCategoryAsUrl";
import { Button, Carousel } from "antd/lib";
import Link from "next/link";
import banner from "../../../public/assets/courseImages/courseBanner.jpg";

const CoursesBanner: React.FC = () => {
  const { data } = useGetAllCoursesQuery({});
  const courses = (data?.data as ICourse[]) || [];

  const availableCategories = Array.from(
    new Set(courses?.map((course) => course?.category))
  );

  return (
    <div className="relative">
      <Carousel arrows={false} effect="fade" autoplay>
        {courses?.length > 0 &&
          courses?.map((course) => (
            <div key={course?.id} className="relative">
              <div className="absolute inset-0  bg-gradient-to-b from-black/40 to-black/70 z-10"></div>
              <img
                src={course?.image || (banner as unknown as string)}
                alt={course?.title || "banner image"}
                className="object-cover h-screen w-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center p-2">
                <h2 className="lg:text-5xl text-lg font-extrabold mb-4 leading-tight">
                  Welcome to Our Learning Platform
                </h2>
                <p className="lg:text-lg text-sm">
                  Unlock your potential with our expertly designed courses.
                </p>
                <div className="flex lg:flex-wrap lg:gap-4 gap-2 mt-4 w-full lg:w-auto overflow-x-auto mb-4">
                  {availableCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/courses/category/${makeCategoryAsUrl(category)}`}
                    >
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
                        type="primary"
                      >
                        {category}
                      </Button>
                    </Link>
                  ))}
                </div>
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
          ))}
      </Carousel>
    </div>
  );
};

export default CoursesBanner;
