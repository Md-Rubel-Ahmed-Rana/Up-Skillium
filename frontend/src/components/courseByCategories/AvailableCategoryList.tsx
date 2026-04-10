import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import makeCategoryAsUrl from "@/utils/makeCategoryAsUrl";
import { Button } from "antd/lib";
import Link from "next/link";

const AvailableCategoryList = () => {
  const { data } = useGetAllCoursesQuery({});
  const courses = (data?.data as ICourse[]) || [];

  const availableCategoriesCourses = courses.reduce((acc, course) => {
    if (!acc.some((c) => c?.category === course?.category)) {
      acc.push(course);
    }
    return acc;
  }, [] as ICourse[]);

  return (
    <div className="flex lg:flex-wrap lg:gap-4 gap-2 mt-4 w-full lg:w-auto overflow-x-auto mb-4">
      {availableCategoriesCourses?.map((course) => (
        <Link
          key={course?.id}
          href={`/courses/category/${makeCategoryAsUrl(
            course?.category
          )}?category=${course?.category}&courseTitle=${
            course?.title
          }&description=${
            course?.description
          }&techs=${course?.technologies?.join("-")}&tags=${course?.tags?.join(
            "-"
          )}&courseId=${course?.id}`}
        >
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
            type="primary"
          >
            {course?.category}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default AvailableCategoryList;
